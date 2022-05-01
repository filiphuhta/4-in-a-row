import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GameBoard from './components/GameBoard/GameBoard';

export default function App() {
  return (
    <View style={styles.container}>
      <GameBoard></GameBoard>
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
});
