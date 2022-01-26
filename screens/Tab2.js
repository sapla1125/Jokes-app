//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
const Tab2 = (props) => {
    return (
        <View style={styles.container}>
            <Text>Tab2</Text>
            <Button title="Drawer" onPress={ () => props.navigation.toggleDrawer()} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
});

//make this component available to the app
export default Tab2;
