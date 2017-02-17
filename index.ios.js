/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { Container } from 'flux/utils';
import AuthStore from './stores/AuthStore';
import { AuthActions } from './actions/AuthActions';

export default class exampleApp extends Component {

  static getStores() {
    return [AuthStore];
  }

  static calculateState(prevState) {
    return {
      auth: AuthStore.getState()
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome Expample App!
        </Text>
        <TextInput style={styles.authInput} onChangeText={(email) => this.setState({ email })} placeholder="Email" />
        <TextInput style={styles.authInput} onChangeText={(password) => this.setState({ password })} placeholder="Password" keyboardType="email-address" secureTextEntry={true} />
        <Button onPress={() => this.onPressLogin()} title="Login" />
        { this.state.auth.get('loading') === true ? <Text>Loading..</Text> : null }  
      </View>
    );
  }

  onPressLogin() {
    AuthActions.login(this.state.email, this.state.password);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  authInput: {
    height: 40,
    marginLeft: 50,
    marginRight: 50
  },
});

const ContainerExpampleApp = Container.create(exampleApp);

AppRegistry.registerComponent('exampleApp', () => ContainerExpampleApp);
