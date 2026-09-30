# Input

Keyboard, mouse, and game controller input handling.

**Header:** `#include <asw/modules/input.h>`\
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

Check if a key was pressed since the last update (single-frame). A held key does not repeat.

#### `get_key_repeat`

```cpp
bool get_key_repeat(asw::input::Key key);
```

Check if a key was pressed or auto-repeated since the last update. A held key repeats at the rate that the operating system sets. Use it for text editing and menu movement, and `get_key_down()` for game actions.

#### `get_key_up`

```cpp
bool get_key_up(asw::input::Key key);
```

Check if a key was released since the last update (single-frame).

### KeyState

```cpp
const KeyState& get_keyboard();
```

Get the current keyboard state. Fields:

| Field | Type | Description |
|-------|------|-------------|
| `pressed` | `std::array<bool, NUM_KEYS>` | Keys pressed this frame |
| `released` | `std::array<bool, NUM_KEYS>` | Keys released this frame |
| `down` | `std::array<bool, NUM_KEYS>` | Keys currently held |
| `repeated` | `std::array<bool, NUM_KEYS>` | Keys pressed or auto-repeated this frame |
| `any_pressed` | `bool` | Whether any key is pressed |
| `last_pressed` | `int` | Last pressed key index |

### Text Input

```cpp
const std::string& get_text_input();
```

Get the text input received during the current frame. Useful for text fields and chat input.

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
const MouseState& get_mouse();
```

Get the current mouse state. Fields:

| Field | Type | Description |
|-------|------|-------------|
| `position` | `Vec2<float>` | Current mouse position |
| `change` | `Vec2<float>` | Total movement since the last frame |
| `z` | `float` | Scroll wheel value |
| `any_pressed` | `bool` | Whether any button is pressed |
| `last_pressed` | `int` | Button pressed this frame, or `-1` if none |

### Cursor

#### `set_cursor`

```cpp
void set_cursor(asw::input::CursorId cursor);
```

Change the system cursor. Available cursors include `CursorId::Default`, `CursorId::Text`, `CursorId::Wait`, `CursorId::Crosshair`, `CursorId::Pointer`, and various resize cursors.

#### `set_cursor_visible`

```cpp
void set_cursor_visible(bool visible);
```

Show or hide the mouse cursor. Use this if your game draws its own cursor.

## Game Controller

Each controller keeps its index while other controllers are disconnected. A controller that is connected again gets its old index back. ASW finds it by its serial number, or by its model if it has no serial number. A new controller takes the first empty index.

### `ANY_CONTROLLER`

```cpp
constexpr uint32_t ANY_CONTROLLER = UINT32_MAX;
```

Pass `ANY_CONTROLLER` as the controller index to read all connected controllers. A button is active if it is active on any controller. Axes and sticks return the value that is farthest from the center.

Use it for single-player games, so the player can use any controller.

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
| `ControllerButton::Misc1` | Extra button (for example, Share or Capture) |
| `ControllerButton::LeftPaddle1/2`, `RightPaddle1/2` | Back paddles |
| `ControllerButton::TouchPad` | Touchpad press |

### ControllerAxis Enum

| Value | Description |
|-------|-------------|
| `ControllerAxis::LeftX` | Left stick X axis |
| `ControllerAxis::LeftY` | Left stick Y axis |
| `ControllerAxis::RightX` | Right stick X axis |
| `ControllerAxis::RightY` | Right stick Y axis |
| `ControllerAxis::LeftTrigger` | Left trigger |
| `ControllerAxis::RightTrigger` | Right trigger |

### ControllerStick Enum

| Value | Description |
|-------|-------------|
| `ControllerStick::Left` | Left analog stick |
| `ControllerStick::Right` | Right analog stick |

### Controller Functions

In all of these functions, `index` is the controller index or `ANY_CONTROLLER`.

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

Get the value of a controller axis, with the dead zone applied. Sticks go from `-1.0f` to `1.0f`, and triggers go from `0.0f` to `1.0f`.

Stick axes use a radial dead zone, so a stick that is pushed straight along one axis reads zero on the other axis. Values past the dead zone are rescaled to start from zero.

#### `get_controller_stick`

```cpp
Vec2<float> get_controller_stick(uint32_t index, asw::input::ControllerStick stick);
```

Get the position of a controller stick, with the dead zone applied. The length of the result is `1` or less. Use this for movement in all directions, because it keeps diagonal speed the same as straight speed.

#### `set_controller_dead_zone`

```cpp
void set_controller_dead_zone(uint32_t index, float dead_zone);
```

Set the dead zone of a controller, from `0.0f` to `1.0f` (default: `0.25f`). Values are clamped to the range `0.0f` to `0.99f`. Pass `ANY_CONTROLLER` to set it for all connected controllers, and for controllers that connect later.

#### `get_controller_count`

```cpp
int get_controller_count();
```

Get the number of controller indexes: the highest connected index plus one. Returns `0` when no controller is connected. An index below this count can be empty, so check it with `is_controller_connected()`.

#### `is_controller_connected`

```cpp
bool is_controller_connected(uint32_t index);
```

Returns `true` if a controller is connected at the index.

#### `get_controller_name`

```cpp
std::string get_controller_name(uint32_t index);
```

Get the name of a controller.

### Rumble

#### `rumble_controller`

```cpp
bool rumble_controller(uint32_t index, float low_frequency, float high_frequency,
                       uint32_t duration_ms);
```

Rumble the main motors of a controller. `low_frequency` is the left motor and `high_frequency` is the right motor, each from `0.0f` to `1.0f`. Each call replaces the last rumble on that controller. Call with both values at `0` to stop early. Pass `ANY_CONTROLLER` to rumble all connected controllers. Returns `true` if at least one controller started to rumble.

#### `rumble_controller_triggers`

```cpp
bool rumble_controller_triggers(uint32_t index, float left, float right, uint32_t duration_ms);
```

Rumble the trigger motors of a controller, from `0.0f` to `1.0f`. Only some controllers have trigger motors, for example Xbox One and Xbox Series controllers. Works the same as `rumble_controller()`.

#### `controller_has_rumble` / `controller_has_trigger_rumble`

```cpp
bool controller_has_rumble(uint32_t index);
bool controller_has_trigger_rumble(uint32_t index);
```

Returns `true` if the controller supports rumble or trigger rumble. With `ANY_CONTROLLER`, returns `true` if any connected controller does.

```cpp
if (player_hit) {
  asw::input::rumble_controller(asw::input::ANY_CONTROLLER, 0.8f, 0.4f, 200);
}
```

## Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `NUM_KEYS` | `SDL_SCANCODE_COUNT` | Number of keys |
| `NUM_MOUSE_BUTTONS` | `6` | Number of mouse buttons |
| `NUM_CURSORS` | `SDL_SYSTEM_CURSOR_COUNT` | Number of system cursors |
| `NUM_CONTROLLER_BUTTONS` | `SDL_GAMEPAD_BUTTON_COUNT` | Number of controller buttons |
| `NUM_CONTROLLER_AXES` | `SDL_GAMEPAD_AXIS_COUNT` | Number of controller axes |
| `ANY_CONTROLLER` | `UINT32_MAX` | Controller index that reads all connected controllers. See [ANY_CONTROLLER](#any-controller) |

## Last Used Device

### InputDevice Enum

| Value | Description |
|-------|-------------|
| `InputDevice::KeyboardMouse` | Keyboard and mouse |
| `InputDevice::Controller` | A game controller |

#### `get_last_device`

```cpp
InputDevice get_last_device();
```

Get the device that the player used most recently. Use it to show keyboard or controller prompts. Key presses, mouse clicks and mouse motion count as `KeyboardMouse`. Button presses, and axes past the dead zone, count as `Controller`. The default is `KeyboardMouse`.

## Simulated Input

These functions queue the same events that a real device sends. The game gets them through the normal input path on the next `asw::core::update()`. Use them to script demos or automated test runs.

#### `simulate_key_down`

```cpp
void simulate_key_down(asw::input::Key key);
```

Simulate a key press.

#### `simulate_key_up`

```cpp
void simulate_key_up(asw::input::Key key);
```

Simulate a key release.

#### `simulate_mouse_move`

```cpp
void simulate_mouse_move(const asw::Vec2<float>& position);
```

Simulate a mouse move. `position` is in logical (render) coordinates, the same space that `get_mouse()` reports.

#### `simulate_mouse_button_down`

```cpp
void simulate_mouse_button_down(asw::input::MouseButton button);
```

Simulate a mouse button press.

#### `simulate_mouse_button_up`

```cpp
void simulate_mouse_button_up(asw::input::MouseButton button);
```

Simulate a mouse button release.

## Actions

To bind named actions to keys, mouse buttons and controller input, see [Actions](./action).

## Reset

### `reset`

```cpp
void reset();
```

Reset the per-frame input states. `asw::core::update()` calls this for you.

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
  auto pos = asw::input::get_mouse().position;
  // handle click at pos
}

// Controller
auto move = asw::input::get_controller_stick(asw::input::ANY_CONTROLLER,
                                            asw::input::ControllerStick::Left);
if (asw::input::get_controller_button_down(asw::input::ANY_CONTROLLER,
                                           asw::input::ControllerButton::A)) {
  // jump
}

// Text input
if (!asw::input::get_text_input().empty()) {
  // handle typed text
}

// Scripted input, read on the next asw::core::update()
asw::input::simulate_key_down(asw::input::Key::Space);

// Show the right button prompts
bool use_pad = asw::input::get_last_device() == asw::input::InputDevice::Controller;
```
