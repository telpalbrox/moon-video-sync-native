import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Container } from 'flux/utils';
import RoomStore from '../stores/RoomStore';
import {RoomActions} from '../actions/RoomActions';

class RoomsScene extends Component {
  static getStores() {
    return [RoomStore];
  }

  static calculateState(prevState) {
    //return RoomStore.getState();
    return {rooms: RoomStore.getState()}
  }

  componentDidMount() {
    RoomActions.getAll();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
        { this.state.rooms.get('error') === true ? <Text>Error</Text> : null }
        { this.state.rooms.get('error') === false ? <Text>Todo va bien</Text> : null }
        { this.state.rooms.get('loading') === true ? <Text>Loading..</Text> : null }
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
  }
});

export default Container.create(RoomsScene);
