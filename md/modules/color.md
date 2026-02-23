# Color

RGBA color struct with utility methods and named color constants.

**Header:** `#include <asw/modules/color.h>`
**Namespace:** `asw`

## Color Struct

```cpp
struct Color {
  uint8_t r, g, b, a;
};
```

### Constructors

```cpp
Color();                                        // Black, fully opaque (0,0,0,255)
Color(uint8_t r, uint8_t g, uint8_t b, uint8_t a = 255);
```

### Static Constructors

#### `from_float`

```cpp
static Color from_float(float r, float g, float b, float a = 1.0F);
```

Create a color from float values (0.0 - 1.0).

#### `from_hex`

```cpp
static Color from_hex(const std::string& hex);
```

Create a color from a hex string. Supports `#RRGGBB` and `#RRGGBBAA` formats. Returns black on invalid input.

### Methods

#### `lighten`

```cpp
Color lighten(float percentage) const;
```

Lighten the color by a percentage (0.0 - 1.0).

#### `darken`

```cpp
Color darken(float percentage) const;
```

Darken the color by a percentage (0.0 - 1.0).

#### `blend`

```cpp
Color blend(const Color& color) const;
```

Alpha-blend this color over another.

#### `invert`

```cpp
Color invert() const;
```

Return the inverted color (preserves alpha).

#### `grayscale`

```cpp
Color grayscale() const;
```

Convert to grayscale using perceptual luminance weights.

#### `with_alpha`

```cpp
Color with_alpha(uint8_t alpha) const;
```

Return a copy with a different alpha value.

## Named Constants

Available in the `asw::color` namespace.

### Basic Colors

`black`, `silver`, `gray`, `white`, `maroon`, `red`, `purple`, `fuchsia`, `green`, `lime`, `olive`, `yellow`, `navy`, `blue`, `teal`, `aqua`

### Extended Colors

All CSS named colors are available, including: `coral`, `crimson`, `cyan`, `darkblue`, `dodgerblue`, `gold`, `hotpink`, `indigo`, `ivory`, `khaki`, `lavender`, `magenta`, `orange`, `pink`, `salmon`, `skyblue`, `tomato`, `turquoise`, `violet`, and many more.

### Special

| Constant | Value |
|----------|-------|
| `asw::color::transparent` | `#00000000` (fully transparent) |

## Example

```cpp
// Construct colors
asw::Color red(255, 0, 0);
asw::Color semi = asw::Color(255, 255, 255, 128);
auto sky = asw::Color::from_hex("#87CEEB");
auto half = asw::Color::from_float(1.0f, 0.5f, 0.0f, 0.5f);

// Use named constants
asw::draw::rect_fill(quad, asw::color::coral);
asw::draw::circle_fill(pos, 10.0f, asw::color::white.with_alpha(128));

// Color manipulation
auto lighter = asw::color::blue.lighten(0.3f);
auto darker = asw::color::red.darken(0.5f);
auto gray = asw::color::green.grayscale();
auto inverted = asw::color::yellow.invert();
```
