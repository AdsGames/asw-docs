# Sound

Audio playback for sound effects and music, with mix buses, ducking and positional sound.

**Header:** `#include <asw/modules/sound.h>`\
**Namespace:** `asw::sound`

<PlayableExample name="sound" />

*From the [sound example](../examples#sound).*

The sound module has 32 voices for sound effects and one track for music. `asw::core::init()` initializes the module, and `asw::core::update()` updates fades, ducking and positional sounds each frame.

## Mixer

### `get_mixer`

```cpp
MIX_Mixer* get_mixer();
```

Get the SDL_mixer device. Returns `nullptr` if the sound module is not initialized.

## Types

### Bus Enum

```cpp
enum class Bus : uint8_t {
  Sfx,
  Music,
  Ambient,
  Ui,
  Voice,
  Count,
};
```

Mix buses. Each sound plays on one bus. Each bus has its own volume and can be ducked. `Count` is the number of buses. Do not play sounds on it.

### Rolloff Enum

```cpp
enum class Rolloff : uint8_t {
  Linear,
  Inverse,
  InverseSquare,
};
```

How volume decreases with distance for positional sounds.

| Value | Description |
|-------|-------------|
| `Linear` | Straight line from full volume at `min_distance` to silent at `max_distance` |
| `Inverse` | Sounds natural. Loud when near, with a long quiet tail |
| `InverseSquare` | Like `Inverse`, but decreases faster |

### SpatialMode Enum

```cpp
enum class SpatialMode : uint8_t {
  Stereo,
  Surround,
};
```

How positional sounds are put on the speakers.

| Value | Description |
|-------|-------------|
| `Stereo` | Left/right panning. Best for headphones and side-on games. This is the default |
| `Surround` | SDL_mixer 3D positioning, which also uses rear and side speakers. The world is top-down: up the screen is in front, down the screen is behind |

### Attenuation

```cpp
struct Attenuation;
```

Distance settings for positional sounds, in world units (pixels).

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `min_distance` | `float` | `100.0` | Full volume at this distance or nearer |
| `max_distance` | `float` | `1000.0` | Silent at this distance or farther |
| `rolloff` | `Rolloff` | `Inverse` | Shape of the decrease between the two distances |

### PlayOptions

```cpp
struct PlayOptions;
```

Options for playing a sound.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `volume` | `float` | `1.0` | Playback volume (0.0 - 1.0) |
| `pan` | `float` | `0.0` | Panning (-1.0 left - 1.0 right). Positional sounds ignore it |
| `loop` | `bool` | `false` | Loop forever |
| `pitch` | `float` | `1.0` | Playback speed and pitch. `2.0` is one octave up |
| `pitch_variation` | `float` | `0.0` | Random pitch change for each play, as a fraction. `0.05` picks a value from 0.95x to 1.05x. Use it to make repeated sounds (footsteps, hits) less robotic |
| `volume_variation` | `float` | `0.0` | Random volume change for each play, as a fraction |
| `bus` | `Bus` | `Sfx` | The bus to play on |
| `priority` | `int` | `0` | When all voices are busy, a new sound replaces the quietest voice that has the same or lower priority. If there is no such voice, the new sound is not played |
| `fade_in_s` | `float` | `0.0` | Fade-in time in seconds |
| `attenuation` | `Attenuation` | `{}` | Distance settings for positional sounds |

### SoundHandle

```cpp
class SoundHandle;
```

A handle to a playing sound. Use it to change the sound while it plays. Handles are cheap to copy. When the sound ends, or its voice is given to a different sound, the handle becomes stale. All calls on a stale handle do nothing. A default-constructed handle refers to no sound.

| Method | Description |
|--------|-------------|
| `bool is_playing() const` | `true` while the sound has not ended (playing or paused) |
| `void stop(float fade_out_s = 0.0F) const` | Stop the sound, with an optional fade-out in seconds |
| `void pause() const` | Pause the sound |
| `void resume() const` | Resume a paused sound |
| `void set_volume(float volume) const` | Set the volume (0.0 - 1.0), before bus and distance |
| `void set_pitch(float pitch) const` | Set the playback speed and pitch. `1.0` is normal |
| `void set_pan(float pan) const` | Set the panning (-1.0 - 1.0). A positional sound becomes non-positional |
| `void set_position(const Vec2<float>& position) const` | Set the world position. The sound becomes positional |
| `void set_velocity(const Vec2<float>& velocity) const` | Set the velocity in world units per second, for doppler pitch shift |
| `void set_occlusion(float amount) const` | Muffle the sound, as if heard through a wall. `0.0` is clear, `1.0` is fully muffled |
| `void set_attenuation(const Attenuation& attenuation) const` | Change the distance settings |

## Sound Effects

### `play`

```cpp
SoundHandle play(const asw::Sample& sample,
                 float volume = 1.0F,
                 float pan = 0.0F,
                 bool loop = false);
SoundHandle play(const asw::Sample& sample, const PlayOptions& options);
```

Play a sound effect sample on the `Sfx` bus, or with the given options. Returns a handle to the sound. The handle is stale if the sound could not be played.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sample` | `const asw::Sample&` | | The sample to play |
| `volume` | `float` | `1.0` | Playback volume (0.0 - 1.0) |
| `pan` | `float` | `0.0` | Panning: -1.0 (full left), 0.0 (center), 1.0 (full right) |
| `loop` | `bool` | `false` | Infinite loop when `true` |
| `options` | `const PlayOptions&` | | How to play the sample. See [PlayOptions](#playoptions) |

### `play_positional`

```cpp
SoundHandle play_positional(const asw::Sample& sample,
                            const Vec2<float>& position,
                            const PlayOptions& options = {});
```

Play a sample at a point in the world. The sound is panned, faded and pitch-shifted relative to the listener, and continues to update while it plays. A one-shot sound that is out of hearing range (farther than `options.attenuation.max_distance`) is not played, and the handle is stale.

### `play_at`

```cpp
SoundHandle play_at(const asw::Sample& sample, float x, float volume = 1.0F);
SoundHandle play_at(const asw::Sample& sample, float x, const PlayOptions& options);
```

Play a sample panned by its horizontal position on the screen. `x` is in logical screen coordinates. Sounds pan to the side they are on. They fade out when they are off screen and are silent one full screen width past the edge. Use this for simple games that do not have a listener.

The `PlayOptions` version also takes pitch, variation, bus, priority and the rest. `options.volume` is the volume before the fade, and `options.pan` is replaced by the screen position. The pan is set once when the sound starts.

```cpp
asw::sound::PlayOptions shot;
shot.pitch_variation = 0.08F;
shot.priority = 2;
asw::sound::play_at(gunshot, enemy.position.x, shot);
```

## Listener and Spatial Settings

### `set_listener`

```cpp
void set_listener(const Vec2<float>& position,
                  const Vec2<float>& velocity = { 0.0F, 0.0F });
```

Set the listener position in the world, usually the player or the center of the camera. `velocity` is in world units per second and is used for doppler.

### `get_listener`

```cpp
Vec2<float> get_listener();
```

Get the listener position.

### `set_spatial_mode`

```cpp
void set_spatial_mode(SpatialMode mode);
```

Set how positional sounds are put on the speakers. The default is `SpatialMode::Stereo`.

### `set_doppler`

```cpp
void set_doppler(float factor, float speed_of_sound = 3000.0F);
```

Set the strength of the doppler pitch shift. A `factor` of `0` turns doppler off, and `1` is realistic (default). `speed_of_sound` is in world units per second. A lower value makes the effect stronger.

## Buses and Ducking

### `set_bus_volume`

```cpp
void set_bus_volume(Bus bus, float volume);
```

Set the volume multiplier of a bus. Range: 0.0 - 1.0.

### `get_bus_volume`

```cpp
float get_bus_volume(Bus bus);
```

Get the volume multiplier of a bus.

### `duck`

```cpp
void duck(Bus bus, float gain, float hold_s, float fade_s = 0.2F);
```

Decrease the volume of a bus for some time. For example, lower the music during dialogue, or lower all other sounds during a big explosion. If ducks overlap, the lowest level and the longest hold are used.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `bus` | `Bus` | | The bus to duck |
| `gain` | `float` | | The level while ducked (0.0 - 1.0) |
| `hold_s` | `float` | | Seconds to stay ducked |
| `fade_s` | `float` | `0.2` | Seconds to fade down and back up |

## Music

Music plays on the `Music` bus and always loops.

### `play_music`

```cpp
void play_music(const asw::Music& sample, float volume = 1.0F, float fade_in_s = 0.0F);
```

Play a music track.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sample` | `const asw::Music&` | | The music to play |
| `volume` | `float` | `1.0` | Playback volume (0.0 - 1.0) |
| `fade_in_s` | `float` | `0.0` | Fade-in duration in seconds |

### `stop_music`

```cpp
void stop_music(float fade_out_s = 0.0F);
```

Stop the currently playing music. Set `fade_out_s` to fade out over that number of seconds.

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

Set the SFX volume multiplier. This is the same as `set_bus_volume(Bus::Sfx, volume)`. Range: 0.0 - 1.0.

### `set_music_volume`

```cpp
void set_music_volume(float volume);
```

Set the music volume multiplier. This is the same as `set_bus_volume(Bus::Music, volume)`. Range: 0.0 - 1.0.

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
auto step = asw::assets::load_sample("step.wav");
auto engine = asw::assets::load_sample("engine.wav");
auto bgm = asw::assets::load_music("theme.ogg");

// Play sound effect
asw::sound::play(sfx, 0.8f);

// Play with options: random pitch and volume for each footstep
asw::sound::PlayOptions options;
options.pitch_variation = 0.05f;
options.volume_variation = 0.1f;
asw::sound::play(step, options);

// Positional sound that follows an object
asw::sound::PlayOptions loop_options;
loop_options.loop = true;
auto handle = asw::sound::play_positional(engine, car_position, loop_options);

// Each update
asw::sound::set_listener(player_position, player_velocity);
handle.set_position(car_position);
handle.set_velocity(car_velocity);

// Stop it with a fade out
handle.stop(0.5f);

// Play music with fade in (2 seconds)
asw::sound::play_music(bgm, 0.5f, 2.0f);

// Lower the music for 1 second under the explosion
asw::sound::duck(asw::sound::Bus::Music, 0.3f, 1.0f);

// Fade out music (1 second)
asw::sound::stop_music(1.0f);

// Volume controls
asw::sound::set_master_volume(0.7f);
asw::sound::set_bus_volume(asw::sound::Bus::Ambient, 0.5f);
asw::sound::set_music_volume(0.5f);
```
