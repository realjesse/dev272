import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "react-native";

export default function DetailsScreen() {
    const router = useRouter();
    const { title } = useLocalSearchParams<{title: string}>()

    return (
        <Box className="flex-1 p-4">
            <Heading size="xl" className="self-center">Dynamic Page: {title}</Heading>
            <Button title="Go Back" onPress={() => router.back()}/>
        </Box>
    )
}