import React, { Component } from 'react';
import { Navigator, Platform } from 'react-native';
import IndexScene from './IndexScene';
import RoomsScene from './RoomsScene';
import { Storage } from '../Storage';
import Transitions from '../CustomTransitions';

export default class App extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ id: 'InitialScene' }}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Platform.OS === 'ios' ? Navigator.SceneConfigs.PushFromRight : Navigator.SceneConfigs.FloatFromBottomAndroid;
                }} />
        );
    }

    renderScene(route, navigator) {
        const routeId = route.id;
        switch (routeId) {
            case 'RoomsScene':
                return (<RoomsScene navigator={navigator} />);
            case 'InitialScene':
                Storage.getItem('logged').then((value) => {
                    console.log(value)
                    if (value === 'true') {
                        navigator.push({
                            id: 'RoomsScene',
                            sceneConfig: Transitions.NONE
                        });
                    } else {
                        navigator.push({
                            id: 'IndexScene',
                            sceneConfig: Transitions.NONE
                        });
                    }
                });
                return (null);
            case 'IndexScene':
            default:
                return (<IndexScene navigator={navigator} />);
        }
    }
}
