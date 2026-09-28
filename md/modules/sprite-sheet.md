# Sprite Sheet

Sprite sheets and frame animation.

**Header:** `#include <asw/modules/sprite_sheet.h>`\
**Namespace:** `asw`

<PlayableExample name="camera" />

*From the [camera example](../examples#camera).*

## SpriteSheet

A texture divided into frames of equal size. Frames are read from left to right, then from top to bottom.

```cpp
class SpriteSheet;
```

### Constructors

```cpp
SpriteSheet();
SpriteSheet(const Texture& texture, const Vec2<float>& frame_size, int frame_count = 0);
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `texture` | `const Texture&` | | The texture that holds the frames |
| `frame_size` | `const Vec2<float>&` | | The size of one frame in pixels |
| `frame_count` | `int` | `0` | The number of frames. `0` uses all frames that fit in the texture |

The default constructor makes an empty sprite sheet.

### Methods

| Method | Return | Description |
|--------|--------|-------------|
| `get_texture() const` | `const Texture&` | Get the texture |
| `get_frame_size() const` | `Vec2<float>` | Get the size of one frame in pixels |
| `get_frame_count() const` | `int` | Get the number of frames |
| `get_frame(int index) const` | `Quad<float>` | Get the source area of a frame in the texture, in pixels |
| `draw_frame(int index, const Quad<float>& dest) const` | `void` | Draw a frame stretched to an area of the screen |

For `get_frame` and `draw_frame`, an `index` after the last frame wraps around to the start.

## Animation

Steps through frames over time. Use it with a `SpriteSheet`.

```cpp
class Animation;
```

### Constructors

```cpp
Animation();
Animation(int frame_count, float frame_duration, bool loop = true);
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `frame_count` | `int` | | The number of frames |
| `frame_duration` | `float` | | Seconds that each frame shows |
| `loop` | `bool` | `true` | Start again after the last frame |

The default constructor makes an animation with one frame.

### Methods

| Method | Return | Description |
|--------|--------|-------------|
| `update(float dt)` | `void` | Advance the animation by `dt` seconds |
| `reset()` | `void` | Go back to the first frame |
| `set_frame_duration(float frame_duration)` | `void` | Set the number of seconds that each frame shows |
| `get_frame() const` | `int` | Get the frame index to draw |
| `is_finished() const` | `bool` | `true` when an animation that does not loop is at its last frame. Always `false` for looping animations |

## Example

```cpp
auto texture = asw::assets::load_texture("player_run.png");
asw::SpriteSheet sheet(texture, asw::Vec2<float>(16.0f, 16.0f));
asw::Animation run(sheet.get_frame_count(), 0.08f);

// Update
run.update(dt);

// Draw at 2x size
sheet.draw_frame(run.get_frame(), asw::Quad<float>(100.0f, 100.0f, 32.0f, 32.0f));
```
