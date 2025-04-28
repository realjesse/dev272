import { Image, StyleSheet, Platform, View, Text, TextInput, Button, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Heading } from '@/components/ui/heading';
import { Link, LinkText } from '@/components/ui/link';
import { router } from 'expo-router';
import paintingsList from '../../../data/paintings.json'
import Card from '@/components/card'

export default function HomeScreen() {

  // useStates for the text query and data list
  const [query, setQuery] = useState('');
  const [filteredArtList, setFilteredArtList] = useState(paintingsList);

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

  return (
    <Box className='flex-1 p-4'>
      <Heading size='xl' className='self-center'>Search For A Painting!</Heading>
      <Input variant='outline' size='lg' className='bg-white dark:bg-zinc-900 mt-2'>
        <InputField
          placeholder="Search by painting, artist, or year"
          value={query}
          onChangeText={handleTextQuery}
        />
      </Input>
      <FlatList
        data={filteredArtList}
        renderItem={({item}) => (<Card{...item}/>)}
      />
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
