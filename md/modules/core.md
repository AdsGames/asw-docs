# Core

Core routines including initialization and the main loop.

**Header:** `#include <asw/modules/core.h>`\
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

Updates core module functionality. Called each frame to process events, update input state and update the sound module (fades, ducking and positional sounds).

### `run`

```cpp
void run(const std::function<void()>& frame);
```

Run a main loop until `exit()` is called. `run` calls `frame` once per frame. In `frame`, call `update()`, run your game logic, draw, and call `asw::display::present()`.

- **Desktop:** `run` is a plain loop. It returns after `exit()` is called, so you can call `shutdown()` after it.
- **Browser (Emscripten):** the browser runs the loop with `emscripten_set_main_loop`. `run` does not return, and code after it does not run. When `exit()` is called, the loop stops and `Module.onStop` is called if the web page defines it. The ASW example pages use this to show a restart message.

Use `run` instead of a `while (!is_exiting())` loop, so that the same code works on desktop and in the browser. A `while` loop blocks the browser, so the page freezes. [`SceneManager::start()`](./scene#start) uses `run` in the browser too.

```cpp
asw::core::run([&]() {
  asw::core::update();
  // game logic and drawing
  asw::display::present();
});
```

### `get_delta_time`

```cpp
float get_delta_time();
```

Get the time in seconds between the last two calls to `update()`. The value is capped at `0.25` seconds, so a breakpoint or a stalled window does not make objects jump. Returns `0` before the second call to `update()`.

Use this in a custom loop. The managed `SceneManager::start()` loop passes a fixed `dt` to your scenes.

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

  asw::core::run([&]() {
    asw::core::update();
    const float dt = asw::core::get_delta_time();

    if (asw::input::get_key_down(asw::input::Key::Escape)) {
      asw::core::exit();
    }

    // game logic here, scaled by dt

    asw::display::present();
  });

  asw::core::shutdown(); // desktop only, run() does not return in the browser
  return 0;
}
```
