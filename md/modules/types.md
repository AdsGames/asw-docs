# Types

Core type aliases used throughout the ASW library.

**Header:** `#include <asw/modules/types.h>`\
**Namespace:** `asw`

## Type Aliases

| Type | Underlying | Description |
|------|-----------|-------------|
| `asw::Texture` | `std::shared_ptr<SDL_Texture>` | A shared pointer to an SDL texture |
| `asw::Font` | `std::shared_ptr<TTF_Font>` | A shared pointer to a TTF font |
| `asw::Sample` | `std::shared_ptr<MIX_Audio>` | A shared pointer to a sound effect |
| `asw::Music` | `std::shared_ptr<MIX_Audio>` | A shared pointer to music |
| `asw::Renderer` | `SDL_Renderer` | Alias for the SDL renderer |
| `asw::Window` | `SDL_Window` | Alias for the SDL window |

All asset types (`Texture`, `Font`, `Sample`, `Music`) use `shared_ptr` for automatic memory management.

## BlendMode Enum

```cpp
enum class BlendMode : SDL_BlendMode {
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

The underlying type of `BlendMode` is `SDL_BlendMode`, so you can cast between the two directly.

## ScaleMode Enum

```cpp
enum class ScaleMode {
  Nearest,
  Linear,
};
```

Sets how a texture is filtered when it is scaled. Pass it to `asw::draw::set_scale_mode()`.

| Value | Description |
|-------|-------------|
| `Nearest` | Nearest-pixel filtering. Keeps hard pixel edges |
| `Linear` | Linear filtering. Makes scaled textures smooth |

The values map to `SDL_SCALEMODE_NEAREST` and `SDL_SCALEMODE_LINEAR`.

## TextJustify Enum

```cpp
enum class TextJustify {
  Left,
  Center,
  Right,
};
```

Used with `asw::draw::text()` and `asw::game::Text` to control text alignment.

## FontStyle Enum

```cpp
enum class FontStyle {
  Smooth,
  Pixel,
};
```

Sets how the glyphs of a font are rendered. Pass it to `asw::assets::load_font()`.

| Value | Description |
|-------|-------------|
| `Smooth` | Anti-aliased glyphs rendered at the output resolution, for regular fonts. Text stays sharp when the window is scaled up or on high density displays |
| `Pixel` | Hard-edged glyphs rendered at the logical size and scaled with nearest filtering, for pixel art fonts |

## Example

```cpp
asw::Color red(255, 0, 0);
asw::Texture tex = asw::assets::load_texture("image.png");
```
