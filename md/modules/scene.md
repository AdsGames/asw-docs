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
explicit Scene(SceneManager<T>& sceneManager);
```

### Virtual Methods

#### `init`

```cpp
virtual void init();
```

Called when the scene becomes active. Set up objects and state here.

#### `update`

```cpp
virtual void update(float deltaTime);
```

Called each tick. The default implementation removes dead objects, updates active objects, and adds newly created objects.

#### `draw`

```cpp
virtual void draw();
```

Called each frame. The default implementation sorts objects by `zIndex` and draws all active objects.

#### `cleanup`

```cpp
virtual void cleanup();
```

Called when the scene is about to be replaced. Clears all objects by default.

### Object Management

#### `registerObject`

```cpp
void registerObject(const std::shared_ptr<game::GameObject> obj);
```

Add an existing game object to the scene immediately.

#### `createObject`

```cpp
template <typename ObjectType, typename... Args>
std::shared_ptr<ObjectType> createObject(Args&&... args);
```

Create a new game object that will be added at the end of the current update. `ObjectType` must derive from `game::GameObject`.

#### `getObjects`

```cpp
std::vector<std::shared_ptr<game::GameObject>> getObjects();
```

Get all game objects in the scene.

#### `getObjectView`

```cpp
template <typename ObjectType>
std::vector<std::shared_ptr<ObjectType>> getObjectView();
```

Get all game objects of a specific type (using `dynamic_pointer_cast`).

### Protected Members

| Field | Type | Description |
|-------|------|-------------|
| `sceneManager` | `SceneManager<T>&` | Reference to the owning scene manager |

## SceneManager

Manages scene registration, transitions, and the main game loop.

```cpp
template <typename T>
class SceneManager;
```

### `registerScene`

```cpp
template <typename SceneType, typename... Args>
void registerScene(const T sceneId, Args&&... args);
```

Register a scene with a unique ID. `SceneType` must derive from `Scene<T>`.

### `setNextScene`

```cpp
void setNextScene(const T sceneId);
```

Queue a transition to the given scene. The transition happens at the start of the next `update` call.

### `start`

```cpp
void start();
```

Start the managed main loop with a fixed timestep. Runs until `asw::core::exit` is `true`. Supports Emscripten.

### `update`

```cpp
void update(const float deltaTime);
```

Update the current scene. Call this if you want a custom loop instead of `start()`.

### `draw`

```cpp
void draw();
```

Draw the current scene. Call this if you want a custom loop instead of `start()`.

### `setTimestep`

```cpp
void setTimestep(std::chrono::nanoseconds ts);
```

Set the fixed timestep for the game loop (default: 8ms / ~125 ticks per second).

### `getTimestep`

```cpp
std::chrono::nanoseconds getTimestep() const;
```

Get the current timestep.

### `getFPS`

```cpp
int getFPS() const;
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
    auto title = createObject<asw::game::Text>();
    title->setFont(asw::assets::loadFont("font.ttf", 32));
    title->setText("Press Enter to Play");
    title->setColor({255, 255, 255, 255});
    title->transform.position = {100.0f, 200.0f};
  }

  void update(float dt) override {
    Scene::update(dt);
    if (asw::input::getKeyDown(asw::input::Key::Return)) {
      sceneManager.setNextScene(SceneId::Game);
    }
  }
};

class GameScene : public asw::scene::Scene<SceneId> {
public:
  using Scene::Scene;

  void init() override {
    auto player = createObject<asw::game::Sprite>();
    player->setTexture(asw::assets::loadTexture("player.png"));
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
  sm.registerScene<MenuScene>(SceneId::Menu, sm);
  sm.registerScene<GameScene>(SceneId::Game, sm);
  sm.setNextScene(SceneId::Menu);
  sm.start();

  return 0;
}
```
