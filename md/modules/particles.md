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
| `lifetimeMin` | `float` | `1.0` | Minimum particle lifetime (seconds) |
| `lifetimeMax` | `float` | `2.0` | Maximum particle lifetime (seconds) |
| `speedMin` | `float` | `50.0` | Minimum particle speed |
| `speedMax` | `float` | `100.0` | Maximum particle speed |
| `angleMin` | `float` | `0.0` | Minimum emission angle (radians) |
| `angleMax` | `float` | `6.2832` | Maximum emission angle (radians, full circle) |
| `colorStart` | `Color` | `{255, 255, 255, 255}` | Color at birth |
| `colorEnd` | `Color` | `{255, 255, 255, 0}` | Color at death |
| `alphaStart` | `float` | `1.0` | Opacity at birth |
| `alphaEnd` | `float` | `0.0` | Opacity at death |
| `sizeStart` | `float` | `4.0` | Size at birth |
| `sizeEnd` | `float` | `1.0` | Size at death |
| `gravity` | `Vec2<float>` | `{0, 0}` | Gravity applied to particles |
| `texture` | `Texture` | `nullptr` | Optional texture (`nullptr` = filled circle) |

## ParticleEmitter

A `GameObject`-derived emitter that can be added to scenes.

```cpp
class ParticleEmitter : public game::GameObject;
```

### Constructor

```cpp
explicit ParticleEmitter(const ParticleConfig& config, int maxParticles = 256);
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `config` | `const ParticleConfig&` | | Particle configuration |
| `maxParticles` | `int` | `256` | Maximum number of particles in the pool |

### Methods

#### `setEmissionRate`

```cpp
void setEmissionRate(float rate);
```

Set the emission rate in particles per second. Set to `0` to disable automatic emission.

#### `emit`

```cpp
void emit(int count);
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
void update(float deltaTime) override;
```

Update all alive particles. Called automatically when in a scene.

#### `draw`

```cpp
void draw() override;
```

Draw all alive particles. Called automatically when in a scene.

#### `getAliveCount`

```cpp
int getAliveCount() const;
```

Get the number of currently alive particles.

## Example

```cpp
// Configure particles
asw::ParticleConfig config;
config.lifetimeMin = 0.5f;
config.lifetimeMax = 1.5f;
config.speedMin = 80.0f;
config.speedMax = 150.0f;
config.colorStart = {255, 200, 50, 255};
config.colorEnd = {255, 50, 0, 0};
config.sizeStart = 6.0f;
config.sizeEnd = 1.0f;
config.gravity = {0.0f, 100.0f};

// Create emitter in a scene
auto emitter = createObject<asw::ParticleEmitter>(config, 512);
emitter->transform.position = {200.0f, 300.0f};
emitter->setEmissionRate(50.0f);
emitter->start();

// Or emit a one-shot burst
emitter->emit(30);
```
