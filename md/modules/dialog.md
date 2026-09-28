# Dialog

Native message boxes and file choosers.

**Header:** `#include <asw/modules/dialog.h>`\
**Namespace:** `asw::dialog`

## Message Boxes

The message box functions block until the user closes the box. The box is attached to the game window.

### `info`

```cpp
void info(const std::string& title, const std::string& message);
```

Show an information message box.

### `warn`

```cpp
void warn(const std::string& title, const std::string& message);
```

Show a warning message box.

### `error`

```cpp
void error(const std::string& title, const std::string& message);
```

Show an error message box.

### `confirm`

```cpp
bool confirm(const std::string& title, const std::string& message);
```

Ask a yes or no question. Returns `true` if the user chose yes. Returns `false` if the user chose no or closed the box.

## File Choosers

A file chooser does not block. Open it with `request_file`, then check for the result with `take_file` each frame. Only one file chooser can be open at a time.

### FileMode Enum

```cpp
enum class FileMode {
  Open,
  Save,
};
```

| Value | Description |
|-------|-------------|
| `Open` | Choose a file that exists |
| `Save` | Choose where to save a file |

### FileFilter

```cpp
struct FileFilter {
  std::string name;
  std::string pattern;
};
```

A filter that the file chooser shows.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `std::string` | The name shown to the user, for example `"Levels"` |
| `pattern` | `std::string` | Extensions without dots, separated by semicolons, for example `"xml;json"`. Use `"*"` for all files |

### `request_file`

```cpp
bool request_file(FileMode mode,
                  const std::string& default_location = "",
                  const std::vector<FileFilter>& filters = {});
```

Open a native file chooser. Returns `true` if the chooser opened, and `false` if a chooser is already open.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mode` | `FileMode` | | Open a file that exists, or choose where to save one |
| `default_location` | `const std::string&` | `""` | The folder or file where the chooser starts. Empty for the system default |
| `filters` | `const std::vector<FileFilter>&` | `{}` | The filters to show. Empty for all files |

### `is_file_pending`

```cpp
bool is_file_pending();
```

Returns `true` while a file chooser is open and the user has not chosen yet.

### `take_file`

```cpp
std::optional<std::string> take_file();
```

Get the path that the user chose. The path is returned one time only. After that, the function returns empty until the next file chooser. It also returns empty while the chooser is open, if the user cancels, or if the chooser fails.

## Example

```cpp
// Message boxes
asw::dialog::info("Saved", "Your game was saved.");

if (asw::dialog::confirm("Quit", "Quit without saving?")) {
  asw::core::exit();
}

// Open a level file when the player presses O
if (asw::input::get_key_down(asw::input::Key::O)) {
  asw::dialog::request_file(asw::dialog::FileMode::Open, "",
                            {{"Levels", "json"}, {"All files", "*"}});
}

// Each frame, check for the chosen file
if (auto path = asw::dialog::take_file()) {
  // load the level at *path
}
```
