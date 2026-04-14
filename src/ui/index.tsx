import { DisplayRef, LvglComponentRef, Ref, useHAEntity, useRef } from "@espcompose/core";
import { ThemeProvider, darkTheme, lightTheme } from "@espcompose/ui";
import { BootScreen } from "./BootScreen";
import { KitchenScreen } from "./KitchenScreen";
import { MainScreen } from "./MainScreen";

type UIProps = {
    display: Ref<DisplayRef>;
    lvgl: Ref<LvglComponentRef>;
};

export const UI = ({ display, lvgl }: UIProps) => {
    const officeLight = useHAEntity("light.office");
    const gymLight = useHAEntity("light.gym");
    const hockeyLight = useHAEntity("light.air_hockey_light");
    const kitchenLight = useHAEntity("light.kitchen_floods");
    const mainScreen = useRef();

    return (
        <lvgl
            ref={lvgl}
            byteOrder="little_endian"
            bufferSize="100%"
            drawRounding={2}
            displays={[display]}
        >
            <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }}>
                
                <BootScreen 
                    logoPath="./assets/logo.png" 
                />
                
                <MainScreen
                    ref={mainScreen}
                    officeLight={officeLight}
                    gymLight={gymLight}
                    hockeyLight={hockeyLight}
                />
                
                <KitchenScreen 
                    kitchenLight={kitchenLight} 
                    mainScreen={mainScreen} 
                />
            
            </ThemeProvider>
        </lvgl>
    );
};