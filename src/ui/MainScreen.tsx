import { createWidgetComponent, LightBinding, theme, useLvgl } from "@espcompose/core";
import {
    Button,
    Card,
    HStack,
    LightButton,
    LightSlider,
    LightSwitch,
    Screen,
    SensorText,
    Text,
    VStack,
} from "@espcompose/ui";

type MainScreenProps = {
    officeLight: LightBinding;
    gymLight: LightBinding;
    hockeyLight: LightBinding;
};

export const MainScreen = createWidgetComponent(
    ({ officeLight, gymLight, hockeyLight }: MainScreenProps) => {
        const lvgl = useLvgl();
        return (<Screen>
            <VStack>
                <Text variant="title" text="Theme Demo" />

                <Card>
                    <LightSlider
                        binding={officeLight}
                        label="Brightness"
                        min={0}
                        max={255}
                    />

                    <LightSwitch binding={officeLight} label="Power" />
                </Card>

                <Card>
                    <HStack>
                        <SensorText binding={officeLight} label="Office" style={{ minWidth: 120 }} />
                        <Button
                            size="lg"
                            text={officeLight.isOn ? "Office On" : "Office Off"}
                            onPress={() => { officeLight.toggle(); }}
                        />

                        <LightButton binding={officeLight} label="Office" size="sm" />

                        <LightButton binding={officeLight} label="Office" />
                        <LightButton binding={gymLight} label="Gym" />
                        <LightButton binding={hockeyLight} label="Hockey" />
                    </HStack>
                </Card>

                <HStack>
                    <Button text="Dark Theme" status="primary" onPress={() => { theme.select("dark"); }} />
                    <Button text="Light Theme" status="secondary" onPress={() => { theme.select("light"); }} />
                </HStack>

                <Button text="Kitchen" onPress={() => { lvgl.pageNext(); }} />

                <ec-canvas style={{ width: 280, height: 120, display: "flex", flexDirection: "column" }}>
                    <ec-canvas-background>
                        <ec-rect x={0} y={0} width={280} height={120} fill="#0000f5" radius={12} />
                        <ec-line x1={16} y1={80} x2={264} y2={80} stroke="#e70909" strokeWidth={1} />
                    </ec-canvas-background>
                    <ec-canvas-content>
                        <lvgl-label text="Canvas Card" />
                        <Button text="Boo!" />
                    </ec-canvas-content>
                </ec-canvas>
            </VStack>
        </Screen>
    )
});