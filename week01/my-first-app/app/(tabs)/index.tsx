import { Image, StyleSheet, Platform, View, Text, TextInput, Button, ScrollView, FlatList } from 'react-native';

const movieList = [
  {
    name: "Oldboy",
    director: "Park Chan-wook",
    year: 2003,
    length: 120,
    rating: 8.3
  },

  {
    name: "The Count of Monte Cristo",
    director: "Kevin Reynolds",
    year: 2002,
    length: 131,
    rating: 7.7
  },

  {
    name: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
    length: 175,
    rating: 9.2
  }

  {
    name: "Kung Fu Hustle",
    director: "Stephen Chow",
    year: 2004,
    length: 99,
    rating: 7.7
  }
]

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
    margin: 10,
  }
});
