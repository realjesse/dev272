import { Image, StyleSheet, Platform, View, Text, TextInput, Button, ScrollView, FlatList } from 'react-native';

// Russian Peredvizhniki art movement list
const russianPeredvizhnikiList = [
  {
    name: "Portrait of an Unknown Woman",
    artist: "Ivan Kramskoi",
    year: 1883,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Kramskoy_Portrait_of_a_Woman.jpg/1024px-Kramskoy_Portrait_of_a_Woman.jpg",
  },
];

// English Victorian art movement list
const englishVictorianList = [
  {
    name: "A Private View at the Royal Academy",
    artist: "William Powell Frith",
    year: 1883,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Frith_A_Private_View.jpg/1280px-Frith_A_Private_View.jpg",
  },
]

// American Hudson River School art movement list
const americanHudsonRiverSchoolList = [
  {
    name: "The Oxbow",
    artist: "Thomas Cole",
    year: 1836,
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Cole_Thomas_The_Oxbow_%28The_Connecticut_River_near_Northampton_1836%29.jpg/1024px-Cole_Thomas_The_Oxbow_%28The_Connecticut_River_near_Northampton_1836%29.jpg",
  },
]

// Item used for all items produced by FlatList on homepage
// Depicts an image, with name of artwork below, then below that artists and year produced
const Item = ({item}: {item: {name: string, artist: string, year: number, link: string}}) => (
  <View>
    <Image
      source={{uri: item.link}}
      style={styles.image}
    />
    <Text>{item.name}</Text>
    <Text>{item.artist}, {item.year}</Text>
  </View>
)

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
        <View>
          <FlatList
            data={russianPeredvizhnikiList}
            renderItem={({item}) => <Item item={item}/>}
          />
        </View>
        <View>
          <FlatList
            data={englishVictorianList}
            renderItem={({item}) => <Item item={item}/>}
          />
        </View>
        <View>
          <FlatList
            data={americanHudsonRiverSchoolList}
            renderItem={({item}) => <Item item={item}/>}
          />
        </View>
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
  },

  image: {
    width: 100,
    height: 100
  }
});
