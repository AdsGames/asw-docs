# Config

Settings from a config file, set by the person who runs the game. For example, an arcade launcher can start every game fullscreen.

**Header:** `#include <asw/modules/config.h>`\
**Namespace:** `asw::config`

## Config file

Set the `ASW_CONFIG` environment variable to the path of the file:

```sh
ASW_CONFIG=arcade.cfg ./my_game
```

[`asw::core::init()`](./core#init) loads the file before it opens the window. Each line is `key = value`. Blank lines, and lines that start with `#` or `;`, are ignored. Keys are grouped with dots.

```ini
# arcade.cfg
display.fullscreen = true
display.vsync = true
```

### Display keys

ASW reads these keys itself. They win over the values that the game gives.

| Key | Values | Description |
|-----|--------|-------------|
| `display.fullscreen` | `true` or `false` | Start fullscreen or windowed. [`display::set_fullscreen()`](./display#set-fullscreen) then has no effect |
| `display.scale` | `1` to `16` | Window scale, instead of the `scale` given to `core::init()`. Other values are ignored with a warning |
| `display.vsync` | `true` or `false` | Turn vsync on or off |

Games can add their own keys, and read them with the functions below.

## Functions

### `load`

```cpp
bool load(const std::string& path);
```

Load settings from a file. Settings that are already loaded stay, unless the file sets them again. Returns `true` if the file was read.

### `has`

```cpp
bool has(const std::string& key);
```

Returns `true` if the setting is set.

### `get_string` / `get_bool` / `get_int` / `get_float`

```cpp
std::optional<std::string> get_string(const std::string& key);
std::optional<bool> get_bool(const std::string& key);
std::optional<int> get_int(const std::string& key);
std::optional<float> get_float(const std::string& key);
```

Get a setting as text, true or false, a whole number, or a number. Each function returns nothing if the setting is not set, or if the value is not of that type.

For `get_bool`, `1`, `true`, `yes` and `on` are true, and `0`, `false`, `no` and `off` are false. Case does not matter.

### `PATH_VARIABLE`

```cpp
inline constexpr const char* PATH_VARIABLE = "ASW_CONFIG";
```

The name of the environment variable that holds the path of the config file.

## Example

```ini
# game.cfg
game.difficulty = hard
game.lives = 5
```

```cpp
const int lives = asw::config::get_int("game.lives").value_or(3);
const bool hard = asw::config::get_string("game.difficulty") == "hard";
```
