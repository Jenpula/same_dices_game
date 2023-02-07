import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import Styles from './Styles/style';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  return (
    <View style={Styles.container}>
      <Header />
      <Gameboard />
      <Footer />
    </View>
  );
}