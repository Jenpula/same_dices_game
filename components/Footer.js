import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles/style';

export default Footer = () => {
    return (
        <View style={Styles.footer}>
            <Text style={Styles.author}>
                Author: Jenni Annala
            </Text>
        </View>
    )
}