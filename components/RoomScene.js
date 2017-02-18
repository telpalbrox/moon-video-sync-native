import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ListView, Button } from 'react-native';
import { Container } from 'flux/utils';
import RoomStore from '../stores/RoomStore';
import { RoomActions } from '../actions/RoomActions';

class RoomsScene extends Component {
  static getStores() {
    return [RoomStore];
  }

  static calculateState(prevState) {
    return { rooms: RoomStore.getState() }
  }

  componentDidMount() {
      RoomActions.getOne(this.props.roomId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Room</Text>
        <Text>{ this.state.rooms.get('room') ? this.state.rooms.get('room').get('name') : null }</Text>
      </View>
    );
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
