# Display

Display and window management routines.

**Header:** `#include <asw/modules/display.h>`
**Namespace:** `asw::display`

## Functions

### `get_renderer`

```cpp
asw::Renderer* get_renderer();
```

Get the SDL renderer. Returns `nullptr` if the display is not initialized, or if it was initialized with `init_opengl`.

### `get_window`

```cpp
asw::Window* get_window();
```

Get the SDL window. Returns `nullptr` if the display is not initialized.

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

### `warp_mouse`

```cpp
void warp_mouse(float x, float y);
```

Move the mouse cursor to a position in the window.

### `swap_window`

```cpp
void swap_window();
```

Swap the window buffers. Use this instead of `present()` when you initialize with `asw::core::init_opengl`.

## Example

```cpp
asw::display::set_title("My Game");
asw::display::set_icon("icon.png");

// Game loop
asw::display::clear();
// draw here...
asw::display::present();
```
