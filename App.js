import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import GameBoard from './components/GameBoard/GameBoard';

export default function App() {
  const image = './assets/main-background.jpg';
  return (
    <View style={styles.container}>
      <ImageBackground source={require(image)} resizeMode="cover" style={styles.image}>

        <GameBoard></GameBoard>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  }
});
