import {Text, FlatList, ActivityIndicator, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ToDoStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="To Do List" component={ToDoListScreen} />
    </Stack.Navigator>
  );
};

export default ToDoStackScreen;

const ToDoListScreen = ({navigation}) => {
  const [todo, setToDo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getToDo();
    setLoading(false);
  }, []);

  const getToDo = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then(result => {
      setToDo(result.data);
    });
  };

  const renderToDoItem = ({item}) => {
    return (
      <Text style={{fontSize: 20, fontWeight: 'bold', padding: 12}}>
        {item.title}
      </Text>
    );
  };

  return (
    <>
      {loading == true ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <SafeAreaView>
          <FlatList data={todo} renderItem={renderToDoItem} />
        </SafeAreaView>
      )}
    </>
  );
};
