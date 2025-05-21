import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Stack, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { usePaintingContext } from "@/components/ui/painting-contex-provider";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";

export default function DetailsScreen() {
    const router = useRouter();
    const { title: id } = useLocalSearchParams<{title: string}>()
    const { paintings, deletePainting } = usePaintingContext();
    const painting = paintings.find((item) => item.id === id);
    const {
        name,
        artist,
        year,
        wikipediaLink
    } = painting || {};

    const handleDelete = () => {
        if (painting) {
            deletePainting(painting.id)
            router.back();
        }
    };

    const handleEdit = () => {
        router.push({
            pathname: '/add-painting',
            params: { id },
        })
    };

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
                </VStack>
                <HStack space="md" className="mt-4"> 
                    <Button 
                        size="lg" 
                        action="negative"
                        onPress={handleDelete}
                        >
                        <ButtonIcon as={TrashIcon} />
                        <ButtonText>Delete</ButtonText>
                    </Button>
                    <Button 
                        size="lg" 
                        action="positive"
                        onPress={handleEdit}
                        >
                        <ButtonIcon as={EditIcon} />
                        <ButtonText>Edit</ButtonText>
                    </Button>
                </HStack>
            </Box>
        </SafeAreaView>
    )
}