import { AsyncStorage } from 'react-native';

function hasLocalStorageSupport() {
    return typeof window !== 'undefined' && window.localStorage;
}

const Storage = {
    async setItem(key, value) {
        if (hasLocalStorageSupport()) {
            return window.localStorage.setItem(key, value);
        }
        await AsyncStorage.setItem(key, value);
    },
    async getItem(key) {
        if (hasLocalStorageSupport()) {
            return window.localStorage.getItem(key);
        }
        return await AsyncStorage.getItem(key);
    }
};

export { Storage }
