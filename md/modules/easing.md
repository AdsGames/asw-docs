# Easing

Easing functions for smooth animations and transitions.

**Header:** `#include <asw/modules/easing.h>`
**Namespace:** `asw::easing`

## Functions

All easing functions take a progress value `t` (0.0 - 1.0) and return the eased value.

### Linear

| Function | Description |
|----------|-------------|
| `linear(float t)` | No easing, linear interpolation |

### Quadratic

| Function | Description |
|----------|-------------|
| `ease_in_quad(float t)` | Accelerating from zero |
| `ease_out_quad(float t)` | Decelerating to zero |
| `ease_in_out_quad(float t)` | Acceleration then deceleration |

### Cubic

| Function | Description |
|----------|-------------|
| `ease_in_cubic(float t)` | Accelerating from zero (steeper) |
| `ease_out_cubic(float t)` | Decelerating to zero (steeper) |
| `ease_in_out_cubic(float t)` | Acceleration then deceleration (steeper) |

### Sine

| Function | Description |
|----------|-------------|
| `ease_in_sine(float t)` | Sinusoidal ease in |
| `ease_out_sine(float t)` | Sinusoidal ease out |
| `ease_in_out_sine(float t)` | Sinusoidal ease in and out |

### Exponential

| Function | Description |
|----------|-------------|
| `ease_in_expo(float t)` | Exponential ease in |
| `ease_out_expo(float t)` | Exponential ease out |
| `ease_in_out_expo(float t)` | Exponential ease in and out |

### Elastic

| Function | Description |
|----------|-------------|
| `ease_in_elastic(float t)` | Elastic spring effect (ease in) |
| `ease_out_elastic(float t)` | Elastic spring effect (ease out) |

### Bounce

| Function | Description |
|----------|-------------|
| `ease_in_bounce(float t)` | Bounce effect (ease in) |
| `ease_out_bounce(float t)` | Bounce effect (ease out) |

### Back (Overshoot)

| Function | Description |
|----------|-------------|
| `ease_in_back(float t)` | Slight overshoot (ease in) |
| `ease_out_back(float t)` | Slight overshoot (ease out) |

## Convenience

### `ease`

```cpp
template <typename T, typename Func>
T ease(const T& a, const T& b, float t, Func func);
```

Apply an easing function and interpolate between two values. The progress `t` is clamped to 0.0 - 1.0. `T` must be an arithmetic type, and `Func` must be a callable that takes a `float` and returns a `float`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `a` | `const T&` | Start value |
| `b` | `const T&` | End value |
| `t` | `float` | Progress (0.0 - 1.0) |
| `func` | `Func` | Easing function or callable to apply |

## Example

```cpp
float progress = elapsed_time / total_time;

// Ease a float value
float x = asw::easing::ease(0.0f, 100.0f, progress, asw::easing::ease_out_quad);

// Use a lambda as the easing function
float y = asw::easing::ease(0.0f, 100.0f, progress, [](float t) {
  return t * t * t;
});

// Use individual functions directly
float t = asw::easing::ease_out_bounce(progress);
```
