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
  float angularVelocity{0};
  float angularAcceleration{0};
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
| `rotation` | `float` | `0` | Rotation in degrees |
| `zIndex` | `int` | `0` | Draw order (higher = on top) |
| `active` | `bool` | `true` | Whether to update and draw |
| `alpha` | `float` | `1.0` | Opacity (0.0 - 1.0) |
| `body` | `Physics` | | Physics component |
| `alive` | `bool` | `true` | Set to `false` to remove from scene |

### Virtual Methods

#### `update`

```cpp
virtual void update(float deltaTime);
```

Updates physics: applies acceleration to velocity, velocity to position, and angular acceleration/velocity to rotation. Override to add custom behavior (call `GameObject::update(deltaTime)` to keep the physics).

#### `draw`

```cpp
virtual void draw();
```

Override to render the object.

#### `getTransform`

```cpp
const asw::Quad<float>& getTransform() const;
```

Returns a const reference to the transform.

## Sprite

A `GameObject` that draws a texture. Inherits all `GameObject` fields.

```cpp
class Sprite : public GameObject;
```

### Methods

#### `setTexture`

```cpp
void setTexture(const asw::Texture& texture, bool autoSize = true);
```

Set the sprite's texture. When `autoSize` is `true`, the transform size is automatically set to the texture dimensions.

Rendering automatically handles alpha and rotation.

## Text

A `GameObject` that draws text. Inherits all `GameObject` fields.

```cpp
class Text : public GameObject;
```

### Methods

#### `setFont`

```cpp
void setFont(const asw::Font& font);
```

Set the font to use for rendering.

#### `setText`

```cpp
void setText(const std::string& text);
```

Set the text content.

#### `setColor`

```cpp
void setColor(const asw::Color& color);
```

Set the text color.

## Example

```cpp
// Create a sprite
auto player = std::make_shared<asw::game::Sprite>();
player->setTexture(asw::assets::loadTexture("player.png"));
player->transform.position = {100.0f, 200.0f};
player->body.velocity = {50.0f, 0.0f};
player->zIndex = 1;

// Create text
auto label = std::make_shared<asw::game::Text>();
label->setFont(asw::assets::loadFont("font.ttf", 16));
label->setText("Score: 0");
label->setColor({255, 255, 255, 255});
label->transform.position = {10.0f, 10.0f};

// Custom game object
class Enemy : public asw::game::GameObject {
public:
  void update(float deltaTime) override {
    GameObject::update(deltaTime);
    // custom AI logic
  }

  void draw() override {
    asw::draw::circleFill(transform.position, 16.0f, {255, 0, 0, 255});
  }
};
```
