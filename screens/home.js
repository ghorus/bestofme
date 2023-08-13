import React from "react";
import { Text,View,StyleSheet, TouchableOpacity,Button } from "react-native";
import { useState } from "react";
export default function Home({navigation}) {
    return (<View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.navigate('How to Use')}>
            <View style={styles.btn_cont}><Text style={styles.txt}>HOW TO USE</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Workout')}>
            <View style={styles.btn_cont}><Text style={styles.txt}>WORK OUT</Text></View></TouchableOpacity></View>)
}

const styles = StyleSheet.create({
    btn_cont: {
      height:55,
      width:320,
      backgroundColor:"pink",
      margin:10,
      borderRadius:30,
      justifyContent:"center"
    },
    btn_cont2: {
      height:60,
      width:320,
      backgroundColor:"green",
      margin:10,
      borderRadius:30,
      justifyContent:"center"
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    txt: {
      fontSize:15,
      letterSpacing:2,
      padding:5,
      textAlign:"center",
    }
  });