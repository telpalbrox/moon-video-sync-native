import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ListView } from 'react-native';
import { Container } from 'flux/utils';
import RoomStore from '../stores/RoomStore';
import { RoomActions } from '../actions/RoomActions';

class RoomsScene extends Component {
  static getStores() {
    return [RoomStore];
  }

  static calculateState(prevState) {
    //return RoomStore.getState();
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
    console.log(this.state.rooms.toJS());
    if (this.state.rooms.get('rooms')) {
      this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.rooms.get('rooms').toJS());
    }
    return (
      <View style={styles.container}>
        <Text>Test</Text>
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
  }
});

export default Container.create(RoomsScene);
