import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Button, Platform } from 'react-native';
import { Container } from 'flux/utils';
import YouTube from 'react-native-youtube';
import RoomStore from '../stores/RoomStore';
import { RoomActions } from '../actions/RoomActions';

class RoomsScene extends Component {
    static getStores() {
        return [RoomStore];
    }

    static calculateState(prevState) {
        return { rooms: RoomStore.getState() }
    }

    async componentDidMount() {
        await RoomActions.getOne(this.props.roomId);
        RoomActions.join(this.props.roomId);
    }

    render() {
        const room = this.state.rooms.get('room') ? this.state.rooms.get('room').toJS() : null;
        const currentVideo = this.state.rooms.get('currentVideo') ? this.state.rooms.get('currentVideo').toJS() : null;
        return (
            <View style={styles.container}>
                <Text>Room</Text>
                <Text>{room ? room.name : null}</Text>
                {room ? <YouTube
                    ref={(component) => { this.player = component }}
                    videoId={currentVideo ? currentVideo.youtubeId : null}
                    play={true}
                    hidden={false}
                    playsInline={true}
                    loop={false}
                    style={{ alignSelf: 'stretch', height: 300, width: 300, backgroundColor: 'black', marginVertical: 10 }}
                    apiKey={process.env.GOOGLE_KEY}
                    onReady={() => this.onPlayerReady()}
                /> : null}
            </View>
        );
    }

    onPlayerReady() {
        if (this.state.rooms.get('currentVideo')) {
            const video = this.state.rooms.get('currentVideo').toJS();
            const startedDate = new Date(video.startedPlayed);
            const now = new Date();
            const seconds = (now.getTime() - startedDate.getTime()) / 1000;
            if (isNaN(seconds)) {
                return;
            }
            if (Platform.OS === 'ios') {
                this.player.seekTo(seconds + 5);
            } else {
                setTimeout(() => {
                    this.player.seekTo(seconds + 6);
                }, 5000)
            }
        }
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
