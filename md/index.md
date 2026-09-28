---
layout: home

hero:
  name: "ASW"
  text: "A Simple Wrapper for SDL3"
  tagline: A lightweight C++20 library for 2D games. Runs on desktop and in the browser.
  image:
    src: /play/lighting/screenshot.png
    alt: Lighting example made with ASW
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Examples
      link: /examples
    - theme: alt
      text: View on GitHub
      link: https://github.com/adsgames/asw

features:
  - icon: 🎨
    title: Drawing
    details: Sprites, sprite sheets, primitives, text with shadows, tints, blend modes and render targets.
    link: /modules/draw
    linkText: Draw reference
  - icon: 🔊
    title: Positional Audio
    details: Mix buses, ducking, doppler, occlusion and voice priority, controlled through sound handles.
    link: /modules/sound
    linkText: Sound reference
  - icon: 🎮
    title: Input and Actions
    details: Keyboard, mouse and up to 8 controllers. Bind named actions to all of them at once.
    link: /modules/action
    linkText: Actions reference
  - icon: 🎬
    title: Scenes and Game Objects
    details: A fixed-timestep loop, scene switching and game objects with physics and z-ordering.
    link: /modules/scene
    linkText: Scene reference
  - icon: 🎥
    title: Camera
    details: Follow a target, stay inside the world, shake the screen and convert between world and screen space.
    link: /modules/camera
    linkText: Camera reference
  - icon: ✨
    title: Particles, Easing and UI
    details: Particle emitters, easing functions and a small UI toolkit with keyboard navigation.
    link: /modules/particles
    linkText: Particles reference
---

## Small and direct

A complete program: open a window and move a circle with the arrow keys. The same code runs on desktop and in the browser.

```cpp
#include <asw/asw.h>

int main() {
  asw::core::init(320, 240, 2);
  asw::Vec2<float> position(160.0f, 120.0f);

  asw::core::run([&]() {
    asw::core::update();
    const float dt = asw::core::get_delta_time();

    if (asw::input::get_key(asw::input::Key::Left))  position.x -= 120.0f * dt;
    if (asw::input::get_key(asw::input::Key::Right)) position.x += 120.0f * dt;

    asw::display::clear(asw::color::black);
    asw::draw::circle_fill(position, 12.0f, asw::color::cornflowerblue);
    asw::display::present();
  });

  asw::core::shutdown();
}
```

## Made with ASW

These are the example programs from the ASW repository. [Play them in your browser →](/examples)

<div class="example-grid">
  <a href="/examples#particles"><img src="/play/particles/screenshot.png" alt="Particles example" loading="lazy"><span>Particles</span></a>
  <a href="/examples#scenes"><img src="/play/scenes/screenshot.png" alt="Scenes example" loading="lazy"><span>Scenes</span></a>
  <a href="/examples#primitives"><img src="/play/primitives/screenshot.png" alt="Primitives example" loading="lazy"><span>Primitives</span></a>
  <a href="/examples#text"><img src="/play/text/screenshot.png" alt="Text example" loading="lazy"><span>Text</span></a>
  <a href="/examples#ui"><img src="/play/ui/screenshot.png" alt="UI example" loading="lazy"><span>UI</span></a>
  <a href="/examples#easing"><img src="/play/easing/screenshot.png" alt="Easing example" loading="lazy"><span>Easing</span></a>
</div>
