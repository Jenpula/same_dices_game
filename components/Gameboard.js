import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../Styles/style'



let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;




export default Gameboard = () => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [selectedDices, setSelectedDices] =
        useState(new Array(NBR_OF_DICES).fill(false));
    const [status, setStatus] = useState('');


    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        }
        else {
            return selectedDices[i] ? 'black' : 'steelblue';
        }
    }

    
    const selectDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    const throwDices = () => { 
        for(let i = 0; i < NBR_OF_DICES; i++) {
            if(!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
          }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
       
    }
    
    const checkWinner = () => { 
     if (board.every((val, i , arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('You won');
        }
     else if (board.every((val, i , arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
        setStatus('You won, game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    } 
     else if (nbrOfThrowsLeft === 0) {
        setStatus('Game over');
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else {
        setStatus('Keep on throwing!');
    }
}

useEffect(() => {
    checkWinner();
    if ( nbrOfThrowsLeft === NBR_OF_THROWS) {
        setStatus('Game has not started');
    }
    if (nbrOfThrowsLeft < 0) {
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
}, [nbrOfThrowsLeft]);


const row = [];
for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
        <Pressable
        key={'row' + i}
        onPress={() => selectDice(i)}>
     <MaterialCommunityIcons
        name={board[i]}
        key={'row' + i}
        size={50}
        color={getDiceColor(i)}>
     </MaterialCommunityIcons>
     </Pressable>
    );
}
return (
    <View style={Styles.gameboard}>
        <Text style={Styles.flex}>{row}</Text>
        <Text style={Styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={Styles.gameinfo}>{status}</Text>
        <Pressable style={Styles.button}
            onPress={() => throwDices()}>
            <Text style={Styles.buttonText}>
                Throw dices
            </Text>
        </Pressable>
    </View>
)
}