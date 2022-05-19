import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const UsersStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User List" component={UserScreen} />
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
          <FlatList data={users} renderItem={renderUserItem} />
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
        <View style={{flex: 1, padding: 12}}>
          <ScrollView>
            <Text style={{fontSize: 20}}>
              ID: {user.id} {'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              Full Name: {user.name + ' ' + user.username} {'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              Email: {user.email} {'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              Address: {'\n'}
              {'\tStreet: '}
              {user.address.street}
              {'\n'}
              {'\tSuite: '}
              {user.address.suite}
              {'\n'}
              {'\tCity: '}
              {user.address.city}
              {'\n'}
              {'\tZip Code: '}
              {user.address.zipcode}
              {'\n'}
              {'\tGeo: '}({user.address.geo.lat}, {user.address.geo.lng}){'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              Phone: {user.phone} {'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              Website: {user.website} {'\n'}
            </Text>
            <Text style={{fontSize: 20}}>
              Company: {'\n'}
              {'\tName: '}
              {user.company.name}
              {'\n'}
              {'\tCatchphrase: '}
              {user.company.catchPhrase}
              {'\n'}
              {'\tBS: '}
              {user.company.bs}
              {'\n'}
            </Text>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default UsersStackScreen;
