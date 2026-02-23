# Scene

Scene management system with a fixed-timestep game loop.

**Header:** `#include <asw/modules/scene.h>`
**Namespace:** `asw::scene`

## Scene

Base class for game scenes. Manages a collection of `GameObject` instances with automatic update, draw, and lifecycle.

```cpp
template <typename T>
class Scene;
```

The template parameter `T` is the scene ID type (e.g., `enum`, `int`, `std::string`).

### Constructor

```cpp
explicit Scene(SceneManager<T>& manager);
```

### Virtual Methods

#### `init`

```cpp
virtual void init();
```

Called when the scene becomes active. Set up objects and state here.

#### `update`

```cpp
virtual void update(float dt);
```

Called each tick with `dt` in seconds. The default implementation removes dead objects, updates active objects, and adds newly created objects.

#### `draw`

```cpp
virtual void draw();
```

Called each frame. The default implementation sorts objects by `z_index` and draws all active objects.

#### `cleanup`

```cpp
virtual void cleanup();
```

Called when the scene is about to be replaced. Clears all objects by default.

### Object Management

#### `register_object`

```cpp
void register_object(const std::shared_ptr<game::GameObject>& obj);
```

Add an existing game object to the scene immediately.

#### `create_object`

```cpp
template <typename ObjectType, typename... Args>
std::shared_ptr<ObjectType> create_object(Args&&... args);
```

Create a new game object that will be added at the end of the current update. `ObjectType` must derive from `game::GameObject`.

#### `get_objects`

```cpp
const std::vector<std::shared_ptr<game::GameObject>>& get_objects() const;
```

Get all game objects in the scene (const reference).

#### `get_object_view`

```cpp
template <typename ObjectType>
std::vector<std::shared_ptr<ObjectType>> get_object_view();
```

Get all game objects of a specific type (using `dynamic_pointer_cast`).

### Protected Members

| Field | Type | Description |
|-------|------|-------------|
| `manager` | `SceneManager<T>&` | Reference to the owning scene manager |

## SceneManager

Manages scene registration, transitions, and the main game loop.

```cpp
template <typename T>
class SceneManager;
```

### `register_scene`

```cpp
template <typename SceneType, typename... Args>
void register_scene(const T sceneId, Args&&... args);
```

Register a scene with a unique ID. `SceneType` must derive from `Scene<T>`.

### `set_next_scene`

```cpp
void set_next_scene(const T sceneId);
```

Queue a transition to the given scene. The transition happens at the start of the next `update` call.

### `start`

```cpp
void start();
```

Start the managed main loop with a fixed timestep. Runs until `asw::core::exit` is `true`. Supports Emscripten.

### `update`

```cpp
void update(const float dt);
```

Update the current scene. Call this if you want a custom loop instead of `start()`.

### `draw`

```cpp
void draw();
```

Draw the current scene. Call this if you want a custom loop instead of `start()`.

### `set_timestep`

```cpp
void set_timestep(std::chrono::nanoseconds ts);
```

Set the fixed timestep for the game loop (default: 8ms / ~125 ticks per second).

### `get_timestep`

```cpp
std::chrono::nanoseconds get_timestep() const;
```

Get the current timestep.

### `get_fps`

```cpp
int get_fps() const;
```

Get the current FPS. Only available when using the managed `start()` loop.

## Example

```cpp
#include <asw/asw.h>

enum class SceneId { Menu, Game };

class MenuScene : public asw::scene::Scene<SceneId> {
public:
  using Scene::Scene;

  void init() override {
    auto title = create_object<asw::game::Text>();
    title->set_font(asw::assets::load_font("font.ttf", 32));
    title->set_text("Press Enter to Play");
    title->set_color(asw::color::white);
    title->transform.position = {100.0f, 200.0f};
  }

  void update(float dt) override {
    Scene::update(dt);
    if (asw::input::get_key_down(asw::input::Key::Return)) {
      manager.set_next_scene(SceneId::Game);
    }
  }
};

class GameScene : public asw::scene::Scene<SceneId> {
public:
  using Scene::Scene;

  void init() override {
    auto player = create_object<asw::game::Sprite>();
    player->set_texture(asw::assets::load_texture("player.png"));
    player->transform.position = {100.0f, 100.0f};
  }

  void update(float dt) override {
    Scene::update(dt);
    // game logic
  }
};

int main() {
  asw::core::init(640, 480, 2);

  asw::scene::SceneManager<SceneId> sm;
  sm.register_scene<MenuScene>(SceneId::Menu, sm);
  sm.register_scene<GameScene>(SceneId::Game, sm);
  sm.set_next_scene(SceneId::Menu);
  sm.start();

  return 0;
}
```
