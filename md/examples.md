# Examples

The ASW repository has an example program for each part of the library. You can play each one here in your browser: press **Play**, then click the game to give it the keyboard. The examples are the same C++ programs as on desktop, built to WebAssembly with Emscripten.

<div class="example-grid">
  <a href="#lighting"><img src="/play/lighting/screenshot.png" alt="Lighting example" loading="lazy"><span>Lighting</span></a>
  <a href="#particles"><img src="/play/particles/screenshot.png" alt="Particles example" loading="lazy"><span>Particles</span></a>
  <a href="#scenes"><img src="/play/scenes/screenshot.png" alt="Scenes example" loading="lazy"><span>Scenes</span></a>
  <a href="#camera"><img src="/play/camera/screenshot.png" alt="Camera example" loading="lazy"><span>Camera</span></a>
  <a href="#sound"><img src="/play/sound/screenshot.png" alt="Sound example" loading="lazy"><span>Sound</span></a>
  <a href="#primitives"><img src="/play/primitives/screenshot.png" alt="Primitives example" loading="lazy"><span>Primitives</span></a>
  <a href="#text"><img src="/play/text/screenshot.png" alt="Text example" loading="lazy"><span>Text</span></a>
  <a href="#ui"><img src="/play/ui/screenshot.png" alt="UI example" loading="lazy"><span>UI</span></a>
  <a href="#easing"><img src="/play/easing/screenshot.png" alt="Easing example" loading="lazy"><span>Easing</span></a>
  <a href="#keyboard"><img src="/play/keyboard/screenshot.png" alt="Keyboard example" loading="lazy"><span>Keyboard</span></a>
  <a href="#mouse"><img src="/play/mouse/screenshot.png" alt="Mouse example" loading="lazy"><span>Mouse</span></a>
  <a href="#actions"><img src="/play/actions/screenshot.png" alt="Actions example" loading="lazy"><span>Actions</span></a>
  <a href="#controller"><img src="/play/controller/screenshot.png" alt="Controller example" loading="lazy"><span>Controller</span></a>
</div>

## Running the examples

```sh
git clone https://github.com/adsgames/asw.git
cd asw
cmake --preset debug -DASW_BUILD_EXAMPLES=ON
cmake --build --preset debug
./build/debug/bin/example_lighting
```

Each example is in `build/debug/bin/` as `example_<name>`. If an example uses assets, the build copies them next to the executable.

To build the examples for the browser, use the Emscripten toolchain, then serve the output folder:

```sh
emcmake cmake -S . -B build/web -DCMAKE_BUILD_TYPE=Release -DASW_BUILD_EXAMPLES=ON
cmake --build build/web
cd build/web/bin && python3 -m http.server
```

Then open `http://localhost:8000/example_particles.html`. The examples use [`asw::core::run()`](./modules/core#run) for their main loop, so the same code runs on desktop and in the browser.

Each example also has a scripted run. It uses [simulated input](./modules/input#simulated-input) to play itself, saves `autorun.png` with [`screenshot`](./modules/display#screenshot), and quits. With the dummy video driver, no window opens:

```sh
ASW_EXAMPLE_AUTORUN=1 SDL_VIDEO_DRIVER=dummy ./build/debug/bin/example_particles
```

In the browser, add `?autorun` to the address of an example. The screenshots on this page come from these scripted runs in the browser, taken for each ASW release.

## Graphics

### Lighting

<PlayableExample name="lighting" />

Render targets, blend modes and sprite drawing. A light map is made from radial gradients drawn with `BlendMode::Add` into a texture. The light map is then drawn over the scene with `BlendMode::Modulate`.

- `asw::assets::create_texture()` and `asw::display::set_render_target()` to draw textures at runtime
- `asw::draw::set_scale_mode()`: `Nearest` and `Linear` on the same art
- `asw::draw::rotate_sprite()`, `sprite_flip()` and `stretch_sprite()`
- `asw::draw::stretch_sprite_rotate()` to scale, rotate and flip in one call
- `asw::draw::set_tint()` and `set_alpha()`

**Controls:** Mouse moves the torch. Left click drops a colored light. <kbd>L</kbd> toggles lighting. <kbd>1</kbd> / <kbd>2</kbd> / <kbd>3</kbd> select dusk, night and pitch black.

[View source](https://github.com/adsgames/asw/tree/main/examples/lighting) · [Draw](./modules/draw) · [Assets](./modules/assets)

### Particles

<PlayableExample name="particles" />

Fire, fountain, smoke, snow and a glowing trail that follows the mouse.

- `asw::ParticleConfig`: lifetime, speed, angle, color, size and gravity
- `asw::ParticleEmitter`: continuous emission (`set_emission_rate`, `start`, `stop`) and bursts (`emit`)
- Textured particles from `asw::assets::create_radial_gradient()`
- Additive blending with `asw::draw::set_blend_mode()` and `set_tint()`

**Controls:** <kbd>1</kbd>–<kbd>4</kbd> toggle the emitters. Left click makes a firework burst at the cursor.

[View source](https://github.com/adsgames/asw/tree/main/examples/particles) · [Particles](./modules/particles)

### Primitives

<PlayableExample name="primitives" />

- `asw::draw::point()`, `line()`, `rect()`, `rect_fill()`, `circle()` and `circle_fill()`
- `asw::draw::rect()` with a thickness, and `rect_fill_rotate()`
- `asw::draw::text()` and `text_shadow()`
- `asw::color` constants and `Color` helpers (`lighten`, `darken`, `with_alpha`)
- Alpha blending of shapes that overlap

**Controls:** <kbd>Space</kbd> pauses the animation.

[View source](https://github.com/adsgames/asw/tree/main/examples/primitives) · [Draw](./modules/draw) · [Color](./modules/color)

### Text

<PlayableExample name="text" />

- `asw::assets::load_font()` with `FontStyle::Pixel` and `FontStyle::Smooth`
- Font caching with `load_font(..., key)` and `get_font(key)`
- `asw::draw::text()` with `Left`, `Center` and `Right` justification, and `text_shadow()`
- Text that fades through the alpha of its color
- `asw::util::get_text_size()` to fit boxes around text, and `get_font_height()` for line spacing

**Controls:** <kbd>Space</kbd> restarts the typewriter.

[View source](https://github.com/adsgames/asw/tree/main/examples/text) · [Draw](./modules/draw) · [Assets](./modules/assets)

### Easing

<PlayableExample name="easing" />

Each cell plots one `asw::easing` function as a curve, with a dot that moves along it. The bar under each curve moves by the eased value, so you can easily see overshoot and bounce.

**Controls:** <kbd>Space</kbd> pauses. <kbd>Up</kbd> / <kbd>Down</kbd> change the speed.

[View source](https://github.com/adsgames/asw/tree/main/examples/easing) · [Easing](./modules/easing)

## Game Framework

### Scenes

<PlayableExample name="scenes" />

A title screen and a ball-popping game.

- `asw::scene::SceneManager` with two scenes and scene switching
- `Scene::create_object()` and `get_object_view()`
- `asw::game::GameObject` with a `Physics` body, `z_index`, `alpha` and `alive`
- `asw::ParticleEmitter` used as a scene object
- `asw::easing` and `asw::random` for animation and spawning

**Controls:** <kbd>Enter</kbd> starts the game. Left click pops a ball, or makes a ball on empty space. <kbd>Space</kbd> makes ten balls.

[View source](https://github.com/adsgames/asw/tree/main/examples/scenes) · [Scene](./modules/scene) · [Game Objects](./modules/game)

### Camera

<PlayableExample name="camera" />

A scrolling world.

- `asw::Camera` follows the player, stays inside the world and shakes
- `asw::Quad::get_push_out()` stops the player from walking through walls
- `asw::SpriteSheet` and `asw::Animation` for an animated sprite
- `asw::ParticleEmitter` drawn in world space through the camera

**Controls:** <kbd>WASD</kbd> / arrows move. <kbd>Space</kbd> shakes the camera and makes a burst of particles. <kbd>F12</kbd> saves a screenshot.

[View source](https://github.com/adsgames/asw/tree/main/examples/camera) · [Camera](./modules/camera) · [Sprite Sheet](./modules/sprite-sheet)

### UI

<PlayableExample name="ui" />

- `asw::ui::Root` controls input, layout and drawing
- `Panel`, `VBox`, `Label`, `Button` and `InputBox`, with `on_click` and `on_change` callbacks
- Keyboard navigation: <kbd>Tab</kbd> / arrows move focus, <kbd>Enter</kbd> activates
- Changes to `asw::ui::Theme` at runtime
- `asw::assets::get_save_path()` keeps the name between runs
- `asw::dialog::request_file()` and `take_file()` for a native file chooser, and `confirm()` and `warn()` message boxes

[View source](https://github.com/adsgames/asw/tree/main/examples/ui) · [UI Widgets](./modules/ui) · [Dialog](./modules/dialog)

## Audio

### Sound

<PlayableExample name="sound" />

You are the listener. Walk around a radio behind walls and a fast-moving source.

- `asw::sound::play_positional()` with a listener that follows the player
- `SoundHandle` moves a looping sound while it plays
- Doppler pitch shift, and occlusion that muffles the radio behind walls
- `pitch_variation` and `volume_variation` on footsteps
- Buses and ducking: explosions duck the ambient bus
- Priority-based voice stealing, and `Stereo` and `Surround` spatial modes

**Controls:** <kbd>WASD</kbd> / arrows move. Left click makes an explosion. <kbd>F</kbd> fills every voice. <kbd>Tab</kbd> switches the spatial mode. <kbd>O</kbd> toggles doppler. <kbd>M</kbd> mutes the ambient bus.

[View source](https://github.com/adsgames/asw/tree/main/examples/sound) · [Sound](./modules/sound)

## Input

### Keyboard

<PlayableExample name="keyboard" />

- `get_key()` (held), `get_key_down()` and `get_key_up()` (this frame only)
- Movement that does not change with frame rate, with `asw::core::get_delta_time()`
- `get_keyboard()` for the last key pressed, and `get_text_input()` for typed text

[View source](https://github.com/adsgames/asw/tree/main/examples/keyboard) · [Input](./modules/input)

### Mouse

<PlayableExample name="mouse" />

- Mouse position and movement (`get_mouse().position` / `.change`) and the scroll wheel (`.z`)
- `get_mouse_button()`, `get_mouse_button_down()` and `get_mouse_button_up()`
- `set_cursor()` to change the system cursor, and `set_cursor_visible()` to hide it

[View source](https://github.com/adsgames/asw/tree/main/examples/mouse) · [Input](./modules/input)

### Actions

<PlayableExample name="actions" />

- `bind_action()` with each binding type: key, mouse button, controller button and controller axis
- More than one binding on an action
- `get_action_down()`, `get_action()` and `get_action_up()` to tap, charge and release a shot
- `get_action_strength()` for analog movement from a stick
- `ANY_CONTROLLER`, so every connected controller controls the same actions
- `get_last_device()` to show keyboard or controller prompts

[View source](https://github.com/adsgames/asw/tree/main/examples/actions) · [Actions](./modules/action)

### Controller

<PlayableExample name="controller" />

Shows each connected controller and lights up the sticks, triggers and buttons that you use. Controllers can be connected and disconnected while the example runs.

- `get_controller_count()` and `get_controller_name()`
- `get_controller_stick()` for sticks, with a radial dead zone
- `get_controller_axis()` for triggers (0 to 1)
- `get_controller_button()` and `get_controller_button_down()`
- `ANY_CONTROLLER` to read all connected controllers at once
- `set_controller_dead_zone()`
- `get_last_device()` to tell keyboard players and controller players apart

[View source](https://github.com/adsgames/asw/tree/main/examples/controller) · [Input](./modules/input#game-controller)
