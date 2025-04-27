import { Image, StyleSheet, Platform, View, Text, TextInput, Button, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';

// Complete art list
const artList = [
  {
    name: "Portrait of an Unknown Woman",
    artist: "Ivan Kramskoi",
    year: 1883,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Kramskoy_Portrait_of_a_Woman.jpg/1024px-Kramskoy_Portrait_of_a_Woman.jpg",
  },

  {
    name: "Girl with Peaches",
    artist: "Valentin Serov",
    year: 1887,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Serov_devochka_s_persikami.jpg/800px-Serov_devochka_s_persikami.jpg",
  },

  {
    name: "Barge Haulers on the Volga",
    artist: "Ilya Repin",
    year: 1873,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Ilia_Efimovich_Repin_%281844-1930%29_-_Volga_Boatmen_%281870-1873%29.jpg/1920px-Ilia_Efimovich_Repin_%281844-1930%29_-_Volga_Boatmen_%281870-1873%29.jpg",
  },

  {
    name: "A Private View at the Royal Academy",
    artist: "William Powell Frith",
    year: 1883,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Frith_A_Private_View.jpg/1280px-Frith_A_Private_View.jpg",
  },

  {
    name: "Saved",
    artist: "Edwin Landseer",
    year: 1856,
    link: "https://upload.wikimedia.org/wikipedia/commons/d/da/Landseer_Saved.jpg",
  },

  {
    name: "The Roses of Heliogabalus",
    artist: "Lawrence Alma-Tadema",
    year: 1888,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/The_Roses_of_Heliogabalus.jpg/1280px-The_Roses_of_Heliogabalus.jpg",
  },

  {
    name: "The Oxbow",
    artist: "Thomas Cole",
    year: 1836,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Cole_Thomas_The_Oxbow_%28The_Connecticut_River_near_Northampton_1836%29.jpg/1024px-Cole_Thomas_The_Oxbow_%28The_Connecticut_River_near_Northampton_1836%29.jpg",
  },

  {
    name: "Niagara Falls",
    artist: "Frederic Edwin Church",
    year: 1857,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Frederic_Edwin_Church_-_Niagara_Falls_-_WGA04867.jpg/1920px-Frederic_Edwin_Church_-_Niagara_Falls_-_WGA04867.jpg",
  },

  {
    name: "Among the Sierra Nevada, California",
    artist: "Albert Bierstadt",
    year: 1868,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Albert_Bierstadt_-_Among_the_Sierra_Nevada%2C_California_-_Google_Art_Project.jpg/1280px-Albert_Bierstadt_-_Among_the_Sierra_Nevada%2C_California_-_Google_Art_Project.jpg",
  },
];

export default function HomeScreen() {

  // useStates for the text query and data list
  const [query, setQuery] = useState('');
  const [filteredArtList, setFilteredArtList] = useState(artList);

  // Handles text query, if text is included in either the name, artist, or year
  // then the rendered list will update with proper items.  This will update with
  // each keystroke.
  const handleTextQuery = (text: string) => {
    setQuery(text);

    // Filter whole list to find item by the name, artist, or year
    const filtered = artList.filter((item) => 
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.artist.toLowerCase().includes(text.toLowerCase()) ||
      item.year === Number(text)
    );

    // Update rendered list with filtered data
    setFilteredArtList(filtered);
  }

  // Item used for all items produced by FlatList on homepage
  // Depicts an image, with name of artwork below, then below that artists and year produced
  const Item = ({item}: {item: {name: string, artist: string, year: number, link: string}}) => (
    <ThemedView style={styles.item}>
      <Image
        source={{uri: item.link}}
        style={styles.image}
      />
      <ThemedText>{item.name}</ThemedText>
      <ThemedText>{item.artist}, {item.year}</ThemedText>
    </ThemedView>
  )

  return (
    <Box>
      <Input>
        <InputField
          placeholder="Search by painting, artist, or year"
          value={query}
          onChangeText={handleTextQuery}
        />
      </Input>
      <ScrollView>
        <ThemedView>
          <FlatList
            data={filteredArtList}
            renderItem={({item}) => <Item item={item}/>}
          />
        </ThemedView>
      </ScrollView>
    </Box>
  );
}

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
