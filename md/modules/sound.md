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

### `playMusic`

```cpp
void playMusic(const asw::Music& sample, float volume = 1.0F);
```

Play a music track.

### `stopMusic`

```cpp
void stopMusic();
```

Stop the currently playing music.

### `fadeInMusic`

```cpp
void fadeInMusic(const asw::Music& music, float volume, int durationMs);
```

Fade in music over a duration.

| Parameter | Type | Description |
|-----------|------|-------------|
| `music` | `const asw::Music&` | The music to play |
| `volume` | `float` | Target volume (0.0 - 1.0) |
| `durationMs` | `int` | Fade duration in milliseconds |

### `fadeOutMusic`

```cpp
void fadeOutMusic(int durationMs);
```

Fade out the currently playing music over the given duration.

### `pauseMusic`

```cpp
void pauseMusic();
```

Pause the currently playing music.

### `resumeMusic`

```cpp
void resumeMusic();
```

Resume paused music.

### `isMusicPlaying`

```cpp
bool isMusicPlaying();
```

Returns `true` if music is currently playing.

### `isMusicPaused`

```cpp
bool isMusicPaused();
```

Returns `true` if music is currently paused.

## Volume Control

### `setMasterVolume`

```cpp
void setMasterVolume(float volume);
```

Set the master volume multiplier (affects all audio). Range: 0.0 - 1.0.

### `setSfxVolume`

```cpp
void setSfxVolume(float volume);
```

Set the SFX volume multiplier. Range: 0.0 - 1.0.

### `setMusicVolume`

```cpp
void setMusicVolume(float volume);
```

Set the music volume multiplier. Range: 0.0 - 1.0.

### `getMasterVolume`

```cpp
float getMasterVolume();
```

Get the current master volume.

### `getSfxVolume`

```cpp
float getSfxVolume();
```

Get the current SFX volume.

### `getMusicVolume`

```cpp
float getMusicVolume();
```

Get the current music volume.

## Example

```cpp
auto sfx = asw::assets::loadSample("explosion.wav");
auto bgm = asw::assets::loadMusic("theme.ogg");

// Play sound effect
asw::sound::play(sfx, 0.8f);

// Play music with fade in
asw::sound::fadeInMusic(bgm, 0.5f, 2000);

// Volume controls
asw::sound::setMasterVolume(0.7f);
asw::sound::setSfxVolume(1.0f);
asw::sound::setMusicVolume(0.5f);
```
