import 'dotenv/config';
import { delay, DisplayRef, LvglComponentRef, secret, useRef } from '@espcompose/core';
import { UI } from './ui';
import { Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1 } from './hardware';

function App() {
  const display = useRef<DisplayRef>();
  const lvgl = useRef<LvglComponentRef>();

  return (
    <esphome
      name="espcompose-demo"
      comment="An ESPHome Compose device"
    >
      <wifi ssid={secret(process.env.WIFI_SSID!)} password={secret(process.env.WIFI_PASSWORD!)} />

      <api
        encryption={{
          key: secret(process.env.AP_ENCRYPTION!)
        }}
        onClientConnected={async () => {
          await delay(2000);
          lvgl.pageNext();
        }}
      />

      <ota
        platform="esphome"
        password={secret(process.env.OTA_PASSWORD!)}
      />

      <logger level="DEBUG" hardwareUart="UART0" />

      <Waveshare_ESP32P4_WIFI6_Touch_LCD_10_1 display={display} />
      <UI display={display} lvgl={lvgl} />

    </esphome>
  );
}

export default <App />;
