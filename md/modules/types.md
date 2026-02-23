# Types

Core type aliases used throughout the ASW library.

**Header:** `#include <asw/modules/types.h>`
**Namespace:** `asw`

## Type Aliases

| Type | Underlying | Description |
|------|-----------|-------------|
| `asw::Texture` | `std::shared_ptr<SDL_Texture>` | A shared pointer to an SDL texture |
| `asw::Font` | `std::shared_ptr<TTF_Font>` | A shared pointer to a TTF font |
| `asw::Sample` | `std::shared_ptr<Mix_Chunk>` | A shared pointer to a sound effect |
| `asw::Music` | `std::shared_ptr<Mix_Music>` | A shared pointer to music |
| `asw::Renderer` | `SDL_Renderer` | Alias for the SDL renderer |
| `asw::Window` | `SDL_Window` | Alias for the SDL window |

All asset types (`Texture`, `Font`, `Sample`, `Music`) use `shared_ptr` for automatic memory management.

## BlendMode Enum

```cpp
enum class BlendMode {
  None,
  Blend,
  BlendPremultiplied,
  Add,
  AddPremultiplied,
  Modulate,
  Multiply,
};
```

| Value | Description |
|-------|-------------|
| `None` | No blending |
| `Blend` | Alpha blending |
| `BlendPremultiplied` | Pre-multiplied alpha blending |
| `Add` | Additive blending |
| `AddPremultiplied` | Pre-multiplied additive blending |
| `Modulate` | Color modulation |
| `Multiply` | Multiply blending |

## TextJustify Enum

```cpp
enum class TextJustify {
  Left,
  Center,
  Right,
};
```

Used with `asw::draw::text()` and `asw::game::Text` to control text alignment.

## Example

```cpp
asw::Color red(255, 0, 0);
asw::Texture tex = asw::assets::load_texture("image.png");
```
