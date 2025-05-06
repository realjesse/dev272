import React from 'react';
import { Image } from '@/components/ui/image';
import { Link, LinkText } from './ui/link';
import { useRouter } from 'expo-router';
import { Pressable } from './ui/pressable';
import { FavouriteIcon, Icon } from './ui/icon/index';
import { Painting, usePaintingContext } from './ui/painting-contex-provider';
import { Card } from './ui/card';
import { Text } from '@/components/ui/text';


const PaintingCard: React.FC<Painting> = ({ name, artist, year, wikipediaLink, id, isFavorite }: Painting) => {
  const { toggleFavorite } = usePaintingContext();

      const router = useRouter();

      const handleLinkPress = () => {
        router.push({
            pathname: '/(tabs)/(home)/[title]',
            params: { 
              title: id,
              wikipediaLink: wikipediaLink,
              name: name,
              artist: artist,
              year: year,
            },
        });
      };

    return (
      <>
        <Card variant="filled" className="mt-4 items-center">
          <Image 
              source={{uri: wikipediaLink}}
              size='2xl'
              alt='image of painting'
          />
          <Text>{name}</Text>
          <Text>{artist}, {year}</Text>
          <Link
              onPress={handleLinkPress}
          >
              <LinkText>See Details</LinkText>
          </Link>
          <Pressable
            onPress={() => toggleFavorite(id)}
          >
            <Icon
              as={FavouriteIcon}
              size="xl"
              className={`${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
            />
          </Pressable>
        </Card>
      </>
    );
};

export default PaintingCard;