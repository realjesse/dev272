import { Image, StyleSheet, Platform, View, Text, TextInput, Button, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Box } from '@/components/ui/box';
import { Input, InputField } from '@/components/ui/input';
import { Heading } from '@/components/ui/heading';
import { Link, LinkText } from '@/components/ui/link';
import { router } from 'expo-router';
import PaintingCard from '@/components/PaintingCard'
import { usePaintingContext } from '@/components/ui/painting-contex-provider';

export default function HomeScreen() {

  // useStates for the text query and data list
  const { paintings } = usePaintingContext();
  const [query, setQuery] = useState('');
  const [filteredArtList, setFilteredArtList] = useState(paintings);

  // Handles text query, if text is included in either the name, artist, or year
  // then the rendered list will update with proper items.  This will update with
  // each keystroke.
  const handleTextQuery = (text: string) => {
    setQuery(text);

    // Filter whole list to find item by the name, artist, or year
    const filtered = paintings.filter((item) => 
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.artist.toLowerCase().includes(text.toLowerCase()) ||
      item.year === Number(text)
    );

    // Update rendered list with filtered data
    setFilteredArtList(filtered);
  }

  // View favorite changes
  useEffect(() => {
    if (query === '') {
      setFilteredArtList(paintings);
    } else {
      const filtered = paintings.filter((item) => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArtList(filtered);
    }
  }, [paintings])

  return (
    <Box className='flex-1 p-4 bg-white dark:bg-zinc-900'>
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
        renderItem={({item}) => (<PaintingCard{...item}/>)}
      />
    </Box>
  );
}