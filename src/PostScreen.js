import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const PostsStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Post List" component={PostScreen} />
      <Stack.Screen
        options={({route}) => ({title: route.params.title})}
        name="PostDetail"
        component={PostDetailScreen}
      />
    </Stack.Navigator>
  );
};

const PostScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const goToDetail = (id, title) => {
    navigation.navigate('PostDetail', {userId: id, title: title});
  };

  const renderPostItem = ({item}) => {
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
          <FlatList
            data={posts}
            renderItem={renderPostItem}
            initialNumToRender={20}
          />
        </SafeAreaView>
      )}
    </>
  );
};

const PostDetailScreen = ({route, navigation}) => {
  const {userId} = route.params;

  const [post, setPost] = useState({});
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + userId)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + userId + '/comments')
      .then(res => res.json())
      .then(data => {
        setComment(data);
        setLoading(false);
      });
  }, [userId]);

  const renderCommentItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 6}}>
          Comment {item.id}:
        </Text>
        <Text style={{fontSize: 20, padding: 6}}>
          Name: {item.name} {'\n'}
          {'\n'}Email: {item.email} {'\n'}
          {'\n'}Body: {item.body}
        </Text>
      </View>
    );
  };

  return (
    <>
      {loading == true ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View style={{flex: 1, padding: 12}}>
          <Text style={{fontSize: 20}}>
            User ID: {post.userId} {'\n'}
          </Text>
          <Text style={{fontSize: 20}}>
            ID: {post.id} {'\n'}
          </Text>
          <Text style={{fontSize: 20}}>
            Title: {post.title} {'\n'}
          </Text>
          <Text style={{fontSize: 20}}>
            Body: {post.body} {'\n'}
          </Text>
          <FlatList
            data={comment}
            renderItem={renderCommentItem}
            initialNumToRender={20}
          />
        </View>
      )}
    </>
  );
};

export default PostsStackScreen;
