# UI

Retained-mode UI widget system with theming, focus navigation, and input handling.

**Header:** `#include <asw/modules/ui/ui.h>`
**Namespace:** `asw::ui`

## Widget

Base class for all UI widgets. Provides identity, visibility, focus, parent/child tree management, and virtual methods for layout, event handling, and drawing.

```cpp
class Widget;
```

### Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `visible` | `bool` | `true` | Whether the widget is visible |
| `enabled` | `bool` | `true` | Whether the widget is enabled |
| `focusable` | `bool` | `false` | Whether the widget can receive focus |
| `parent` | `Widget*` | `nullptr` | Pointer to the parent widget |
| `children` | `std::vector<std::unique_ptr<Widget>>` | | Child widgets |
| `transform` | `asw::Quad<float>` | | Position and size |

### Methods

#### `id`

```cpp
WidgetId id() const;
```

Get the unique identifier for this widget (`WidgetId` is `uint32_t`).

#### `layout`

```cpp
virtual void layout(Context& ctx);
```

Lay out this widget and its children.

#### `on_event`

```cpp
virtual bool on_event(Context& ctx, const UIEvent& e);
```

Handle a UI event. Returns `true` if the event was consumed.

#### `on_focus_changed`

```cpp
virtual void on_focus_changed(Context& ctx, bool focused);
```

Called when focus state changes.

#### `draw`

```cpp
virtual void draw(Context& ctx);
```

Draw this widget and its children.

#### `add_child`

```cpp
template <class T, class... Args>
T& add_child(Args&&... args);
```

Add a child widget of type `T` (must derive from `Widget`). Returns a reference to the new child.

## UIEvent

Event structure for UI interactions.

```cpp
struct UIEvent;
```

### Event Types

```cpp
enum class Type {
  KeyDown, KeyUp, TextInput,
  PointerDown, PointerUp, PointerMove,
  PointerEnter, PointerLeave,
  Activate, Back
};
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `type` | `Type` | The event type |
| `key` | `asw::input::Key` | Key associated with keyboard events |
| `shift` | `bool` | Whether shift is held |
| `pointer_id` | `int` | Pointer identifier |
| `pointer_pos` | `asw::Vec2<float>` | Pointer position |
| `mouse_button` | `asw::input::MouseButton` | Mouse button for pointer events |
| `text` | `std::string` | Text for `TextInput` events |

## Theme

Visual style configuration for all UI elements.

```cpp
struct Theme;
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `text` | `asw::Color` | white | Default text color |
| `text_dim` | `asw::Color` | light gray | Dimmed text color |
| `panel_bg` | `asw::Color` | dark gray | Panel background |
| `btn_bg` | `asw::Color` | medium gray | Button background |
| `btn_hover` | `asw::Color` | lighter gray | Button hover color |
| `btn_pressed` | `asw::Color` | even lighter | Button pressed color |
| `btn_focus_ring` | `asw::Color` | gold | Focus ring color |
| `input_bg` | `asw::Color` | very dark | Input box background |
| `padding` | `float` | `10.0` | Default padding |
| `gap` | `float` | `8.0` | Default gap between elements |
| `show_focus` | `bool` | `false` | Show focus rings |

## Context

Shared state for the UI system.

```cpp
class Context;
```

| Field | Type | Description |
|-------|------|-------------|
| `theme` | `Theme` | The current UI theme |
| `focus` | `FocusManager` | Focus navigation manager |
| `pointer_capture` | `Widget*` | Widget that has captured pointer input |
| `hover` | `Widget*` | Widget currently being hovered |
| `pointer_down` | `bool` | Whether the pointer is currently down |
| `need_focus_rebuild` | `bool` | Whether the focus list needs rebuilding |

## FocusManager

Manages keyboard and directional focus navigation.

```cpp
class FocusManager;
```

| Method | Description |
|--------|-------------|
| `rebuild(Context& ctx, Widget& root)` | Rebuild the focusable widget list from the tree |
| `focused()` | Get the currently focused widget (or `nullptr`) |
| `set_focus(Context& ctx, Widget* w)` | Set focus to a specific widget |
| `focus_next(Context& ctx)` | Move focus to the next widget |
| `focus_prev(Context& ctx)` | Move focus to the previous widget |
| `focus_dir(Context& ctx, int dx, int dy)` | Move focus in a 2D direction |

## Root

Top-level manager that owns the UI tree, dispatches input, and renders.

```cpp
class Root;
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `ctx` | `Context` | The UI context |
| `root` | `Panel` | The root panel widget |

### Methods

| Method | Description |
|--------|-------------|
| `set_size(float w, float h)` | Set the size of the root panel |
| `hit_test(Widget& w, const Vec2<float>& pos)` | Find the deepest widget at a position |
| `dispatch_pointer(const UIEvent& e)` | Route a pointer event to the appropriate widget |
| `dispatch_to_focused(const UIEvent& e)` | Dispatch an event to the focused widget |
| `update()` | Process input and dispatch UI events |
| `draw()` | Draw the UI tree |

## Widgets

### Panel

A container widget with an optional background color or image.

```cpp
class Panel : public Widget;
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bg` | `asw::Color` | transparent | Background color |
| `bg_image` | `asw::Texture` | `nullptr` | Background image texture |

### VBox

A vertical box layout container that arranges children top-to-bottom.

```cpp
class VBox : public Widget;
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `gap` | `float` | `8.0` | Gap between child elements |
| `padding` | `float` | `10.0` | Padding around the content |

### Label

A non-focusable text display widget.

```cpp
class Label : public Widget;
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `font` | `asw::Font` | | Font for rendering |
| `text` | `std::string` | | Text to display |
| `justify` | `asw::TextJustify` | `Left` | Text justification |
| `color` | `asw::Color` | | Text color |

### Button

An interactive button widget (focusable).

```cpp
class Button : public Widget;
```

| Field | Type | Description |
|-------|------|-------------|
| `on_click` | `std::function<void()>` | Callback invoked on click |
| `font` | `asw::Font` | Font for the button text |
| `text` | `std::string` | Button label text |

### InputBox

A text input widget (focusable).

```cpp
class InputBox : public Widget;
```

| Field | Type | Description |
|-------|------|-------------|
| `on_change` | `std::function<void(const std::string&)>` | Callback invoked when the value changes |
| `font` | `asw::Font` | Font for the input text |
| `value` | `std::string` | Current text value |
| `placeholder` | `std::string` | Placeholder text shown when empty |

## Example

```cpp
#include <asw/asw.h>
#include <asw/modules/ui/ui.h>

asw::core::init(640, 480, 2);
auto font = asw::assets::load_font("font.ttf", 16);

asw::ui::Root ui;
ui.set_size(640, 480);

// Customize theme
ui.ctx.theme.btn_bg = {60, 60, 80, 255};
ui.ctx.theme.padding = 12.0f;

// Build widget tree
auto& layout = ui.root.add_child<asw::ui::VBox>();
layout.transform = {10, 10, 300, 400};

auto& title = layout.add_child<asw::ui::Label>();
title.font = font;
title.text = "Settings";
title.color = asw::color::white;

auto& btn = layout.add_child<asw::ui::Button>();
btn.font = font;
btn.text = "Start Game";
btn.on_click = []() {
  // handle click
};

auto& input = layout.add_child<asw::ui::InputBox>();
input.font = font;
input.placeholder = "Enter name...";
input.on_change = [](const std::string& value) {
  // handle text change
};

// In game loop
while (!asw::core::exit) {
  asw::core::update();
  ui.update();

  asw::display::clear();
  ui.draw();
  asw::display::present();
}
```
