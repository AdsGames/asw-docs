# Util

General utility functions.

**Header:** `#include <asw/modules/util.h>`
**Namespace:** `asw::util`

## Functions

### `abortOnError`

```cpp
void abortOnError(const std::string& message);
```

Abort the program and display an error message.

### `makeColor`

```cpp
asw::Color makeColor(int r, int g, int b);
asw::Color makeColor(int r, int g, int b, int a);
```

Create a color from RGB or RGBA values (0-255 each).

### `getTextureSize`

```cpp
asw::Vec2<float> getTextureSize(const asw::Texture& tex);
```

Get the width and height of a texture as a `Vec2<float>`.

### `getTextSize`

```cpp
asw::Vec2<int> getTextSize(const asw::Font& font, const std::string& text);
```

Get the rendered size of a string with the given font.

### `lerp`

```cpp
template <typename T>
T lerp(const T& a, const T& b, float t);
```

Linearly interpolate between two values. The `t` parameter is clamped to 0.0 - 1.0.

| Parameter | Type | Description |
|-----------|------|-------------|
| `a` | `const T&` | Start value |
| `b` | `const T&` | End value |
| `t` | `float` | Interpolation factor (0.0 - 1.0) |

Works with any type that supports `+`, `-`, and `*` with a float (e.g., `float`, `Vec2<float>`).

## Example

```cpp
// Create colors
asw::Color red = asw::util::makeColor(255, 0, 0);
asw::Color semiTransparent = asw::util::makeColor(255, 255, 255, 128);

// Get texture dimensions
auto size = asw::util::getTextureSize(texture);
float width = size.x;
float height = size.y;

// Smooth interpolation
float smoothed = asw::util::lerp(currentValue, targetValue, 0.1f);

// Interpolate positions
asw::Vec2<float> pos = asw::util::lerp(startPos, endPos, progress);
```
