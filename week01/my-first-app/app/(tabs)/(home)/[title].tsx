import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "react-native";
import { ButtonText, Button as GlueButton } from "@/components/ui/button"; 

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
            <Image
                size="2xl"
                source={{uri: wikipediaLink}}
                alt="image of painting"
                className="self-center"
            />
            <Heading size="xl" className="self-center">{name}</Heading>
            <Text className="self-center" size="xl">{artist}, {year}</Text>
            <GlueButton>
                <ButtonText>Add To Favorites</ButtonText>
            </GlueButton>
            <Button title="Go Back" onPress={() => router.back()}/>
        </Box>
    )
}