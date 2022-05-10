import React from 'react';
import {FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';

export class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      }).catch;
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  render() {
    let {container} = styles;
    let {dataSource} = this.state;
    return (
      <SafeAreaView style={container}>
        <FlatList
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  item: {
    padding: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#bbb',
  },
});
