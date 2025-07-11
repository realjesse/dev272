import React from "react";
import { Image } from "@/components/ui/image";
import { Link, LinkText } from "./ui/link";
import { useRouter } from "expo-router";
import { Painting, usePaintingContext } from "./ui/painting-contex-provider";
import { Card } from "./ui/card";
import { Text } from "@/components/ui/text";
import FavoriteButton from "./FavoriteButton";

const PaintingCard: React.FC<Painting> = ({
  name,
  artist,
  year,
  wikipediaLink,
  id,
  isFavorite,
}: Painting) => {
  const { toggleFavorite } = usePaintingContext();

  const router = useRouter();

  const handleLinkPress = () => {
    router.push({
      pathname: "/(tabs)/(home)/[title]",
      params: { title: id },
    });
  };

  return (
    <>
      <Card variant="filled" className="mt-4 items-center">
        <Image
          // if wikipediaLink is null then will display an image of a dog
          source={{
            uri:
              wikipediaLink ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Shiba_inu_taiki.jpg/800px-Shiba_inu_taiki.jpg",
          }}
          size="2xl"
          alt="image of painting"
        />
        <Text className="text-lg my-1 dark:text-white">{name}</Text>
        <Text className="text-lg my-1 dark:text-white">
          {artist}, {year}
        </Text>
        <Link onPress={handleLinkPress}>
          <LinkText className="text-blue-500 text-lg no-underline">
            See Details
          </LinkText>
        </Link>
        <FavoriteButton
          isFavorite={isFavorite}
          handleFavoriteToggle={() => toggleFavorite(id)}
        />
      </Card>
    </>
  );
};

export default PaintingCard;
