//import liraries
import { Center } from 'native-base';
import React, {useState, useEffect} from 'react';
import { View,
        Text, 
        StyleSheet,
        SafeAreaView,
        ActivityIndicator,
        Dimensions,
 } from 'react-native';

import jokeApi from "../apis/joke";

const {width, height} = Dimensions.get('window');

const Joke = ({ navigation }) => {
    const [getJoke, setGetJoke ] = useState(getJoke)

    useEffect(() => {
        getJokeFromApi()
    },[])
    // const jokeResponse = async() => {
    //     const response = await jokeApi.get('any')
    //     console.log(response.data)
    // }

    function getJokeFromApi(){
        jokeApi.get('any')
        .then(function(response){
            setGetJoke(response.data)
            
        })
        .catch(function(error){
            console.log(error)
        })
    }
  
    
if(!getJoke){
    return null;
}
 

    return (
        <View style={styles.container}>
            <Text style={{...styles.joke, ...{display: !getJoke.joke ? "none" : "flex" }}}>{getJoke.joke} </Text>

            <Text style={{...styles.ques, ...{display: !getJoke.setup ? "none" : "flex" }}}>
            Setup
            </Text>
            <Text style={{...styles.setup, ...{display: !getJoke.setup ? "none" : "flex" }}}>
            {getJoke.setup}
            </Text>
            <Text style={{...styles.ques, ...{display: !getJoke.setup ? "none" : "flex" }}} >
            Delivery
            </Text>
            <Text style={{...styles.setup, ...{display: !getJoke.setup ? "none" : "flex" }}}>
            {getJoke.delivery}
            </Text>
            <Text style={styles.category}>Category:  {getJoke.category}</Text>
            <Text style={styles.type}>Type:  {(getJoke.type).toUpperCase()}</Text>

        </View>
    );
};



// define your styles
const styles = StyleSheet.create({
    container: {
        
         backgroundColor: 'white',
         margin: width * 0.03,
         padding: 10,
         borderRadius: width * 0.05,
         shadowColor: "#000",
         shadowOffset: {width:0.5, height:0.5},
         shadowOpacity: 0.5,
         shadowRadius: 5,
         justifyContent: 'center',
        minHeight: 500,
        marginTop: 100,
        marginBottom: 100,
         

        
    },
    joke:{
        
        // marginHorizontal: width * 0.10,
        color: "black",
        
        margin: 12,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        
    },
    setup:{
        margin: 12,
        color: "black",
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    category:{
        marginLeft: width * 0.10,
        marginTop:width * 0.10,
        color:"gray",
        fontSize: 18,
        paddingBottom: 10,
        
    },
    type:{
        marginLeft: width * 0.10,
        color:"gray",
        fontSize: 14,
    },
    ques:{
        color:"gray",
        fontSize: 18,
        fontWeight: "bold",
        marginTop:10,
        marginBottom:10,
        margin: 12,
        textDecorationLine: 'underline'
    }
});

//make this component available to the app
export default Joke;
