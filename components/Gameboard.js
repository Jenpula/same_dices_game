import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../Styles/style'



let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;
const WINNING_POINTS = 23;


export default Gameboard = () => {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [nbrOfWins, setNbrOfWins] = useState(0);
    const [sum, setSum] = useState(0);
    const [selectedDices, setSelectedDices] =
        useState(new Array(NBR_OF_DICES).fill(false));
    const [status, setStatus] = useState('');

    const throwDices = () => {
        let sum = 0;
        for(let i = 0; i < NBR_OF_DICES; i++) {
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
            sum += randomNumber
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setSum(sum);
    }
    
    const checkWinner = () => {
        if (sum >= WINNING_POINTS && nbrOfThrowsLeft > 0) {
            setNbrOfWins(nbrOfWins+1);
            setStatus('You won');
        }
     else if (sum >= WINNING_POINTS && nbrOfThrowsLeft === 0) {
        nbrOfWins(nbrOfWins+1);
        setStatus('You won, game over');
    } 
    else if (nbrOfWins > 0 && nbrOfThrowsLeft === 0) {
        setStatus('You won, game over');
    }
    else if (nbrOfThrowsLeft === 0) {
        setStatus('Game over');
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
        setNbrOfWins(0);
    }
}, [nbrOfThrowsLeft]);


const row = [];
for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
     <MaterialCommunityIcons
        name={board[i]}
        key={'row' + i}
        size={50}
        color={'steelblue'}>
     </MaterialCommunityIcons>
    );
}
return (
    <View style={Styles.gameboard}>
        <Text style={Styles.flex}>{row}</Text>
        <Text style={Styles.gameinfo}>Sum: {sum}</Text>
        <Text style={Styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
        <Text style={Styles.gameinfo}>Nbr of wins: {nbrOfWins}</Text>
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