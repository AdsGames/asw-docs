# Timer

A simple, cross-platform timer class based on `<chrono>`.

**Header:** `#include <asw/util/Timer.h>`

## Class: Timer

```cpp
class Timer;
```

### Methods

#### `start`

```cpp
void start();
```

Start the timer.

#### `stop`

```cpp
void stop();
```

Stop the timer. The elapsed time is preserved.

#### `isRunning`

```cpp
bool isRunning() const;
```

Returns `true` if the timer is currently running.

#### `reset`

```cpp
void reset();
```

Reset the timer to zero.

#### `getElapsedTime`

```cpp
template <typename Precision>
double getElapsedTime();
```

Get the elapsed time in the given precision. If the timer is running, it returns the time up to now. If stopped, it returns the time between start and stop.

| Precision | Unit |
|-----------|------|
| `std::chrono::seconds` | Seconds |
| `std::chrono::milliseconds` | Milliseconds |
| `std::chrono::microseconds` | Microseconds |
| `std::chrono::nanoseconds` | Nanoseconds |

## Example

```cpp
#include <asw/util/Timer.h>

Timer timer;
timer.start();

// ... do work ...

double ms = timer.getElapsedTime<std::chrono::milliseconds>();
double sec = timer.getElapsedTime<std::chrono::seconds>();

timer.stop();
timer.reset();
```
