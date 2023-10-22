import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './App/Pages/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreenNavigation from './App/Navigation/HomeScreenNavigation';
import ChatScreen from './App/Pages/ChatScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ChatScreen /> */}
      <NavigationContainer>
        <HomeScreenNavigation />
      </NavigationContainer>
      {/* <HomeScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
