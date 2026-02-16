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

### `spriteFlip`

```cpp
void spriteFlip(const asw::Texture& tex,
                const asw::Vec2<float>& position,
                bool flipX,
                bool flipY);
```

Draw a sprite with optional horizontal and/or vertical flipping.

### `stretchSprite`

```cpp
void stretchSprite(const asw::Texture& tex, const asw::Quad<float>& position);
```

Draw a sprite stretched to fit the given quad (position + size).

### `rotateSprite`

```cpp
void rotateSprite(const asw::Texture& tex,
                  const asw::Vec2<float>& position,
                  double angle);
```

Draw a sprite rotated by the given angle (in degrees).

### `stretchSpriteBlit`

```cpp
void stretchSpriteBlit(const asw::Texture& tex,
                       const asw::Quad<float>& source,
                       const asw::Quad<float>& dest);
```

Draw a portion of a texture (defined by `source`) stretched to the `dest` quad.

### `stretchSpriteRotateBlit`

```cpp
void stretchSpriteRotateBlit(const asw::Texture& tex,
                             const asw::Quad<float>& source,
                             const asw::Quad<float>& dest,
                             double angle);
```

Draw a portion of a texture stretched and rotated.

## Text Drawing

### `text`

```cpp
void text(const asw::Font& font,
          const std::string& text,
          const asw::Vec2<float>& position,
          asw::Color color);
```

Draw left-aligned text.

### `textCenter`

```cpp
void textCenter(const asw::Font& font,
                const std::string& text,
                const asw::Vec2<float>& position,
                asw::Color color);
```

Draw center-aligned text.

### `textRight`

```cpp
void textRight(const asw::Font& font,
               const std::string& text,
               const asw::Vec2<float>& position,
               asw::Color color);
```

Draw right-aligned text.

## Primitive Drawing

### `clearColor`

```cpp
void clearColor(asw::Color color);
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

### `rectFill`

```cpp
void rectFill(const asw::Quad<float>& position, asw::Color color);
```

Draw a filled rectangle.

### `circle`

```cpp
void circle(const asw::Vec2<float>& position, float radius, asw::Color color);
```

Draw an outlined circle.

### `circleFill`

```cpp
void circleFill(const asw::Vec2<float>& position, float radius, asw::Color color);
```

Draw a filled circle.

## Texture Utilities

### `setBlendMode`

```cpp
void setBlendMode(const asw::Texture& texture, asw::BlendMode mode);
```

Set the blend mode of a texture.

### `setAlpha`

```cpp
void setAlpha(const asw::Texture& texture, float alpha);
```

Set the alpha (opacity) of a texture.

## Example

```cpp
auto tex = asw::assets::loadTexture("player.png");
auto font = asw::assets::loadFont("font.ttf", 16);

// Draw sprite
asw::draw::sprite(tex, {100.0f, 200.0f});

// Draw rotated sprite
asw::draw::rotateSprite(tex, {100.0f, 200.0f}, 45.0);

// Draw primitives
asw::draw::rectFill({10, 10, 100, 50}, {255, 0, 0, 255});
asw::draw::circleFill({200.0f, 200.0f}, 30.0f, {0, 255, 0, 255});

// Draw text
asw::draw::text(font, "Hello ASW!", {10.0f, 10.0f}, {255, 255, 255, 255});
```
