import { Image, Screen, Spinner, Text, VStack } from "@espcompose/ui";
import { createWidgetComponent, useImage } from "@espcompose/core";

type BootScreenProps = {
    logoPath: string;
};

export const BootScreen = createWidgetComponent(
    ({ logoPath }: BootScreenProps) => {
        const logo = useImage({ file: logoPath, type: "RGB565", resize: "150x150", byteOrder: "little_endian" });

        return (
            <Screen skip>
                <VStack align="center" crossAlign="center" style={{ height: "100%" }}>
                    <Image src={logo} />
                    <Text variant="title" text="ESPCompose" />
                    <Spinner size="lg" />
                    <Text variant="caption" text="Connecting to Home Assistant..." />
                </VStack>
            </Screen>
        );
    }
);