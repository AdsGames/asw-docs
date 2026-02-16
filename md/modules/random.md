# Random

Random number generation utilities.

**Header:** `#include <asw/modules/random.h>`
**Namespace:** `asw::random`

## Functions

### `random` (int)

```cpp
int random(int max);
```

Generate a random integer between 0 and `max`.

### `random` (float)

```cpp
float random(float max);
```

Generate a random float between 0 and `max`.

### `between` (int)

```cpp
int between(int min, int max);
```

Generate a random integer between `min` and `max` (inclusive).

### `between` (float)

```cpp
float between(float min, float max);
```

Generate a random float between `min` and `max`.

### `chance`

```cpp
bool chance();
```

Generate a random boolean (50/50).

```cpp
bool chance(float chance);
```

Generate a random boolean with a given probability of being `true`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `chance` | `float` | Probability of returning `true` (0.0 - 1.0) |

## Example

```cpp
// Random integer 0-99
int roll = asw::random::random(99);

// Random float in range
float speed = asw::random::between(50.0f, 150.0f);

// Random direction
float angle = asw::random::between(0.0f, 6.2832f);

// 30% chance to spawn powerup
if (asw::random::chance(0.3f)) {
  // spawn powerup
}

// Coin flip
bool heads = asw::random::chance();
```
