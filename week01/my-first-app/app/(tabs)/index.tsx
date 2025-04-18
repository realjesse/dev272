import { Image, StyleSheet, Platform, View, Text, TextInput, Button, ScrollView, FlatList } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textEntryContainer}>
        <TextInput style={styles.input}></TextInput>
        <Button
          title="test"
          onPress={() => console.log("button pressed")}/>
      </View>
      <ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  input: {
    height: 50,
    width: 200,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10
  },

  textEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    margin: 10
  }
});
