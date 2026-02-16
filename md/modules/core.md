# Core

Core routines including initialization and the main loop.

**Header:** `#include <asw/modules/core.h>`
**Namespace:** `asw::core`

## Variables

### `exit`

```cpp
extern bool exit;
```

When set to `true`, exits the main loop.

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

## Example

```cpp
#include <asw/asw.h>

int main() {
  asw::core::init(640, 480, 2);

  while (!asw::core::exit) {
    asw::core::update();
    // game logic here
  }

  return 0;
}
```
