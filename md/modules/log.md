# Log

Structured logging system with severity levels.

**Header:** `#include <asw/modules/log.h>`\
**Namespace:** `asw::log`

## Log Levels

```cpp
enum class Level { Debug, Info, Warn, Error };
```

Messages below the configured minimum level are ignored. The default level is `Info`.

Each message starts with the local time, with milliseconds (for example, `[14:03:27.412]`).

## Functions

### `log_message`

```cpp
void log_message(Level level, const std::string& message);
```

Log a message at a specific severity level.

### `set_level`

```cpp
void set_level(Level level);
```

Set the minimum log level. Messages below this level are discarded.

### `set_output`

```cpp
void set_output(std::ostream& stream);
```

Set the output stream for log messages (default: `std::cerr`).

### `debug`

```cpp
void debug(const std::string& message);

template <typename... Args>
void debug(std::format_string<Args...> format, Args&&... args);
```

Log a debug-level message. The template overload supports `std::format`-style formatting.

### `info`

```cpp
void info(const std::string& message);

template <typename... Args>
void info(std::format_string<Args...> format, Args&&... args);
```

Log an info-level message. The template overload supports `std::format`-style formatting.

### `warn`

```cpp
void warn(const std::string& message);

template <typename... Args>
void warn(std::format_string<Args...> format, Args&&... args);
```

Log a warning-level message. The template overload supports `std::format`-style formatting.

### `error`

```cpp
void error(const std::string& message);

template <typename... Args>
void error(std::format_string<Args...> format, Args&&... args);
```

Log an error-level message. The template overload supports `std::format`-style formatting.

### `progress`

```cpp
void progress(float progress, std::string message);

template <typename... Args>
void progress(float prog, std::format_string<Args...> format, Args&&... args);
```

Log a progress message with a progress bar and a percentage. `progress` is a value from `0.0` to `1.0`. The template overload supports `std::format`-style formatting.

## Example

```cpp
asw::log::set_level(asw::log::Level::Info);

asw::log::debug("This won't appear"); // below Info level
asw::log::info("Game started");
asw::log::warn("Low memory");
asw::log::error("Failed to load asset");

// Formatted logging
asw::log::info("Player {} scored {} points", player_name, score);
asw::log::debug("Position: ({}, {})", x, y);
asw::log::error("Failed to load file: {}", filename);

// Progress
asw::log::progress(0.5f, "Loading assets ({}/{})", loaded, total);

// Log to a file (needs #include <fstream>)
std::ofstream log_file("game.log");
asw::log::set_output(log_file);
```
