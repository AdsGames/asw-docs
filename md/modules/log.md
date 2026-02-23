# Log

Structured logging system with severity levels.

**Header:** `#include <asw/modules/log.h>`
**Namespace:** `asw::log`

## Log Levels

```cpp
enum class Level { DEBUG, INFO, WARN, ERROR };
```

Messages below the configured minimum level are ignored.

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

## Example

```cpp
asw::log::set_level(asw::log::Level::INFO);

asw::log::debug("This won't appear"); // below INFO level
asw::log::info("Game started");
asw::log::warn("Low memory");
asw::log::error("Failed to load asset");

// Formatted logging
asw::log::info("Player {} scored {} points", player_name, score);
asw::log::debug("Position: ({}, {})", x, y);
asw::log::error("Failed to load file: {}", filename);

// Log to a file
std::ofstream log_file("game.log");
asw::log::set_output(log_file);
```
