# Sound

Audio playback for sound effects and music.

**Header:** `#include <asw/modules/sound.h>`
**Namespace:** `asw::sound`

## Sound Effects

### `play`

```cpp
void play(const asw::Sample& sample,
          float volume = 1.0F,
          float pan = 0.0F,
          bool loop = false);
```

Play a sound effect sample.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sample` | `const asw::Sample&` | | The sample to play |
| `volume` | `float` | `1.0` | Playback volume (0.0 - 1.0) |
| `pan` | `float` | `0.0` | Panning: -1.0 (left) to 1.0 (right) |
| `loop` | `bool` | `false` | Infinite loop when `true` |

## Music

### `play_music`

```cpp
void play_music(const asw::Music& sample, float volume = 1.0F);
```

Play a music track.

### `stop_music`

```cpp
void stop_music();
```

Stop the currently playing music.

### `fade_in_music`

```cpp
void fade_in_music(const asw::Music& music, float volume, float duration);
```

Fade in music over a duration.

| Parameter | Type | Description |
|-----------|------|-------------|
| `music` | `const asw::Music&` | The music to play |
| `volume` | `float` | Target volume (0.0 - 1.0) |
| `duration` | `float` | Fade duration in seconds |

### `fade_out_music`

```cpp
void fade_out_music(float duration);
```

Fade out the currently playing music over the given duration (in seconds).

### `pause_music`

```cpp
void pause_music();
```

Pause the currently playing music.

### `resume_music`

```cpp
void resume_music();
```

Resume paused music.

### `is_music_playing`

```cpp
bool is_music_playing();
```

Returns `true` if music is currently playing.

### `is_music_paused`

```cpp
bool is_music_paused();
```

Returns `true` if music is currently paused.

## Volume Control

### `set_master_volume`

```cpp
void set_master_volume(float volume);
```

Set the master volume multiplier (affects all audio). Range: 0.0 - 1.0.

### `set_sfx_volume`

```cpp
void set_sfx_volume(float volume);
```

Set the SFX volume multiplier. Range: 0.0 - 1.0.

### `set_music_volume`

```cpp
void set_music_volume(float volume);
```

Set the music volume multiplier. Range: 0.0 - 1.0.

### `get_master_volume`

```cpp
float get_master_volume();
```

Get the current master volume.

### `get_sfx_volume`

```cpp
float get_sfx_volume();
```

Get the current SFX volume.

### `get_music_volume`

```cpp
float get_music_volume();
```

Get the current music volume.

## Example

```cpp
auto sfx = asw::assets::load_sample("explosion.wav");
auto bgm = asw::assets::load_music("theme.ogg");

// Play sound effect
asw::sound::play(sfx, 0.8f);

// Play music with fade in (2 seconds)
asw::sound::fade_in_music(bgm, 0.5f, 2.0f);

// Volume controls
asw::sound::set_master_volume(0.7f);
asw::sound::set_sfx_volume(1.0f);
asw::sound::set_music_volume(0.5f);
```
