# Display

Display and window management routines.

**Header:** `#include <asw/modules/display.h>`
**Namespace:** `asw::display`

## Variables

### `renderer`

```cpp
extern asw::Renderer* renderer;
```

The SDL renderer for the display module.

### `window`

```cpp
extern asw::Window* window;
```

The SDL window for the display module.

## Functions

### `set_title`

```cpp
void set_title(const std::string& title);
```

Set the title of the window.

### `set_icon`

```cpp
void set_icon(const std::string& path);
```

Set the icon to display on the window. Silently fails if the file does not exist.

### `set_fullscreen`

```cpp
void set_fullscreen(bool fullscreen);
```

Set the window to fullscreen or windowed mode.

### `set_resolution`

```cpp
void set_resolution(int w, int h);
```

Set the resolution of the window.

### `set_resizable`

```cpp
void set_resizable(bool resizable);
```

Set whether the window is resizable.

### `get_size`

```cpp
asw::Vec2<int> get_size();
```

Returns the actual size of the window.

### `get_logical_size`

```cpp
asw::Vec2<int> get_logical_size();
```

Returns the logical size of the window. This may differ from the actual size if scaling is enabled.

### `get_scale`

```cpp
asw::Vec2<float> get_scale();
```

Returns the scale of the window (logical size / actual size).

### `set_render_target`

```cpp
void set_render_target(const asw::Texture& texture);
```

Set the render target to a texture.

### `reset_render_target`

```cpp
void reset_render_target();
```

Reset the render target back to the default (the window).

### `clear`

```cpp
void clear();
void clear(const asw::Color& color);
```

Clear the window. Optionally specify a color to clear to.

### `present`

```cpp
void present();
```

Present the rendered frame to the window.

### `set_blend_mode`

```cpp
void set_blend_mode(asw::BlendMode mode);
```

Set the blend mode of the renderer.

## Example

```cpp
asw::display::set_title("My Game");
asw::display::set_icon("icon.png");

// Game loop
asw::display::clear();
// draw here...
asw::display::present();
```
