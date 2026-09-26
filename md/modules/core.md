# Core

Core routines including initialization and the main loop.

**Header:** `#include <asw/modules/core.h>`
**Namespace:** `asw::core`

## Functions

### `init`

```cpp
void init(int width, int height, int scale = 1);
```

Initializes the core module. This must be called before using any other ASW functionality.

| Parameter | Type | Description |
|-----------|------|-------------|
| `width` | `int` | The width of the window |
| `height` | `int` | The height of the window |
| `scale` | `int` | The scale of the window (default: `1`) |

### `init_opengl`

```cpp
void init_opengl(int width, int height, int scale = 1);
```

Initializes the core module with an OpenGL context instead of an SDL renderer. The parameters are the same as `init`. Use `asw::display::swap_window()` to present each frame.

### `update`

```cpp
void update();
```

Updates core module functionality. Called each frame to process events and update input state.

### `print_info`

```cpp
void print_info();
```

Prints information about the core module to the console.

### `exit`

```cpp
void exit();
```

Exit the application. Sets the exiting flag, which causes the main loop to exit on the next update.

### `is_exiting`

```cpp
bool is_exiting();
```

Returns `true` after `exit()` was called or the window was closed.

### `shutdown`

```cpp
void shutdown();
```

Release the resources that the core module uses. Call this on application exit, after the main loop.

## Example

```cpp
#include <asw/asw.h>

int main() {
  asw::core::init(640, 480, 2);

  while (!asw::core::is_exiting()) {
    asw::core::update();

    if (asw::input::get_key_down(asw::input::Key::Escape)) {
      asw::core::exit();
    }

    // game logic here
  }

  asw::core::shutdown();
  return 0;
}
```
