# Geometry

Common geometry types: 2D/3D vectors and rectangles.

**Header:** `#include <asw/modules/geometry.h>`
**Namespace:** `asw`

## Vec2

A templated 2D vector used for positions, directions, and sizes.

```cpp
template <typename T>
class Vec2;
```

### Constructors

```cpp
Vec2();            // (0, 0)
Vec2(T x, T y);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `x` | `T` | X component |
| `y` | `T` | Y component |

### Methods

| Method | Return | Description |
|--------|--------|-------------|
| `angle()` | `T` | Angle of the vector in radians |
| `angle(const Vec2& other)` | `T` | Angle between two vectors in radians |
| `distance(const Vec2& other)` | `T` | Distance between two vectors |
| `dot(const Vec2& other)` | `T` | Dot product |
| `cross(const Vec2& other)` | `T` | Cross product (scalar) |
| `magnitude()` | `T` | Length of the vector |

### Operators

`+`, `-`, `*`, `/`, `+=`, `-=`, `*=`, `/=`, `==`, `!=`

Arithmetic operators work with other `Vec2` instances or scalar values.

## Vec3

A templated 3D vector.

```cpp
template <typename T>
class Vec3;
```

### Constructors

```cpp
Vec3();                // (0, 0, 0)
Vec3(T x, T y, T z);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `x` | `T` | X component |
| `y` | `T` | Y component |
| `z` | `T` | Z component |

### Methods

| Method | Return | Description |
|--------|--------|-------------|
| `angle(const Vec3& other)` | `T` | Angle between two vectors in radians |
| `distance(const Vec3& other)` | `T` | Distance between two vectors |
| `dot(const Vec3& other)` | `T` | Dot product |
| `cross(const Vec3& other)` | `Vec3` | Cross product (vector) |
| `magnitude()` | `T` | Length of the vector |

### Operators

`+`, `-`, `*`, `/`, `+=`, `-=`, `*=`, `/=`, `==`, `!=`

## Quad

A templated 2D rectangle defined by position and size. Used for bounding boxes, sprite regions, and collision detection.

```cpp
template <typename T>
class Quad;
```

### Constructors

```cpp
Quad();
Quad(const Vec2<T>& position, const Vec2<T>& size);
Quad(T x, T y, T width, T height);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `position` | `Vec2<T>` | Top-left position |
| `size` | `Vec2<T>` | Width and height |

### Methods

| Method | Return | Description |
|--------|--------|-------------|
| `setPosition(T x, T y)` | `void` | Set the position |
| `setSize(T width, T height)` | `void` | Set the size |
| `getCenter()` | `Vec2<T>` | Get the center point |
| `contains(const Vec2<T>& point)` | `bool` | Point-in-rect test |
| `contains(T x, T y)` | `bool` | Point-in-rect test |
| `collides(const Quad& other)` | `bool` | AABB collision test |
| `collidesTop(const Quad& other)` | `bool` | Top-edge collision |
| `collidesBottom(const Quad& other)` | `bool` | Bottom-edge collision |
| `collidesLeft(const Quad& other)` | `bool` | Left-edge collision |
| `collidesRight(const Quad& other)` | `bool` | Right-edge collision |

### Operators

`+`, `-`, `*`, `/` (with other `Quad` or scalar values)

## Example

```cpp
asw::Vec2<float> pos(100.0f, 200.0f);
asw::Vec2<float> vel(1.0f, 0.0f);
pos += vel * deltaTime;

asw::Quad<float> player(100, 200, 32, 32);
asw::Quad<float> enemy(150, 210, 32, 32);

if (player.collides(enemy)) {
  // handle collision
}

if (player.contains(asw::input::mouse.position)) {
  // mouse is over the player
}
```
