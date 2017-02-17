import React, { Component } from 'react';
import { Navigator } from 'react-native';
import IndexScene from './IndexScene';
import RoomsScene from './RoomsScene';

export default class App extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ id: 'IndexScene', title: 'Welcome' }}
                renderScene={this.renderScene.bind(this)}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromBottom;
                }} />
        );
    }

    renderScene(route, navigator) {
        const routeId = route.id;
        switch (routeId) {
            case 'RoomsScene':
                return (<RoomsScene navigator={navigator} />);
            case 'IndexScene':
            default:
                return (<IndexScene navigator={navigator} />);
        }
    }
}
