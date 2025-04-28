import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Link, LinkText } from './ui/link';
import { useRouter } from 'expo-router';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface CardProps {
    name: string;
    artist: string;
    year: number;
    wikipediaLink: string;
    internalLink: string;
}

const Card: React.FC<CardProps> = ({ name, artist, year, wikipediaLink, internalLink }) => {
      const backgroundColor = useThemeColor({}, 'background');
      const color = useThemeColor({}, 'text');

      const router = useRouter();

      const handleLinkPress = () => {
        router.push({
            pathname: '/(tabs)/(home)/[title]',
            params: { title: internalLink },
        })
      }

    return (
        <ThemedView>
            <Image 
                source={{uri: wikipediaLink}}
            />
            <ThemedText>{name}</ThemedText>
            <ThemedText>{artist}</ThemedText>
            <Link
                onPress={handleLinkPress}
            >
                <LinkText>See Details</LinkText>
            </Link>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
    
      input: {
        height: 45,
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
      },
    
      textEntryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
      },
    
      image: {
        width: 300,
        height: 300,
      },
    
      item: {
        alignItems: 'center',
      }
});

export default Card;