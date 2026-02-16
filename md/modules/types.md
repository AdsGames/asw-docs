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
| `asw::Color` | `SDL_Color` | Alias for an RGBA color |

All asset types (`Texture`, `Font`, `Sample`, `Music`) use `shared_ptr` for automatic memory management.

## BlendMode Enum

```cpp
enum class BlendMode {
  NONE,
  BLEND,
  BLEND_PREMULTIPLIED,
  ADD,
  ADD_PREMULTIPLIED,
  MODULATE,
  MULTIPLY,
};
```

| Value | Description |
|-------|-------------|
| `NONE` | No blending |
| `BLEND` | Alpha blending |
| `BLEND_PREMULTIPLIED` | Pre-multiplied alpha blending |
| `ADD` | Additive blending |
| `ADD_PREMULTIPLIED` | Pre-multiplied additive blending |
| `MODULATE` | Color modulation |
| `MULTIPLY` | Multiply blending |

## Example

```cpp
asw::Color red = {255, 0, 0, 255};
asw::Texture tex = asw::assets::loadTexture("image.png");
```
