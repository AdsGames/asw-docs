# Asset Manager

Centralized asset store with automatic caching and deduplication.

**Header:** `#include <asw/modules/asset_manager.h>`
**Namespace:** `asw`

## Overview

The `AssetManager` class wraps the `asw::assets` loading functions with a cache layer. Loading the same asset path twice returns the same `shared_ptr` without hitting disk.

Not a singleton -- create one per scene or share globally as needed.

```cpp
asw::AssetManager assets;
```

## Textures

### `getTexture`

```cpp
Texture getTexture(const std::string& path);
```

Get a texture by path. Loads and caches on first access.

### `hasTexture`

```cpp
bool hasTexture(const std::string& path) const;
```

Check if a texture is already cached.

### `unloadTexture`

```cpp
void unloadTexture(const std::string& path);
```

Remove a texture from the cache.

## Fonts

### `getFont`

```cpp
Font getFont(const std::string& path, float size);
```

Get a font by path and size. Loads and caches on first access. Fonts are keyed by `path:size`, so the same font file at different sizes is cached separately.

### `hasFont`

```cpp
bool hasFont(const std::string& path, float size) const;
```

Check if a font is already cached.

### `unloadFont`

```cpp
void unloadFont(const std::string& path, float size);
```

Remove a font from the cache.

## Samples

### `getSample`

```cpp
Sample getSample(const std::string& path);
```

Get a sound sample by path. Loads and caches on first access.

### `hasSample`

```cpp
bool hasSample(const std::string& path) const;
```

Check if a sample is already cached.

### `unloadSample`

```cpp
void unloadSample(const std::string& path);
```

Remove a sample from the cache.

## Music

### `getMusic`

```cpp
Music getMusic(const std::string& path);
```

Get music by path. Loads and caches on first access.

### `hasMusic`

```cpp
bool hasMusic(const std::string& path) const;
```

Check if music is already cached.

### `unloadMusic`

```cpp
void unloadMusic(const std::string& path);
```

Remove music from the cache.

## Management

### `clear`

```cpp
void clear();
```

Clear all cached assets.

### Cache Counts

```cpp
size_t getTextureCount() const;
size_t getFontCount() const;
size_t getSampleCount() const;
size_t getMusicCount() const;
size_t getTotalCount() const;
```

Get the number of cached assets by type or total.

## Example

```cpp
asw::AssetManager assets;

// First call loads from disk, subsequent calls return cached
auto player = assets.getTexture("sprites/player.png");
auto playerAgain = assets.getTexture("sprites/player.png"); // cached

auto font = assets.getFont("fonts/main.ttf", 16.0f);
auto fontLarge = assets.getFont("fonts/main.ttf", 32.0f); // separate cache entry

// Unload when no longer needed
assets.unloadTexture("sprites/player.png");

// Or clear everything
assets.clear();
```
