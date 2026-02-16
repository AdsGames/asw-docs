# Input

Keyboard, mouse, and game controller input handling.

**Header:** `#include <asw/modules/input.h>`
**Namespace:** `asw::input`

## Keyboard

### Key Enum

The `asw::input::Key` enum maps to SDL scancodes. Common keys include:

| Key                                               | Description   |
| ------------------------------------------------- | ------------- |
| `Key::A` - `Key::Z`                               | Letter keys   |
| `Key::Num0` - `Key::Num9`                         | Number keys   |
| `Key::F1` - `Key::F24`                            | Function keys |
| `Key::Return`                                     | Enter key     |
| `Key::Escape`                                     | Escape key    |
| `Key::Space`                                      | Spacebar      |
| `Key::Up`, `Key::Down`, `Key::Left`, `Key::Right` | Arrow keys    |
| `Key::LShift`, `Key::RShift`                      | Shift keys    |
| `Key::LCtrl`, `Key::RCtrl`                        | Control keys  |
| `Key::LAlt`, `Key::RAlt`                          | Alt keys      |
| `Key::Tab`                                        | Tab key       |
| `Key::Backspace`                                  | Backspace key |

### Keyboard Functions

#### `getKey`

```cpp
bool getKey(asw::input::Key key);
```

Check if a key is currently held down.

#### `getKeyDown`

```cpp
bool getKeyDown(asw::input::Key key);
```

Check if a key was pressed since the last update (single-tick).

#### `getKeyUp`

```cpp
bool getKeyUp(asw::input::Key key);
```

Check if a key was released since the last update (single-tick).

### KeyState

```cpp
extern KeyState keyboard;
```

The global keyboard state. Holds arrays for `pressed`, `released`, and `down` states, plus `anyPressed` and `lastPressed`.

## Mouse

### MouseButton Enum

| Value                 | Description         |
| --------------------- | ------------------- |
| `MouseButton::Left`   | Left mouse button   |
| `MouseButton::Middle` | Middle mouse button |
| `MouseButton::Right`  | Right mouse button  |
| `MouseButton::X1`     | Extra button 1      |
| `MouseButton::X2`     | Extra button 2      |

### Mouse Functions

#### `getMouseButton`

```cpp
bool getMouseButton(asw::input::MouseButton button);
```

Check if a mouse button is currently held down.

#### `getMouseButtonDown`

```cpp
bool getMouseButtonDown(asw::input::MouseButton button);
```

Check if a mouse button was pressed since the last update.

#### `getMouseButtonUp`

```cpp
bool getMouseButtonUp(asw::input::MouseButton button);
```

Check if a mouse button was released since the last update.

### MouseState

```cpp
extern MouseState mouse;
```

The global mouse state struct:

| Field         | Type          | Description                   |
| ------------- | ------------- | ----------------------------- |
| `position`    | `Vec2<float>` | Current mouse position        |
| `z`           | `float`       | Scroll wheel value            |
| `xChange`     | `float`       | Horizontal movement delta     |
| `yChange`     | `float`       | Vertical movement delta       |
| `anyPressed`  | `bool`        | Whether any button is pressed |
| `lastPressed` | `int`         | Last pressed button index     |

### Cursor

#### `setCursor`

```cpp
void setCursor(asw::input::CursorId cursor);
```

Change the system cursor. Available cursors include `CursorId::Default`, `CursorId::Text`, `CursorId::Wait`, `CursorId::Crosshair`, `CursorId::Pointer`, and various resize cursors.

## Game Controller

Supports up to 8 game controllers simultaneously.

### ControllerButton Enum

| Value                                      | Description        |
| ------------------------------------------ | ------------------ |
| `ControllerButton::A`                      | South face button  |
| `ControllerButton::B`                      | East face button   |
| `ControllerButton::X`                      | West face button   |
| `ControllerButton::Y`                      | North face button  |
| `ControllerButton::Back`                   | Back/Select button |
| `ControllerButton::Start`                  | Start button       |
| `ControllerButton::Guide`                  | Guide/Home button  |
| `ControllerButton::LeftStick`              | Left stick press   |
| `ControllerButton::RightStick`             | Right stick press  |
| `ControllerButton::LeftShoulder`           | Left bumper        |
| `ControllerButton::RightShoulder`          | Right bumper       |
| `ControllerButton::DPadUp/Down/Left/Right` | D-pad directions   |

### ControllerAxis Enum

| Value                          | Description        |
| ------------------------------ | ------------------ |
| `ControllerAxis::LeftX`        | Left stick X axis  |
| `ControllerAxis::LeftY`        | Left stick Y axis  |
| `ControllerAxis::RightX`       | Right stick X axis |
| `ControllerAxis::RightY`       | Right stick Y axis |
| `ControllerAxis::LeftTrigger`  | Left trigger       |
| `ControllerAxis::RightTrigger` | Right trigger      |

### Controller Functions

#### `getControllerButton`

```cpp
bool getControllerButton(int index, asw::input::ControllerButton button);
```

Check if a controller button is currently held down.

#### `getControllerButtonDown`

```cpp
bool getControllerButtonDown(int index, asw::input::ControllerButton button);
```

Check if a controller button was pressed since the last update.

#### `getControllerButtonUp`

```cpp
bool getControllerButtonUp(int index, asw::input::ControllerButton button);
```

Check if a controller button was released since the last update.

#### `getControllerAxis`

```cpp
float getControllerAxis(int index, asw::input::ControllerAxis axis);
```

Get the value of a controller axis (between `-1.0f` and `1.0f`).

#### `setControllerDeadZone`

```cpp
void setControllerDeadZone(int index, float deadZone);
```

Set the joystick deadzone for a controller (default: `0.25f`).

#### `getControllerCount`

```cpp
int getControllerCount();
```

Get the number of connected controllers.

#### `getControllerName`

```cpp
std::string getControllerName(int index);
```

Get the name of a controller.

## Example

```cpp
// Keyboard
if (asw::input::getKeyDown(asw::input::Key::Space)) {
  // jump
}

if (asw::input::getKey(asw::input::Key::A)) {
  // move left while held
}

// Mouse
if (asw::input::getMouseButtonDown(asw::input::MouseButton::Left)) {
  auto pos = asw::input::mouse.position;
  // handle click at pos
}

// Controller
float moveX = asw::input::getControllerAxis(0, asw::input::ControllerAxis::LeftX);
if (asw::input::getControllerButtonDown(0, asw::input::ControllerButton::A)) {
  // jump
}
```
