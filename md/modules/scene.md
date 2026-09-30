# Scene

Scene management system with a fixed-timestep game loop.

**Header:** `#include <asw/modules/scene.h>`\
**Namespace:** `asw::scene`

<PlayableExample name="scenes" />

*From the [scenes example](../examples#scenes).*

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

Called each time the scene becomes the active scene, so it runs again when the game returns to this scene. Set up objects and state here.

#### `update`

```cpp
virtual void update(float dt);
```

Called each tick with `dt` in seconds. The default implementation removes dead objects, updates active objects, and adds newly created objects. An object's `update` can safely call `register_object`.

#### `draw`

```cpp
virtual void draw();
```

Called each frame. The default implementation sorts objects by `z_index` and draws all active objects. The sort is stable, so objects with the same `z_index` keep their order and do not flicker.

#### `cleanup`

```cpp
virtual void cleanup();
```

Called when the game switches away from this scene. Removes all objects by default, including objects from `create_object()` that are not added yet.

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

Queue a transition to the given scene. The transition happens at the start of the next `update` call. If no scene is registered with `sceneId`, the current scene keeps running and an error is printed to `std::cerr`.

### `start`

```cpp
void start();
```

Start the managed main loop with a fixed timestep. Runs until `asw::core::is_exiting()` returns `true`, then calls `cleanup()`.

Emscripten builds use the same fixed timestep as desktop builds, so games behave the same in the browser. In the browser, `start()` runs the loop with [`asw::core::run()`](./core#run), so it does not return, and `exit()` stops the loop. On both, a long frame (for example, a breakpoint or a hidden browser tab) is limited to `MAX_FRAME_TIME`. Thus the loop does not try to run hundreds of updates to catch up.

### `cleanup`

```cpp
void cleanup();
```

Clean up the active scene and remove all registered scenes. `start()` calls this when the loop ends.

### `update`

```cpp
void update(const float dt);
```

Update the current scene. Call this if you want a custom loop instead of `start()`. Does nothing after `asw::core::exit()` is called.

### `draw`

```cpp
void draw();
```

Draw the current scene. Call this if you want a custom loop instead of `start()`. Does nothing after `asw::core::exit()` is called.

### `set_timestep`

```cpp
void set_timestep(std::chrono::nanoseconds ts);
```

Set the fixed timestep for the game loop (default: `DEFAULT_TIMESTEP`, 8 ms or about 125 updates per second). A value of `0` or less is changed to 1 ns, so the loop cannot run forever.

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

## Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `DEFAULT_TIMESTEP` | `std::chrono::milliseconds(8)` | Default fixed timestep (about 125 updates per second) |
| `MAX_FRAME_TIME` | `std::chrono::milliseconds(250)` | Longest frame time that the managed loop simulates at once |

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
