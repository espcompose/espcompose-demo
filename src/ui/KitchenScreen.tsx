import { createWidgetComponent, LightBinding, Ref, useLvgl } from "@espcompose/core";
import { Button, Card, LightButton, Screen, Text, VStack } from "@espcompose/ui";

type KitchenScreenProps = {
    kitchenLight: LightBinding;
    mainScreen: Ref;
};

export const KitchenScreen = createWidgetComponent(
    ({ kitchenLight, mainScreen }: KitchenScreenProps) => {
        const lvgl = useLvgl();
        return (<Screen>
            <VStack>
                <Text variant="title" text="Kitchen" />

                <Card>
                    <LightButton binding={kitchenLight} label="Kitchen" />
                </Card>

                <Button text="Back" onPress={() => { lvgl.pageShow({ id: mainScreen }); }} />
            </VStack>
        </Screen>
    )
});