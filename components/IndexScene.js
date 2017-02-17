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
import AuthStore from '../stores/AuthStore';
import { AuthActions } from '../actions/AuthActions';

class IndexScene extends Component {

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
        <TextInput style={styles.authInput} onChangeText={(email) => this.setState({ email })} placeholder="Email" keyboardType="email-address" />
        <TextInput style={styles.authInput} onChangeText={(password) => this.setState({ password })} placeholder="Password" secureTextEntry={true} />
        <Button onPress={() => this.onPressLogin()} title="Login" />
        { this.state.auth.get('loading') === true ? <Text>Loading..</Text> : null }
      </View>
    );
  }

  async onPressLogin() {
    await AuthActions.login(this.state.email.trim(), this.state.password.trim());
    this.props.navigator.push({
        id: 'RoomsScene'
    });
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
    marginRight: 50,
    width: 200
  },
});

export default Container.create(IndexScene);
