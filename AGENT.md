# ESPCompose Demo

## Overview

An ESPCompose project that builds a touch-screen dashboard for an ESP32-P4 device using a JSX-based component model. ESPCompose transpiles TSX components into ESPHome YAML configuration.

## Tech Stack

- **Language**: TypeScript + JSX/TSX
- **Framework**: ESPCompose (`@espcompose/core`, `@espcompose/ui`)
- **Package Manager**: pnpm
- **Linting**: ESLint with `@espcompose/eslint` recommended config
- **Target**: ESP32-P4 (Waveshare ESP32-P4 WiFi6 Touch LCD 10.1")

## Required Reading

Before making changes, read these skill files directly (do not use file search — they are in `node_modules` which is gitignored):

- `node_modules/@espcompose/core/skills/espcompose.md` — Core framework reference
- `node_modules/@espcompose/core/skills/espcompose-styling.md` — Styling reference

## Project Structure

- `src/index.tsx` — App entry point; composes WiFi, API, OTA, logging, hardware, and UI into an `<esphome>` root element
- `src/ui.tsx` — Touch-screen UI built with `@espcompose/ui` layout and control components (Screens, Cards, Buttons, LightSliders, etc.)
- `src/hardware.tsx` — Board-specific hardware configuration encapsulated in a single component (display, touch, audio, I2C, backlight)
- `src/assets/` — Static assets (images) referenced via `useImage()`

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm build` | Transpile TSX to ESPHome YAML (`espcompose transpile`) |
| `pnpm flash` | Build and flash to device (`espcompose run`) |
| `pnpm lint` | Run ESLint |
| `pnpm clean` | Remove `.espcompose` and `.espcompose-build` directories |

## Conventions

- **Component pattern**: Hardware configs are self-contained components that accept refs as props (e.g., `<Waveshare_... display={display} />`). Keep hardware details out of application logic.
- **Refs**: Use `useRef<T>()` from `@espcompose/core` to create typed refs for cross-component wiring (displays, I2C buses, audio buses, etc.).
- **Home Assistant bindings**: Use `useHAEntity('entity.id')` to bind UI controls to HA entities.
- **Secrets**: Load sensitive values from `.env` via `dotenv` and wrap with `secret()` — never inline credentials.
- **Theming**: Use `ThemeProvider` with `darkTheme`/`lightTheme` from `@espcompose/ui`. Switch at runtime via `theme.select()`.
- **Images**: Load with `useImage()` specifying file path, type, resize, and byte order.
- **Export**: The entry point default-exports a rendered JSX element (`export default <App />`).

## Environment

Requires a `.env` file in the project root with:

```
WIFI_SSID=
WIFI_PASSWORD=
AP_ENCRYPTION=
OTA_PASSWORD=
```

Do not commit `.env` to version control.