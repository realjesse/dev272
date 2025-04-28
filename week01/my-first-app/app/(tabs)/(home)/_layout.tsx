import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: {backgroundColor: 'transparent'},
            }}>
                <Stack.Screen name="index" options={{ title: "Home"}} />
                <Stack.Screen name="[title]" options={{ title: "Details"}} />
        </Stack>
    )
}