# Game Objects

Common game object classes with built-in physics and rendering.

**Header:** `#include <asw/modules/game.h>`
**Namespace:** `asw::game`

## Physics

A simple physics component attached to game objects.

```cpp
class Physics {
public:
  asw::Vec2<float> velocity;
  asw::Vec2<float> acceleration;
  float angular_velocity{0};
  float angular_acceleration{0};
};
```

## GameObject

Base class for all game objects. Provides transform, physics, and lifecycle management.

```cpp
class GameObject;
```

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `transform` | `asw::Quad<float>` | | Position and size |
| `rotation` | `float` | `0` | Rotation in radians |
| `z_index` | `int` | `0` | Draw order (higher = on top) |
| `active` | `bool` | `true` | Whether to update and draw |
| `alpha` | `float` | `1.0` | Opacity (0.0 - 1.0) |
| `body` | `Physics` | | Physics component |
| `alive` | `bool` | `true` | Set to `false` to remove from scene |

### Virtual Methods

#### `update`

```cpp
virtual void update(float dt);
```

Updates physics: applies acceleration to velocity, velocity to position, and angular acceleration/velocity to rotation. Override to add custom behavior (call `GameObject::update(dt)` to keep the physics).

#### `draw`

```cpp
virtual void draw();
```

Override to render the object.

#### `get_transform`

```cpp
const asw::Quad<float>& get_transform() const;
```

Returns a const reference to the transform.

## Sprite

A `GameObject` that draws a texture. Inherits all `GameObject` fields.

```cpp
class Sprite : public GameObject;
```

### Methods

#### `set_texture`

```cpp
void set_texture(const asw::Texture& texture, bool auto_size = true);
```

Set the sprite's texture. When `auto_size` is `true`, the transform size is automatically set to the texture dimensions.

Rendering automatically handles alpha and rotation.

## Text

A `GameObject` that draws text. Inherits all `GameObject` fields.

```cpp
class Text : public GameObject;
```

### Methods

#### `set_font`

```cpp
void set_font(const asw::Font& font);
```

Set the font to use for rendering.

#### `set_text`

```cpp
void set_text(const std::string_view& text);
```

Set the text content.

#### `set_color`

```cpp
void set_color(const asw::Color& color);
```

Set the text color.

#### `set_justify`

```cpp
void set_justify(asw::TextJustify justify);
```

Set the text justification (`Left`, `Center`, or `Right`).

## Example

```cpp
// Create a sprite
auto player = std::make_shared<asw::game::Sprite>();
player->set_texture(asw::assets::load_texture("player.png"));
player->transform.position = {100.0f, 200.0f};
player->body.velocity = {50.0f, 0.0f};
player->z_index = 1;

// Create text
auto label = std::make_shared<asw::game::Text>();
label->set_font(asw::assets::load_font("font.ttf", 16));
label->set_text("Score: 0");
label->set_color(asw::color::white);
label->set_justify(asw::TextJustify::Center);
label->transform.position = {10.0f, 10.0f};

// Custom game object
class Enemy : public asw::game::GameObject {
public:
  void update(float dt) override {
    GameObject::update(dt);
    // custom AI logic
  }

  void draw() override {
    asw::draw::circle_fill(transform.position, 16.0f, asw::color::red);
  }
};
```
