import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function GameBoard() {

   const [player1, setPlayer1] = useState(1);
   const [player2, setPlayer2] = useState(2);
   const [currentPlayer, setCurrentPlayer] = useState(null);
   const [gameBoard, setGameBoard] = useState([]);
   const [gameOver, setGameOver] = useState(false);
   const [message, setMessage] = useState("");


   const initBoard = () => {
      // Create a blank 6x7 matrix
      let board = [];
      for (let r = 0; r < 6; r++) {
         let row = [];
         for (let c = 0; c < 7; c++) { row.push(null) }
         board.push(row);
      }
      setGameBoard(board);
      setCurrentPlayer(player1);
      setMessage('');
      setGameOver(false);
   }

   const togglePlayer = () => {
      return (currentPlayer === player1) ? player2 : player1;
   };

   const play = (c) => {
      if (!gameOver) {
         // Place piece on board
         let board = gameBoard;
         for (let r = 5; r >= 0; r--) {
            if (!board[r][c]) {
               board[r][c] = currentPlayer;
               break;
            }
         }

         // Check status of board
         let result = checkAll(board);
         if (result === player1) {
            setGameBoard(board);
            setGameOver(true);
            setMessage('Player 1 (red) wins!');
         } else if (result === player2) {
            setGameBoard(board);
            setGameOver(true);
            setMessage('Player 2 (yellow) wins!');
         } else if (result === 'draw') {
            setGameBoard(board);
            setGameOver(true);
            setMessage('Draw game.');
         } else {
            setGameBoard(board);
            setCurrentPlayer(togglePlayer);
         }
      } else {
         setMessage('Game over. Please start a new game.');
      }
   }

   const checkVertical = (board) => {
      // Check only if row is 3 or greater
      for (let r = 3; r < 6; r++) {
         for (let c = 0; c < 7; c++) {
            if (board[r][c]) {
               if (board[r][c] === board[r - 1][c] &&
                  board[r][c] === board[r - 2][c] &&
                  board[r][c] === board[r - 3][c]) {
                  return board[r][c];
               }
            }
         }
      }
   };

   const checkDiagonalRight = (board) => {
      // Check only if row is 3 or greater AND column is 3 or less
      for (let r = 3; r < 6; r++) {
         for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
               if (board[r][c] === board[r - 1][c + 1] &&
                  board[r][c] === board[r - 2][c + 2] &&
                  board[r][c] === board[r - 3][c + 3]) {
                  return board[r][c];
               }
            }
         }
      }
   };

   const checkDiagonalLeft = (board) => {
      // Check only if row is 3 or greater AND column is 3 or greater
      for (let r = 3; r < 6; r++) {
         for (let c = 3; c < 7; c++) {
            if (board[r][c]) {
               if (board[r][c] === board[r - 1][c - 1] &&
                  board[r][c] === board[r - 2][c - 2] &&
                  board[r][c] === board[r - 3][c - 3]) {
                  return board[r][c];
               }
            }
         }
      }
   };

   const checkDraw = (board) => {
      for (let r = 0; r < 6; r++) {
         for (let c = 0; c < 7; c++) {
            if (board[r][c] === null) {
               return null;
            }
         }
      }
      return 'draw';
   };

   const checkAll = (board) => {
      return checkVertical(board) ||
         checkDiagonalRight(board) ||
         checkDiagonalLeft(board) ||
         checkHorizontal(board) ||
         checkDraw(board);
   };

   const checkHorizontal = (board) => {
      // Check only if column is 3 or less
      for (let r = 0; r < 6; r++) {
         for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
               if (board[r][c] === board[r][c + 1] &&
                  board[r][c] === board[r][c + 2] &&
                  board[r][c] === board[r][c + 3]) {
                  return board[r][c];
               }
            }
         }
      }
   }

   return (
      <View style={styles.mainContainer}>
         <Button onPress={initBoard}
            title="New Game"
            color="#841584"
         />

         {gameBoard.length > 0 &&
            <View style={styles.container}>
               {gameBoard.map((row, i) => (<RowComp key={i} row={row} play={play} />))}
            </View>
         }
         <Text style={styles.message}>{message}</Text>
      </View>
   );
}

// Row component
const RowComp = ({ row, play }) => {
   return (
      <View style={styles.row}>
         {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
      </View>
   );
};

const Cell = ({ value, columnIndex, play }) => {
   let color = 'white';
   if (value === 1) {
      color = 'red';
   } else if (value === 2) {
      color = 'yellow';
   }

   return (
      <TouchableOpacity style={styles.cell} onPress={() => { play(columnIndex) }}>
         <View style={{
            backgroundColor: color,
            height: 30,
            width: 30,
            border: '1px solid #000',
            borderRadius: '100px'
         }}></View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   mainContainer: {
      marginTop: 40,
   },
   container: {
       flex: 1,
      backgroundColor: '#32527B',
      padding: 10,
   },
   row: {
      flexDirection: "row",
      flexWrap: "wrap",
   },
   cell: {
      height: 50,
      width: 50,
      padding: 2
   },
   message: {
      textAlign: 'center',
      fontSize: 17
   }
});
