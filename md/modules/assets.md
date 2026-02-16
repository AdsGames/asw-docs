# Assets

Functions for loading textures, fonts, and audio from disk.

**Header:** `#include <asw/modules/assets.h>`
**Namespace:** `asw::assets`

## Functions

### `loadTexture`

```cpp
asw::Texture loadTexture(const std::string& filename);
```

Load a texture from a file. Supported formats: PNG, ICO, CUR, BMP, GIF, JPG, LBM, PCX, PNM, TIF, XCF, XPM, XV, and WEBP.

::: warning
Aborts the program if the file is not found.
:::

### `loadFont`

```cpp
asw::Font loadFont(const std::string& filename, float size);
```

Load a TTF font from a file at the given size.

| Parameter | Type | Description |
|-----------|------|-------------|
| `filename` | `const std::string&` | Path to the `.ttf` file |
| `size` | `float` | Font size in points |

::: warning
Aborts the program if the file is not found.
:::

### `loadSample`

```cpp
asw::Sample loadSample(const std::string& filename);
```

Load a sound effect from a file. Supported formats: WAV, AIFF, RIFF, OGG, and VOC.

::: warning
Aborts the program if the file is not found.
:::

### `loadMusic`

```cpp
asw::Music loadMusic(const std::string& filename);
```

Load a music file. Supported formats: WAV, AIFF, RIFF, OGG, and VOC.

::: warning
Aborts the program if the file is not found.
:::

### `createTexture`

```cpp
asw::Texture createTexture(int w, int h);
```

Create a blank texture with the given dimensions. Useful for render targets.

| Parameter | Type | Description |
|-----------|------|-------------|
| `w` | `int` | Width of the texture |
| `h` | `int` | Height of the texture |

## Example

```cpp
auto texture = asw::assets::loadTexture("sprites/player.png");
auto font = asw::assets::loadFont("fonts/arial.ttf", 24.0f);
auto sound = asw::assets::loadSample("sfx/jump.wav");
auto music = asw::assets::loadMusic("music/theme.ogg");
auto canvas = asw::assets::createTexture(256, 256);
```
