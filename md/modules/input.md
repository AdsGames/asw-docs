# Input

Keyboard, mouse, and game controller input handling.

**Header:** `#include <asw/modules/input.h>`
**Namespace:** `asw::input`

## Keyboard

### Key Enum

The `asw::input::Key` enum maps to SDL scancodes. Common keys include:

| Key | Description |
|-----|-------------|
| `Key::A` - `Key::Z` | Letter keys |
| `Key::Num0` - `Key::Num9` | Number keys |
| `Key::F1` - `Key::F24` | Function keys |
| `Key::Return` | Enter key |
| `Key::Escape` | Escape key |
| `Key::Space` | Spacebar |
| `Key::Up`, `Key::Down`, `Key::Left`, `Key::Right` | Arrow keys |
| `Key::LShift`, `Key::RShift` | Shift keys |
| `Key::LCtrl`, `Key::RCtrl` | Control keys |
| `Key::LAlt`, `Key::RAlt` | Alt keys |
| `Key::Tab` | Tab key |
| `Key::Backspace` | Backspace key |

### Keyboard Functions

#### `get_key`

```cpp
bool get_key(asw::input::Key key);
```

Check if a key is currently held down.

#### `get_key_down`

```cpp
bool get_key_down(asw::input::Key key);
```

Check if a key was pressed since the last update (single-frame).

#### `get_key_up`

```cpp
bool get_key_up(asw::input::Key key);
```

Check if a key was released since the last update (single-frame).

### KeyState

```cpp
extern KeyState keyboard;
```

The global keyboard state. Fields:

| Field | Type | Description |
|-------|------|-------------|
| `pressed` | `std::array<bool, NUM_KEYS>` | Keys pressed this frame |
| `released` | `std::array<bool, NUM_KEYS>` | Keys released this frame |
| `down` | `std::array<bool, NUM_KEYS>` | Keys currently held |
| `any_pressed` | `bool` | Whether any key is pressed |
| `last_pressed` | `int` | Last pressed key index |

### Text Input

```cpp
extern std::string text_input;
```

Contains the text input received during the current frame. Useful for text fields and chat input.

## Mouse

### MouseButton Enum

| Value | Description |
|-------|-------------|
| `MouseButton::Left` | Left mouse button |
| `MouseButton::Middle` | Middle mouse button |
| `MouseButton::Right` | Right mouse button |
| `MouseButton::X1` | Extra button 1 |
| `MouseButton::X2` | Extra button 2 |

### Mouse Functions

#### `get_mouse_button`

```cpp
bool get_mouse_button(asw::input::MouseButton button);
```

Check if a mouse button is currently held down.

#### `get_mouse_button_down`

```cpp
bool get_mouse_button_down(asw::input::MouseButton button);
```

Check if a mouse button was pressed since the last update.

#### `get_mouse_button_up`

```cpp
bool get_mouse_button_up(asw::input::MouseButton button);
```

Check if a mouse button was released since the last update.

### MouseState

```cpp
extern MouseState mouse;
```

The global mouse state struct:

| Field | Type | Description |
|-------|------|-------------|
| `position` | `Vec2<float>` | Current mouse position |
| `change` | `Vec2<float>` | Movement delta since last frame |
| `z` | `float` | Scroll wheel value |
| `any_pressed` | `bool` | Whether any button is pressed |
| `last_pressed` | `int` | Last pressed button index |

### Cursor

#### `set_cursor`

```cpp
void set_cursor(asw::input::CursorId cursor);
```

Change the system cursor. Available cursors include `CursorId::Default`, `CursorId::Text`, `CursorId::Wait`, `CursorId::Crosshair`, `CursorId::Pointer`, and various resize cursors.

## Game Controller

Supports up to 8 game controllers simultaneously.

### ControllerButton Enum

| Value | Description |
|-------|-------------|
| `ControllerButton::A` | South face button |
| `ControllerButton::B` | East face button |
| `ControllerButton::X` | West face button |
| `ControllerButton::Y` | North face button |
| `ControllerButton::Back` | Back/Select button |
| `ControllerButton::Start` | Start button |
| `ControllerButton::Guide` | Guide/Home button |
| `ControllerButton::LeftStick` | Left stick press |
| `ControllerButton::RightStick` | Right stick press |
| `ControllerButton::LeftShoulder` | Left bumper |
| `ControllerButton::RightShoulder` | Right bumper |
| `ControllerButton::DPadUp/Down/Left/Right` | D-pad directions |

### ControllerAxis Enum

| Value | Description |
|-------|-------------|
| `ControllerAxis::LeftX` | Left stick X axis |
| `ControllerAxis::LeftY` | Left stick Y axis |
| `ControllerAxis::RightX` | Right stick X axis |
| `ControllerAxis::RightY` | Right stick Y axis |
| `ControllerAxis::LeftTrigger` | Left trigger |
| `ControllerAxis::RightTrigger` | Right trigger |

### Controller Functions

#### `get_controller_button`

```cpp
bool get_controller_button(uint32_t index, asw::input::ControllerButton button);
```

Check if a controller button is currently held down.

#### `get_controller_button_down`

```cpp
bool get_controller_button_down(uint32_t index, asw::input::ControllerButton button);
```

Check if a controller button was pressed since the last update.

#### `get_controller_button_up`

```cpp
bool get_controller_button_up(uint32_t index, asw::input::ControllerButton button);
```

Check if a controller button was released since the last update.

#### `get_controller_axis`

```cpp
float get_controller_axis(uint32_t index, asw::input::ControllerAxis axis);
```

Get the value of a controller axis (between `-1.0f` and `1.0f`).

#### `set_controller_dead_zone`

```cpp
void set_controller_dead_zone(uint32_t index, float dead_zone);
```

Set the joystick deadzone for a controller (default: `0.25f`).

#### `get_controller_count`

```cpp
int get_controller_count();
```

Get the number of connected controllers.

#### `get_controller_name`

```cpp
std::string get_controller_name(uint32_t index);
```

Get the name of a controller.

## Example

```cpp
// Keyboard
if (asw::input::get_key_down(asw::input::Key::Space)) {
  // jump
}

if (asw::input::get_key(asw::input::Key::A)) {
  // move left while held
}

// Mouse
if (asw::input::get_mouse_button_down(asw::input::MouseButton::Left)) {
  auto pos = asw::input::mouse.position;
  // handle click at pos
}

// Controller
float move_x = asw::input::get_controller_axis(0, asw::input::ControllerAxis::LeftX);
if (asw::input::get_controller_button_down(0, asw::input::ControllerButton::A)) {
  // jump
}

// Text input
if (!asw::input::text_input.empty()) {
  // handle typed text
}
```
