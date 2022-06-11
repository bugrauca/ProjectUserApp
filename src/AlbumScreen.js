import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from '@rneui/themed';

const Stack = createNativeStackNavigator();

const AlbumsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Album List" component={AlbumListScreen} />
      <Stack.Screen
        options={({route}) => ({title: route.params.title})}
        name="Photo"
        component={PhotoScreen}
      />
    </Stack.Navigator>
  );
};

export default AlbumsStackScreen;

const AlbumListScreen = ({navigation}) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlbums();
    setLoading(false);
  }, []);

  const getAlbums = () => {
    axios.get('https://jsonplaceholder.typicode.com/albums').then(result => {
      setAlbums(result.data);
    });
  };

  const goToDetail = (id, title) => {
    navigation.navigate('Photo', {id: id, title: title});
  };

  const renderAlbumItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => goToDetail(item.id, item.title)}>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 12}}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loading == true ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <SafeAreaView>
          <FlatList data={albums} renderItem={renderAlbumItem} />
        </SafeAreaView>
      )}
    </>
  );
};

const PhotoScreen = ({route, navigation}) => {
  const {id} = route.params;

  const [photo, setPhoto] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos/' + id)
      .then(res => res.json())
      .then(data => {
        setPhoto(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading == true ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View style={{flex: 1, padding: 12}}>
          <Text style={{fontSize: 20}}>
            Album ID: {photo.albumId} {'\n'}
          </Text>
          <Text style={{fontSize: 20}}>
            ID: {photo.id} {'\n'}
          </Text>
          <Text style={{fontSize: 20}}>
            Title: {photo.title} {'\n'}
          </Text>
          <Text style={{fontSize: 20}}>Photo URL: {photo.url}</Text>
          <FlatList
            data={[...new Array(1)].map((_, i) => i.toString())}
            style={styles.list}
            numColumns={2}
            keyExtractor={e => e}
            renderItem={({item}) => (
              <Image
                source={{uri: photo.url}}
                containerStyle={styles.item}
                PlaceholderContent={<ActivityIndicator />}
              />
            )}
          />
          <Text style={{fontSize: 20}}>
            Thumbnail URL: {photo.thumbnailUrl}
          </Text>
          <FlatList
            data={[...new Array(1)].map((_, i) => i.toString())}
            style={styles.list}
            numColumns={2}
            keyExtractor={e => e}
            renderItem={({item}) => (
              <Image
                source={{uri: photo.thumbnailUrl}}
                containerStyle={styles.item}
                PlaceholderContent={<ActivityIndicator />}
              />
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 2,
    width: '100%',
    flex: 1,
  },
});
