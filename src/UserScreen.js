import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UsersStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={UserScreen} />
      <Stack.Screen
        options={({route}) => ({title: route.params.title})}
        name="UserDetail"
        component={UserDetailScreen}
      />
    </Stack.Navigator>
  );
};

const UserScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const goToDetail = (id, name) => {
    navigation.navigate('UserDetail', {userId: id, title: name});
  };

  const renderUserItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => goToDetail(item.id, item.name)}>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 12}}>
          {item.name}
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
          <FlatList data={users} renderItem={renderUserItem}></FlatList>
        </SafeAreaView>
      )}
    </>
  );
};

const UserDetailScreen = ({route, navigation}) => {
  const {userId} = route.params;

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/' + userId)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  return (
    <>
      {loading == true ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <>
          <Text style={{fontSize: 20, padding: 12}}>
            ID: {user.id} {'\n'}Name: {user.name} {'\n'}Username:{' '}
            {user.username} {'\n'}Email: {user.email} {'\n'}Website:{' '}
            {user.website}
          </Text>
        </>
      )}
    </>
  );
};

export default UsersStackScreen;
