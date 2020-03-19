import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

class ImageResult extends React.Component {
    render() {
        return (
            <Image
                style={styles.image}
                source={{uri: "image"}}
            />
        );
    }
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        backgroundColor: 'gray'
    },
});

export default ImageResult;