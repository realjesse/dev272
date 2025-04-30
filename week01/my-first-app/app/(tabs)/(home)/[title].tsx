import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "react-native";

export default function DetailsScreen() {
    const router = useRouter();
    const { internalLink, wikipediaLink, name, artist, year } = useLocalSearchParams<{
        internalLink: string;
        wikipediaLink: string;
        name: string;
        artist: string;
        year: string;
    }>()

    return (
        <Box className="flex-1 p-4">
            <Heading size="xl" className="self-center">{name}</Heading>
            <Button title="Go Back" onPress={() => router.back()}/>
        </Box>
    )
}