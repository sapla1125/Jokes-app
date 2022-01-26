import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Tab1 from './screens/Tab1';
import Tab2 from './screens/Tab2';
import Joke from './screens/Joke';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert :true ,
      shouldPlaySound: true
    };
  }
})

export default function App() {
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then(statusObj => {
      if(statusObj !== 'granted') {
        return Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
    }).then((statusObj) => {
      if (statusObj.status !=='granted'){
        return;
      }
    })
  },[])

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response.notification.request.content.data);
    });
   
  
    return () => { 
      
      backgroundSubscription.remove()
    }
  }, [])

  const triggerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content:{
        title: 'Your Random Joke',
        body:'This is a joke'
      },
      trigger:{
        seconds: 2,
      }
    });

  };

  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  
  const Tab1Stack = createStackNavigator();
  const Tab2Stack = createStackNavigator();


  const Tab1SctackScreen = () => (
    <Tab1Stack.Navigator>
      <Tab1Stack.Screen name="Tab11" component={TabScreen} options={{title:"Home"}}/>
      <Tab1Stack.Screen name="Joke" component={Joke} />
    </Tab1Stack.Navigator>
  )
  const Tab2SctackScreen = () => (
    <Tab2Stack.Navigator>
      <Tab2Stack.Screen name="Tab" component={Tab2} />
    </Tab2Stack.Navigator>
  )
  const TabScreen = () => (
    <Tab.Navigator>
        <Tab.Screen name="Tab1" component={Tab1} options={{headerShown: false}}  />
        <Tab.Screen name="Tab2" component={Tab2} options={{headerShown: false}}  />
    </Tab.Navigator>
  )

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Show me a Joke" 
        // onPress={triggerNotificationHandler}
        onPress={() => props.navigation.navigate("Home",{
          screen: 'Joke',
          params: { name: 'Random Joke'}
        })} 

        />
      </DrawerContentScrollView>
    )
  }}>
        <Drawer.Screen name="Home" component={Tab1SctackScreen} options={{headerShown: false}}/>
        
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}