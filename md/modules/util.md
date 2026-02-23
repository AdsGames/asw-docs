# Util

General utility functions.

**Header:** `#include <asw/modules/util.h>`
**Namespace:** `asw::util`

## Functions

### `abort_on_error`

```cpp
[[noreturn]] void abort_on_error(const std::string& message);
```

Abort the program and display an error message.

### `get_texture_size`

```cpp
asw::Vec2<float> get_texture_size(const asw::Texture& tex);
```

Get the width and height of a texture as a `Vec2<float>`.

### `get_text_size`

```cpp
asw::Vec2<int> get_text_size(const asw::Font& font, const std::string& text);
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
// Get texture dimensions
auto size = asw::util::get_texture_size(texture);
float width = size.x;
float height = size.y;

// Smooth interpolation
float smoothed = asw::util::lerp(current_value, target_value, 0.1f);

// Interpolate positions
asw::Vec2<float> pos = asw::util::lerp(start_pos, end_pos, progress);
```
