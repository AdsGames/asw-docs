# Draw

Routines for drawing sprites and primitives to the screen.

**Header:** `#include <asw/modules/draw.h>`
**Namespace:** `asw::draw`

## Sprite Drawing

### `sprite`

```cpp
void sprite(const asw::Texture& tex, const asw::Vec2<float>& position);
```

Draw a texture at the given position.

### `sprite_flip`

```cpp
void sprite_flip(const asw::Texture& tex,
                 const asw::Vec2<float>& position,
                 bool flip_x,
                 bool flip_y);
```

Draw a sprite with optional horizontal and/or vertical flipping.

### `stretch_sprite`

```cpp
void stretch_sprite(const asw::Texture& tex, const asw::Quad<float>& position);
```

Draw a sprite stretched to fit the given quad (position + size).

### `rotate_sprite`

```cpp
void rotate_sprite(const asw::Texture& tex,
                   const asw::Vec2<float>& position,
                   float angle);
```

Draw a sprite rotated by the given angle (in radians).

### `stretch_sprite_blit`

```cpp
void stretch_sprite_blit(const asw::Texture& tex,
                         const asw::Quad<float>& source,
                         const asw::Quad<float>& dest);
```

Draw a portion of a texture (defined by `source`) stretched to the `dest` quad.

### `stretch_sprite_rotate_blit`

```cpp
void stretch_sprite_rotate_blit(const asw::Texture& tex,
                                const asw::Quad<float>& source,
                                const asw::Quad<float>& dest,
                                float angle);
```

Draw a portion of a texture stretched and rotated (angle in radians).

## Text Drawing

### `text`

```cpp
void text(const asw::Font& font,
          const std::string& text,
          const asw::Vec2<float>& position,
          asw::Color color,
          asw::TextJustify justify = asw::TextJustify::Left);
```

Draw text with the specified justification.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `font` | `const asw::Font&` | | The font to use |
| `text` | `const std::string&` | | The text to draw |
| `position` | `const asw::Vec2<float>&` | | The position to draw at |
| `color` | `asw::Color` | | The text color |
| `justify` | `asw::TextJustify` | `Left` | Text alignment (`Left`, `Center`, `Right`) |

## Primitive Drawing

### `clear_color`

```cpp
void clear_color(asw::Color color);
```

Clear the screen to a color.

### `point`

```cpp
void point(const asw::Vec2<float>& position, asw::Color color);
```

Draw a single point.

### `line`

```cpp
void line(const asw::Vec2<float>& position1,
          const asw::Vec2<float>& position2,
          asw::Color color);
```

Draw a line between two points.

### `rect`

```cpp
void rect(const asw::Quad<float>& position, asw::Color color);
```

Draw an outlined rectangle.

### `rect_fill`

```cpp
void rect_fill(const asw::Quad<float>& position, asw::Color color);
```

Draw a filled rectangle.

### `circle`

```cpp
void circle(const asw::Vec2<float>& position, float radius, asw::Color color);
```

Draw an outlined circle.

### `circle_fill`

```cpp
void circle_fill(const asw::Vec2<float>& position, float radius, asw::Color color);
```

Draw a filled circle.

## Texture Utilities

### `set_blend_mode`

```cpp
void set_blend_mode(const asw::Texture& texture, asw::BlendMode mode);
```

Set the blend mode of a texture.

### `set_alpha`

```cpp
void set_alpha(const asw::Texture& texture, float alpha);
```

Set the alpha (opacity) of a texture.

## Example

```cpp
auto tex = asw::assets::load_texture("player.png");
auto font = asw::assets::load_font("font.ttf", 16);

// Draw sprite
asw::draw::sprite(tex, {100.0f, 200.0f});

// Draw rotated sprite (radians)
asw::draw::rotate_sprite(tex, {100.0f, 200.0f}, 0.785f);

// Draw primitives
asw::draw::rect_fill({10, 10, 100, 50}, asw::color::red);
asw::draw::circle_fill({200.0f, 200.0f}, 30.0f, asw::color::lime);

// Draw text with justification
asw::draw::text(font, "Hello ASW!", {10.0f, 10.0f}, asw::color::white);
asw::draw::text(font, "Centered", {320.0f, 10.0f}, asw::color::white, asw::TextJustify::Center);
```
