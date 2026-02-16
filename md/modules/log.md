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

### `setLevel`

```cpp
void setLevel(Level level);
```

Set the minimum log level. Messages below this level are discarded.

### `setOutput`

```cpp
void setOutput(std::ostream& stream);
```

Set the output stream for log messages (default: `std::cerr`).

### `debug`

```cpp
void debug(const std::string& message);
```

Log a debug-level message.

### `info`

```cpp
void info(const std::string& message);
```

Log an info-level message.

### `warn`

```cpp
void warn(const std::string& message);
```

Log a warning-level message.

### `error`

```cpp
void error(const std::string& message);
```

Log an error-level message.

## Example

```cpp
asw::log::setLevel(asw::log::Level::INFO);

asw::log::debug("This won't appear"); // below INFO level
asw::log::info("Game started");
asw::log::warn("Low memory");
asw::log::error("Failed to load asset");

// Log to a file
std::ofstream logFile("game.log");
asw::log::setOutput(logFile);
```
