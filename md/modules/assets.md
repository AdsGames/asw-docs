# Assets

Functions for loading, caching, and managing textures, fonts, and audio.

**Header:** `#include <asw/modules/assets.h>`\
**Namespace:** `asw::assets`

## Paths

### `get_path`

```cpp
std::string get_path(const std::string& filename);
```

Get the full path to an asset. Adds the base path of the application (the directory of the executable, or `Contents/Resources/` in a macOS app bundle) before `filename`. If the base path is not available, returns `filename` unchanged.

All `load_*` functions use this function, so asset filenames are relative to the application base path, not to the working directory.

### `get_save_path`

```cpp
std::string get_save_path(const std::string& org, const std::string& app);
```

Get a writable folder for save files and settings, unique to the organization and application. The folder is created if it does not exist. The path ends in a path separator. Returns an empty string if the path cannot be found.

## Textures

### `load_texture`

```cpp
asw::Texture load_texture(const std::string& filename);
asw::Texture load_texture(const std::string& filename, const std::string& key);
```

Load a texture from a file. Supported formats: PNG, ICO, CUR, BMP, GIF, JPG, LBM, PCX, PNM, TIF, XCF, XPM, XV, and WEBP. The second overload caches the result under `key` for later retrieval.

::: warning
Aborts the program if the file is not found.
:::

### `get_texture`

```cpp
asw::Texture get_texture(const std::string& key);
```

Get a previously cached texture by key.

### `unload_texture`

```cpp
void unload_texture(const std::string& key);
```

Remove a cached texture.

### `create_texture`

```cpp
asw::Texture create_texture(int w, int h);
```

Create a blank texture with the given dimensions. Useful for render targets.

### `create_radial_gradient`

```cpp
asw::Texture create_radial_gradient(int size, asw::Color inner, asw::Color outer);
```

Create a square texture with a radial gradient. The color changes smoothly from `inner` at the center to `outer` at the edge and in the corners. The texture has linear scaling and a blend mode set. Useful for lights.

| Parameter | Type | Description |
|-----------|------|-------------|
| `size` | `int` | The width and height of the texture |
| `inner` | `asw::Color` | The color at the center |
| `outer` | `asw::Color` | The color at the edge and in the corners |

## Fonts

### `load_font`

```cpp
asw::Font load_font(const std::string& filename,
                    float size,
                    asw::FontStyle style = asw::FontStyle::Smooth);
asw::Font load_font(const std::string& filename,
                    float size,
                    const std::string& key,
                    asw::FontStyle style = asw::FontStyle::Smooth);
```

Load a TTF font at the given size. The second overload caches the result under `key`. Use `asw::FontStyle::Pixel` for pixel art fonts, and `asw::FontStyle::Smooth` for regular fonts. See [FontStyle](./types#fontstyle-enum).

::: warning
Aborts the program if the file is not found.
:::

### `get_font`

```cpp
asw::Font get_font(const std::string& key);
```

Get a previously cached font by key.

### `unload_font`

```cpp
void unload_font(const std::string& key);
```

Remove a cached font.

## Samples

### `load_sample`

```cpp
asw::Sample load_sample(const std::string& filename);
asw::Sample load_sample(const std::string& filename, const std::string& key);
```

Load a sound effect from a file. Supported formats: WAV, AIFF, RIFF, OGG, and VOC. The second overload caches the result under `key`.

::: warning
Aborts the program if the file is not found.
:::

### `get_sample`

```cpp
asw::Sample get_sample(const std::string& key);
```

Get a previously cached sample by key.

### `unload_sample`

```cpp
void unload_sample(const std::string& key);
```

Remove a cached sample.

## Music

### `load_music`

```cpp
asw::Music load_music(const std::string& filename);
asw::Music load_music(const std::string& filename, const std::string& key);
```

Load a music file. Supported formats: WAV, AIFF, RIFF, OGG, and VOC. The second overload caches the result under `key`.

::: warning
Aborts the program if the file is not found.
:::

### `get_music`

```cpp
asw::Music get_music(const std::string& key);
```

Get previously cached music by key.

### `unload_music`

```cpp
void unload_music(const std::string& key);
```

Remove cached music.

## Global

### `clear_all`

```cpp
void clear_all();
```

Clear all cached assets (textures, fonts, samples, and music).

## Example

```cpp
// Load without caching
auto texture = asw::assets::load_texture("sprites/player.png");

// Load with caching
asw::assets::load_texture("sprites/player.png", "player");
asw::assets::load_font("fonts/arial.ttf", 24.0f, "main_font");
asw::assets::load_font("fonts/pixel.ttf", 8.0f, "pixel_font", asw::FontStyle::Pixel);
asw::assets::load_sample("sfx/jump.wav", "jump");
asw::assets::load_music("music/theme.ogg", "bgm");

// Retrieve cached assets anywhere
auto player = asw::assets::get_texture("player");
auto font = asw::assets::get_font("main_font");

// Unload individual assets
asw::assets::unload_texture("player");

// Or clear everything
asw::assets::clear_all();

// Generated textures
auto light = asw::assets::create_radial_gradient(128, asw::Color(255, 220, 150, 255),
                                                 asw::Color(255, 220, 150, 0));

// Save files
std::string save_file = asw::assets::get_save_path("A.D.S. Games", "My Game") + "save.dat";
```
