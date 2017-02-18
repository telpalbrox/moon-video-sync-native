import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ListView, Button } from 'react-native';
import { Container } from 'flux/utils';
import RoomStore from '../stores/RoomStore';
import { RoomActions } from '../actions/RoomActions';
import { AuthActions } from '../actions/AuthActions';

class RoomsScene extends Component {
  static getStores() {
    return [RoomStore];
  }

  static calculateState(prevState) {
    return { rooms: RoomStore.getState() }
  }

  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    RoomActions.getAll();
  }

  render() {
    if (this.state.rooms.get('rooms')) {
      this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.rooms.get('rooms').toJS());
    }
    return (
      <View style={styles.container}>
        <Text>Rooms</Text>
        <Button title="Logout" onPress={() => this.onLogutClick()} />
        {this.state.rooms.get('error') === true ? <Text>Error</Text> : null}
        {this.state.rooms.get('error') === false ? <Text>Todo va bien</Text> : null}
        {this.state.rooms.get('loading') === true ? <Text>Loading..</Text> : null}
        <ListView enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(room) => this.renderRow(room)}
        />
      </View>
    );
  }

  async onLogutClick() {
    await AuthActions.logout();
    this.props.navigator.push({
      id: 'IndexScene'
    });
  }

  renderRow(room) {
    return (<Text>{room.name}</Text>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 30
  }
});

export default Container.create(RoomsScene);
