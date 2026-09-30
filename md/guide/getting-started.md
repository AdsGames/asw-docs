# Getting Started

ASW (A.D.S. Games SDL Wrapper) is a small C++20 library that makes SDL3 easy to use for 2D games. It started as a way to port Allegro 5 games to SDL3. It is tested with desktop builds and with Emscripten builds for the browser.

## Requirements

- A C++20 compiler
- CMake 3.22 or later

You do not have to install SDL. The ASW build downloads SDL3, SDL3_image, SDL3_ttf, SDL3_mixer and FreeType with [CPM](https://github.com/cpm-cmake/CPM.cmake), and links them statically.

## Add ASW to your project

Use `FetchContent` in your `CMakeLists.txt`, and link your game to `asw::asw`:

```cmake
cmake_minimum_required(VERSION 3.22)
project(my_game LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)

include(FetchContent)
FetchContent_Declare(
  asw
  GIT_REPOSITORY https://github.com/adsgames/asw.git
  GIT_TAG        v0.13.0 # or the latest tag
)
FetchContent_MakeAvailable(asw)

add_executable(my_game main.cpp)
target_link_libraries(my_game PRIVATE asw::asw)
```

If your project already uses CPM, this also works:

```cmake
CPMAddPackage("gh:adsgames/asw#v0.13.0")
```

When ASW is the top-level project and you give no build type, it builds `Release`.

### Install ASW as a package

To install ASW once and use `find_package`, configure ASW with `ASW_INSTALL=ON`. This option also installs SDL3, SDL3_image, SDL3_ttf, SDL3_mixer and FreeType next to ASW, because the ASW package needs them. It is `OFF` by default.

```sh
cmake -S asw -B asw/build -DASW_INSTALL=ON -DCMAKE_INSTALL_PREFIX=$HOME/.local
cmake --build asw/build
cmake --install asw/build
```

Then, in your game:

```cmake
find_package(asw CONFIG REQUIRED)
target_link_libraries(my_game PRIVATE asw::asw)
```

The installed package also gives you [`asw_add_web_target()`](#build-for-the-browser).

## Your first program

This program opens a window and moves a circle with the arrow keys.

```cpp
#include <asw/asw.h>

int main() {
  // A 320x240 game, shown in a window at 2x scale
  asw::core::init(320, 240, 2);
  asw::display::set_title("My Game");

  asw::Vec2<float> position(160.0f, 120.0f);
  const float speed = 120.0f; // pixels per second

  // Called once per frame until asw::core::exit()
  asw::core::run([&]() {
    asw::core::update();
    const float dt = asw::core::get_delta_time();

    if (asw::input::get_key(asw::input::Key::Left))  position.x -= speed * dt;
    if (asw::input::get_key(asw::input::Key::Right)) position.x += speed * dt;
    if (asw::input::get_key(asw::input::Key::Up))    position.y -= speed * dt;
    if (asw::input::get_key(asw::input::Key::Down))  position.y += speed * dt;

    if (asw::input::get_key_down(asw::input::Key::Escape)) {
      asw::core::exit();
    }

    asw::display::clear(asw::color::black);
    asw::draw::circle_fill(position, 12.0f, asw::color::cornflowerblue);
    asw::display::present();
  });

  asw::core::shutdown();
  return 0;
}
```

[`asw::core::run()`](../modules/core#run) calls your function once per frame until `asw::core::exit()` is called. It works on desktop and in the browser. Each frame has three steps:

1. **Update:** `asw::core::update()` processes window events, input and sound. Call it once per frame, before you read input.
2. **Game logic:** Multiply movement by `get_delta_time()`, so the speed does not change with frame rate.
3. **Draw:** Clear the screen, draw, then `present()` the frame.

Build and run it:

```sh
cmake -B build
cmake --build build
./build/my_game
```

## Load assets

Asset paths are relative to the folder of the executable, not to the working directory. Copy your `assets` folder next to the executable after each build:

```cmake
add_custom_command(TARGET my_game POST_BUILD
  COMMAND ${CMAKE_COMMAND} -E copy_directory
    ${CMAKE_CURRENT_SOURCE_DIR}/assets $<TARGET_FILE_DIR:my_game>/assets
)
```

Then load assets by path:

```cpp
auto player = asw::assets::load_texture("assets/player.png");
auto font = asw::assets::load_font("assets/font.ttf", 16.0f);
auto jump = asw::assets::load_sample("assets/jump.wav");

asw::draw::sprite(player, position);
asw::draw::text(font, "Hello!", {8.0f, 8.0f}, asw::color::white);
asw::sound::play(jump);
```

See [Assets](../modules/assets) for caching by key and for the save-file folder.

## Build for the browser

ASW games also build to WebAssembly with [Emscripten](https://emscripten.org). Your game must use [`asw::core::run()`](../modules/core#run) or [`SceneManager::start()`](../modules/scene#start) for its main loop, because a `while` loop blocks the browser.

Call `asw_add_web_target()` in your `CMakeLists.txt`. For Emscripten builds, it makes a web page, packs your `assets` folder into the build, and lets memory grow. On other platforms it does nothing, so you can call it for every build:

```cmake
asw_add_web_target(my_game
  TITLE "My Game"
  ASSETS ${CMAKE_CURRENT_SOURCE_DIR}/assets
)
```

The page is `index.html`. It fills the window, shows the loading progress, and stops the arrow keys, <kbd>Space</kbd> and <kbd>Tab</kbd> from scrolling the page. When the game calls `asw::core::exit()`, the page shows "Stopped. Click to restart."

| Option | Default | Purpose |
| --- | --- | --- |
| `TITLE` | the target name | Page title |
| `BACKGROUND` | `#0a0a0a` | Page color |
| `OUTPUT_NAME` | `index` | Page file name, without `.html` |
| `ASSETS` | none | Folders to preload at `/assets`. You can give more than one |
| `SHELL` | the ASW page | Your own HTML shell. It must contain <code v-pre>{{{ SCRIPT }}}</code>, and can have a `#canvas` and a `#status` |
| `PRE_JS` | none | More `--pre-js` files |

Then build with the Emscripten toolchain and serve the output folder. Browsers do not load WebAssembly from `file://` addresses.

```sh
emcmake cmake -B build-web -DCMAKE_BUILD_TYPE=Release
cmake --build build-web
cd build-web && python3 -m http.server
```

Open `http://localhost:8000/`. In the browser, `run()` does not return, so code after it does not run. The [examples](../examples) are built this way. You can play them on this site.

### Embed the game in another page

When the game is in an `iframe`, the page does not show its own loading label. Instead, it sends its loading state to the parent page with `postMessage`, so the parent page can show it:

```js
window.addEventListener("message", (event) => {
  if (event.data?.type === "asw:status") {
    // event.data.text is the Emscripten status, "" when loading is done
  } else if (event.data?.type === "asw:ready") {
    // The game started
  }
});
```

### Custom shell

The ASW page adds `setStatus`, `onRuntimeInitialized` and `onStop` hooks to `Module`. A custom `SHELL` can set its own hooks on `Module`. They run after the ASW hooks.

## Use scenes for larger games

For a game with more than one screen (title, game, game over), use the [scene manager](../modules/scene). It runs the main loop with a fixed timestep, updates and draws your [game objects](../modules/game), and changes scenes for you. `SceneManager::start()` also runs the loop correctly in Emscripten builds.

```cpp
enum class SceneId { Title, Game };

int main() {
  asw::core::init(320, 240, 2);

  asw::scene::SceneManager<SceneId> scenes;
  scenes.register_scene<TitleScene>(SceneId::Title, scenes);
  scenes.register_scene<GameScene>(SceneId::Game, scenes);
  scenes.set_next_scene(SceneId::Title);
  scenes.start();

  asw::core::shutdown();
  return 0;
}
```

## Next steps

- Play the [examples](../examples) in your browser, and read their source code.
- Read the module reference, starting with [Draw](../modules/draw), [Input](../modules/input) and [Sound](../modules/sound).
- Add a scrolling world with the [Camera](../modules/camera) and animated sprites with [Sprite Sheet](../modules/sprite-sheet).
