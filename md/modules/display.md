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

### `setTitle`

```cpp
void setTitle(const std::string& title);
```

Set the title of the window.

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `const std::string&` | The title to display at the top of the window |

### `setIcon`

```cpp
void setIcon(const std::string& path);
```

Set the icon to display on the window. Silently fails if the file does not exist.

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | `const std::string&` | Path to the icon file |

### `setFullscreen`

```cpp
void setFullscreen(bool fullscreen);
```

Set the window to fullscreen or windowed mode.

### `setResolution`

```cpp
void setResolution(int w, int h);
```

Set the resolution of the window.

| Parameter | Type | Description |
|-----------|------|-------------|
| `w` | `int` | Width of the window |
| `h` | `int` | Height of the window |

### `setResizable`

```cpp
void setResizable(bool resizable);
```

Set whether the window is resizable.

### `getSize`

```cpp
SDL_Point getSize();
```

Returns the actual size of the window.

### `getLogicalSize`

```cpp
SDL_Point getLogicalSize();
```

Returns the logical size of the window. This may differ from the actual size if scaling is enabled.

### `getScale`

```cpp
SDL_FPoint getScale();
```

Returns the scale of the window (logical size / actual size).

### `setRenderTarget`

```cpp
void setRenderTarget(const asw::Texture& texture);
```

Set the render target to a texture.

### `resetRenderTarget`

```cpp
void resetRenderTarget();
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

### `setBlendMode`

```cpp
void setBlendMode(asw::BlendMode mode);
```

Set the blend mode of the renderer.

## Example

```cpp
asw::display::setTitle("My Game");
asw::display::setIcon("icon.png");

// Game loop
asw::display::clear();
// draw here...
asw::display::present();
```
