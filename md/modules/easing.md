# Easing

Easing functions for smooth animations and transitions.

**Header:** `#include <asw/modules/easing.h>`
**Namespace:** `asw::easing`

## Type Alias

```cpp
using EaseFunc = float (*)(float);
```

All easing functions take a progress value `t` (0.0 - 1.0) and return the eased value.

## Functions

### Linear

| Function | Description |
|----------|-------------|
| `linear(float t)` | No easing, linear interpolation |

### Quadratic

| Function | Description |
|----------|-------------|
| `easeInQuad(float t)` | Accelerating from zero |
| `easeOutQuad(float t)` | Decelerating to zero |
| `easeInOutQuad(float t)` | Acceleration then deceleration |

### Cubic

| Function | Description |
|----------|-------------|
| `easeInCubic(float t)` | Accelerating from zero (steeper) |
| `easeOutCubic(float t)` | Decelerating to zero (steeper) |
| `easeInOutCubic(float t)` | Acceleration then deceleration (steeper) |

### Sine

| Function | Description |
|----------|-------------|
| `easeInSine(float t)` | Sinusoidal ease in |
| `easeOutSine(float t)` | Sinusoidal ease out |
| `easeInOutSine(float t)` | Sinusoidal ease in and out |

### Exponential

| Function | Description |
|----------|-------------|
| `easeInExpo(float t)` | Exponential ease in |
| `easeOutExpo(float t)` | Exponential ease out |
| `easeInOutExpo(float t)` | Exponential ease in and out |

### Elastic

| Function | Description |
|----------|-------------|
| `easeInElastic(float t)` | Elastic spring effect (ease in) |
| `easeOutElastic(float t)` | Elastic spring effect (ease out) |

### Bounce

| Function | Description |
|----------|-------------|
| `easeInBounce(float t)` | Bounce effect (ease in) |
| `easeOutBounce(float t)` | Bounce effect (ease out) |

### Back (Overshoot)

| Function | Description |
|----------|-------------|
| `easeInBack(float t)` | Slight overshoot (ease in) |
| `easeOutBack(float t)` | Slight overshoot (ease out) |

## Convenience

### `ease`

```cpp
template <typename T>
T ease(const T& a, const T& b, float t, EaseFunc func);
```

Apply an easing function and interpolate between two values. The progress `t` is clamped to 0.0 - 1.0.

| Parameter | Type | Description |
|-----------|------|-------------|
| `a` | `const T&` | Start value |
| `b` | `const T&` | End value |
| `t` | `float` | Progress (0.0 - 1.0) |
| `func` | `EaseFunc` | Easing function to apply |

## Example

```cpp
float progress = elapsedTime / totalTime;

// Ease a float value
float x = asw::easing::ease(0.0f, 100.0f, progress, asw::easing::easeOutQuad);

// Ease a Vec2
asw::Vec2<float> start(0.0f, 0.0f);
asw::Vec2<float> end(200.0f, 100.0f);
auto pos = asw::easing::ease(start, end, progress, asw::easing::easeInOutCubic);

// Use individual functions directly
float t = asw::easing::easeOutBounce(progress);
```
