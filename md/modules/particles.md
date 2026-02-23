# Particles

Lightweight particle emitter system that integrates with the scene system.

**Header:** `#include <asw/modules/particles.h>`
**Namespace:** `asw`

## ParticleConfig

Configuration struct for particle emitters.

```cpp
struct ParticleConfig;
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `lifetime_min` | `float` | `1.0` | Minimum particle lifetime (seconds) |
| `lifetime_max` | `float` | `2.0` | Maximum particle lifetime (seconds) |
| `speed_min` | `float` | `50.0` | Minimum particle speed |
| `speed_max` | `float` | `100.0` | Maximum particle speed |
| `angle_min` | `float` | `0.0` | Minimum emission angle (radians) |
| `angle_max` | `float` | `6.2832` | Maximum emission angle (radians, full circle) |
| `color_start` | `Color` | `{255, 255, 255, 255}` | Color at birth |
| `color_end` | `Color` | `{255, 255, 255, 0}` | Color at death |
| `alpha_start` | `float` | `1.0` | Opacity at birth |
| `alpha_end` | `float` | `0.0` | Opacity at death |
| `size_start` | `float` | `4.0` | Size at birth |
| `size_end` | `float` | `1.0` | Size at death |
| `gravity` | `Vec2<float>` | `{0, 0}` | Gravity applied to particles |
| `texture` | `Texture` | `nullptr` | Optional texture (`nullptr` = filled circle) |

## ParticleEmitter

A `GameObject`-derived emitter that can be added to scenes.

```cpp
class ParticleEmitter : public game::GameObject;
```

### Constructors

```cpp
ParticleEmitter();
explicit ParticleEmitter(const ParticleConfig& config, uint32_t maxParticles = 256);
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `config` | `const ParticleConfig&` | | Particle configuration |
| `maxParticles` | `uint32_t` | `256` | Maximum number of particles in the pool |

### Methods

#### `set_emission_rate`

```cpp
void set_emission_rate(float rate);
```

Set the emission rate in particles per second. Set to `0` to disable automatic emission.

#### `emit`

```cpp
void emit(uint32_t count);
```

Emit a burst of particles at the emitter's current position.

#### `start`

```cpp
void start();
```

Start continuous emission at the configured rate.

#### `stop`

```cpp
void stop();
```

Stop continuous emission.

#### `update`

```cpp
void update(float dt) override;
```

Update all alive particles. Called automatically when in a scene.

#### `draw`

```cpp
void draw() override;
```

Draw all alive particles. Called automatically when in a scene.

#### `get_alive_count`

```cpp
uint32_t get_alive_count() const;
```

Get the number of currently alive particles.

## Example

```cpp
// Configure particles
asw::ParticleConfig config;
config.lifetime_min = 0.5f;
config.lifetime_max = 1.5f;
config.speed_min = 80.0f;
config.speed_max = 150.0f;
config.color_start = {255, 200, 50, 255};
config.color_end = {255, 50, 0, 0};
config.size_start = 6.0f;
config.size_end = 1.0f;
config.gravity = {0.0f, 100.0f};

// Create emitter in a scene
auto emitter = create_object<asw::ParticleEmitter>(config, 512);
emitter->transform.position = {200.0f, 300.0f};
emitter->set_emission_rate(50.0f);
emitter->start();

// Or emit a one-shot burst
emitter->emit(30);
```
