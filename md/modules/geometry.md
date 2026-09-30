# Geometry

Common geometry types: 2D/3D vectors and rectangles.

**Header:** `#include <asw/modules/geometry.h>`\
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
| `angle()` | `Real` | Angle of the vector in radians |
| `angle(const Vec2& other)` | `Real` | Angle between two vectors in radians |
| `distance(const Vec2& other)` | `Real` | Distance between two vectors |
| `dot(const Vec2& other)` | `T` | Dot product |
| `cross(const Vec2& other)` | `T` | Cross product (scalar) |
| `magnitude()` | `Real` | Length of the vector |
| `normalized()` | `Vec2` | Unit vector with the same direction. A zero vector if the length is `0`. Only for floating-point `T` |
| `distance_to_segment(const Vec2& start, const Vec2& end)` | `Real` | Distance from this point to the nearest point on the line segment from `start` to `end`. Useful for beams, lasers and swept hit checks. If `start` and `end` are the same point, the distance to `start` |

### Static Methods

| Method | Return | Description |
|--------|--------|-------------|
| `from_angle(T angle, T length = T(1))` | `Vec2` | Vector that points at `angle` (radians, clockwise from the positive x axis, like the rest of ASW) with length `length`. Only for floating-point `T` |

`Real` is `T` for floating-point vectors and `float` for integer vectors, so lengths and angles of integer vectors are not truncated.

### Operators

`+`, `-`, `*`, `/`, `%`, `+=`, `-=`, `*=`, `/=`, `%=`, `==`

Arithmetic operators work with other `Vec2` instances or scalar values. `%` and `%=` take a scalar only, and need an integral `T`.

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
| `angle(const Vec3& other)` | `Real` | Angle between two vectors in radians. `0` if either vector has no length |
| `distance(const Vec3& other)` | `Real` | Distance between two vectors |
| `dot(const Vec3& other)` | `T` | Dot product |
| `cross(const Vec3& other)` | `Vec3` | Cross product (vector) |
| `magnitude()` | `Real` | Length of the vector |

`Real` is the same as for `Vec2`.

### Operators

`+`, `-`, `*`, `/`, `%`, `+=`, `-=`, `*=`, `/=`, `%=`, `==`

`%` and `%=` take a scalar only, and need an integral `T`.

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
| `set_position(T x, T y)` | `void` | Set the position |
| `set_size(T width, T height)` | `void` | Set the size |
| `get_center()` | `Vec2<T>` | Get the center point |
| `contains(const Vec2<T>& point)` | `bool` | Point-in-rect test. The left and top edges are inside, the right and bottom edges are not, as for `collides`. Thus rectangles that share an edge never both contain a point |
| `contains(T x, T y)` | `bool` | Same as `contains(point)` |
| `collides(const Quad& other)` | `bool` | AABB collision test |
| `collides_top(const Quad& other)` | `bool` | Top-edge collision |
| `collides_bottom(const Quad& other)` | `bool` | Bottom-edge collision |
| `collides_left(const Quad& other)` | `bool` | Left-edge collision |
| `collides_right(const Quad& other)` | `bool` | Right-edge collision |
| `closest_point(const Vec2<T>& point)` | `Vec2<T>` | Point in or on the rectangle that is closest to `point`. Returns `point` if it is inside. Works with a negative size |
| `distance_to(const Vec2<T>& point)` | `Vec2<T>::Real` | Distance from `point` to the edge of the rectangle. `0` if the point is inside |
| `get_push_out(const Quad& other)` | `Vec2<T>` | Smallest move that pushes this rectangle out of `other`, along the axis with the smallest overlap. A zero vector if the rectangles do not overlap |

Add the result of `get_push_out` to the position of the rectangle to stop a moving box from going into solid scenery.

### Operators

`+` and `-` take another `Quad` and add or subtract both its position and its size. `*` and `/` take a scalar.

## Type Aliases

| Alias | Type |
|-------|------|
| `asw::Vec2f` | `Vec2<float>` |
| `asw::Vec2i` | `Vec2<int>` |
| `asw::Vec3f` | `Vec3<float>` |
| `asw::Vec3i` | `Vec3<int>` |
| `asw::Quadf` | `Quad<float>` |
| `asw::Quadi` | `Quad<int>` |
| `asw::Polygonf` | `Polygon<float>` |

## Polygon

```cpp
template <typename T>
using Polygon = std::vector<Vec2<T>>;
```

A polygon, as its corners in order. The last corner joins the first. Draw one with [`draw::polygon()`](./draw#polygon) and [`draw::polygon_fill()`](./draw#polygon-fill).

## Polygon and Ray Functions

**Namespace:** `asw::geometry`

| Function | Return | Description |
|----------|--------|-------------|
| `signed_area(const Polygon<T>& polygon)` | `Vec2<T>::Real` | Area of the polygon. Positive when the corners go clockwise on screen, negative when they go anticlockwise |
| `bounds(const Polygon<T>& polygon)` | `Quad<T>` | Smallest rectangle that holds every corner. An empty rectangle at `0, 0` for no corners |
| `point_in_triangle(point, a, b, c)` | `bool` | `true` if `point` is inside the triangle `a`, `b`, `c`. Points on an edge are inside |
| `ray_hit(origin, direction, a, b)` | `std::optional<float>` | Where a ray hits the segment `a`-`b`, as a distance along the ray in lengths of `direction`. Nothing if the ray misses or runs along the segment. `direction` does not need to be normalized |

### `visibility`

```cpp
Polygonf visibility(const Vec2f& from, float radius, const std::vector<Polygonf>& occluders,
                    float direction = 0.0F, float cone = 0.0F);

void visibility(Polygonf& result, const Vec2f& from, float radius,
                const std::vector<Polygonf>& occluders,
                float direction = 0.0F, float cone = 0.0F);

void visibility(Polygonf& result, const Vec2f& from, float radius,
                const std::vector<Polygonf>& occluders,
                const std::vector<Quadf>& occluder_bounds,
                float direction = 0.0F, float cone = 0.0F);
```

Find the area that can be seen from a point, e.g. for a field of view or for light. Rays stop at the first polygon edge, and at a square of half size `radius` around `from`. The result is the edge of the visible area, in angle order. It does not include `from`.

| Parameter | Description |
|-----------|-------------|
| `from` | The point to look from |
| `radius` | How far to look |
| `occluders` | Polygons that block the view |
| `direction` | Direction to look, in radians, when `cone` is set |
| `cone` | Width of the view, in radians. `0` looks all round |
| `result` | Replaced with the visible area. Keep it between calls, so the function does not allocate each time |
| `occluder_bounds` | The `bounds()` of each occluder, in the same order. Calculate them once per frame when many points use the same occluders |

```cpp
std::vector<asw::Polygonf> walls = {{{100, 100}, {160, 100}, {160, 140}, {100, 140}}};
asw::Polygonf view;
asw::geometry::visibility(view, player, 200.0F, walls);
asw::draw::polygon_fill(view, asw::color::white.with_alpha(40));
```

## Example

```cpp
asw::Vec2<float> pos(100.0f, 200.0f);
asw::Vec2<float> vel(1.0f, 0.0f);
pos += vel * asw::core::get_delta_time();

asw::Quad<float> player(100, 200, 32, 32);
asw::Quad<float> enemy(150, 210, 32, 32);

if (player.collides(enemy)) {
  // handle collision
}

// Push the player out of a wall
asw::Quad<float> wall(120, 180, 64, 64);
player.position += player.get_push_out(wall);

// Move at a constant speed in any direction
asw::Vec2<float> dir = asw::Vec2<float>(3.0f, 4.0f).normalized(); // (0.6, 0.8)
asw::Vec2<float> velocity = asw::Vec2<float>::from_angle(0.785f, 200.0f);

// Check if the player touches a laser beam
asw::Vec2<float> beam_start(0.0f, 50.0f), beam_end(400.0f, 250.0f);
if (player.get_center().distance_to_segment(beam_start, beam_end) < 16.0f) {
  // hit by the beam
}

if (player.contains(asw::input::get_mouse().position)) {
  // mouse is over the player
}
```
