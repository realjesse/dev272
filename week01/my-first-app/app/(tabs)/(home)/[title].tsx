import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Button, SafeAreaView } from "react-native";
import { ButtonText, Button as GlueButton } from "@/components/ui/button"; 
import { VStack } from "@/components/ui/vstack";

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
        <SafeAreaView className='flex-1 bg-white dark:bg-zinc-700'>
            <Box className="p-4 m-4 dark:bg-[#151718] bg-white max-h-screen-safe items-center rounded-md">
                <Stack.Screen
                    options={{
                        title: name,
                    }}
                />
                <VStack space="md" className="mt-4">
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
                </VStack>
            </Box>
        </SafeAreaView>
    )
}