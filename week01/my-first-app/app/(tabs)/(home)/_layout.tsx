import { ThemeContext } from "@/app/_layout";
import { Icon, MoonIcon, SunIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Stack, useRouter } from "expo-router";
import { useContext } from "react";

export default function HomeLayout() {
    const router = useRouter();
    const { colorMode, toggleColorMode } = useContext(ThemeContext);

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerRight: () => (
                    <Pressable
                        onPress={toggleColorMode}
                    >
                        <Icon
                            as={colorMode === 'light' ? MoonIcon : SunIcon}
                            size='xl'
                        />
                    </Pressable>
                )
            }}>
                <Stack.Screen name="index" options={{ title: "Home"}} />
                <Stack.Screen name="[title]" options={{ title: "Details"}} />
        </Stack>
    )
}