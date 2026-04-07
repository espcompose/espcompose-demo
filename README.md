# ESPCompose Demo

A demo project showing how to use [ESPCompose](https://espcompose.com) to build a touch-screen dashboard for an ESP32 device using a JSX-based component model.

## What This Demonstrates

### Dashboard Construction

The entry point ([src/index.tsx](src/index.tsx)) defines an `<App />` component that composes the full device configuration — WiFi, API, OTA, logging, hardware, and UI — into a single declarative tree under an `<esphome>` root element.

### Design Library (`@espcompose/ui`)

The UI ([src/ui.tsx](src/ui.tsx)) is built entirely with components from `@espcompose/ui`:

- **Layout** — `VStack`, `HStack`, `Screen`, `Card`, `Space`
- **Controls** — `Button`, `LightSlider`, `LightSwitch`, `LightButton`
- **Data** — `SensorText`, `Text`, `Image`, `Spinner`
- **Theming** — `ThemeProvider` with `darkTheme` / `lightTheme`, switchable at runtime via `theme.select()`

Home Assistant entities are bound to controls with `useHAEntity()`, enabling real-time state and control.

### Boot Screen

The UI defines two `<Screen>` elements inside a `<ThemeProvider>`. The first screen (marked `skip`) acts as a boot/splash screen displaying a logo and a spinner while the device connects to Home Assistant. Once the API client connects (`onClientConnected`), `lvgl.pageNext()` navigates to the main dashboard.

### Componentized Hardware Configuration

All board-specific setup — ESP32-P4 config, PSRAM, I2C, display (MIPI DSI), touchscreen, backlight, audio (I2S + ES8311 DAC / ES7210 ADC), microphone, and speaker — is encapsulated in the `Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1` component in [src/hardware.tsx](src/hardware.tsx). The main app simply renders it and passes a `display` ref:

```tsx
<Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1 display={display} />
```

This pattern keeps hardware details out of your application logic and makes it easy to swap or reuse board definitions.

### Secrets Management

Sensitive values (WiFi credentials, API encryption key, OTA password) are loaded from environment variables via `dotenv` and wrapped with the `secret()` helper so they are never inlined into the generated configuration:

```tsx
import 'dotenv/config';

<wifi ssid={secret(process.env.WIFI_SSID!)} password={secret(process.env.WIFI_PASSWORD!)} />
```

Create a `.env` file in the project root:

```env
WIFI_SSID=MyNetwork
WIFI_PASSWORD=hunter2
AP_ENCRYPTION=base64-encoded-key
OTA_PASSWORD=a-secure-password
```

> **Do not commit `.env` to version control.**

## Getting Started

### Prerequisites

- [ESPHome](https://esphome.io/) (2026.3.0+)
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (recommended, but npm/yarn work too)

### Install Dependencies

```bash
pnpm install
```

### Configure Secrets

Copy the example below into a `.env` file at the project root and fill in your values:

```env
WIFI_SSID=
WIFI_PASSWORD=
AP_ENCRYPTION=
OTA_PASSWORD=
```

### Build

Transpile the TSX project into ESPHome YAML:

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Flash

Build and flash to a connected device:

```bash
pnpm flash
```

## Project Structure

```
src/
  index.tsx       # App entry point — composes hardware + UI
  hardware.tsx    # Board-specific component (Waveshare ESP32-P4 10.1")
  ui.tsx          # Dashboard UI built with @espcompose/ui
  assets/         # Images (logo, button graphic)
```

## License

See [LICENSE](LICENSE).
