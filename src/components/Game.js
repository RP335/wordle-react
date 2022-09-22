import React, { useEffect, useState } from 'react';
import Board from './Board';
import Keypad from './Keypad';
import  Words  from '../data/Words'

const Game  = () =>{
   
       
    
    const detectKeyDown = (e) =>{
        console.log('input key ' + e.key);
        let letter = String(e.key);
        letter = letter.toUpperCase();
        console.log(letter);
        
        if (letter.length === 1 && letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90){
            handleKeypadClick(letter);
        }
        if (letter === 'ENTER' ){
            handleClickBigKey(letter);
        }
        if (letter === 'BACKSPACE'){
            handleClickBigKey('DEL');
        }
    }
    
    
    
    const [res, setRes] = useState('WENDY');
    const [currRow, setCurrRow] = useState(0);
    const [winner, setWinner] = useState(false);
    const [currWord, setCurrWord] = useState('');
    const [squares, setSquares] = useState([...Array(30).fill('')]);
    const [prevColoredSquares, setPrevColoredSquares] = useState([...Array(30).fill('')]);
    const [tempPrevColoredSquares, setTempPrevColoredSquares] = useState([...Array(30).fill('')]);
    const [letters, setLetters] = useState([...Array(26).fill('black')]);
    const [firstWord, setFirstWord] = useState(false);
    //const [enter, setEnter] = useState(false);
    const [tempLetters, setTempLetters] = useState([...Array(26).fill('black')]);
    const handleClickBigKey = (value) =>{
    
        if (value === 'ENTER' && currWord.length >= 5){
            console.log('Enter')
            
            updateKeypad();
            setCurrRow(currRow+1);
            setCurrWord('');
        }
        if (value === 'DEL' && currWord !== ''){
            let newWord = currWord;
            let currIndex = currWord.length-1 + Number(currRow * 5);
            let newSquares = [...squares];
            newSquares[currIndex] = '';
            setSquares(newSquares);
            newWord = newWord.substr(0, currWord.length-1);
            console.log(newWord);
            setCurrWord(newWord);
            
        }
    }
    const handleKeypadClick = (value) =>{
        if (!firstWord){
            setRes(Words[Math.floor(Math.random()*Words.length)]);
            setFirstWord(true);

        }
        console.log(res);
        let newWord = currWord + value;
        console.log(currWord.length);
        if (currWord.length > 4 || winner){
            return;
        }
        
        setCurrWord(newWord);
        let currIndex = currWord.length + Number(currRow * 5);
        let newSquares = [...squares];
        
        newSquares[currIndex] = value;
        setSquares(newSquares); 
        setCurrWord(newWord);
        const tempIndex = newWord.length-1;
        const target = newWord.charAt(tempIndex);
        let newLetters = [...tempLetters];
        if (target === res.charAt(tempIndex)) {
            const a = String(target);
            const index = Number(a.charCodeAt(0)-'A'.charCodeAt(0));
            newLetters[index] = '#538D4E';
            setTempLetters(newLetters);

        }
        else if (res.indexOf(target) !== -1){
            const a = String(target);
            const index = Number(a.charCodeAt(0)-'A'.charCodeAt(0));
            newLetters[index] = '#B59F3B'
            setTempLetters(newLetters);


        }
        else {
            const a = String(target);
            const index = Number(a.charCodeAt(0)-'A'.charCodeAt(0));
            newLetters[index] = '#3A3A3C'

            setTempLetters(newLetters);

        }
        let newTempPrevColoredSquares = [...tempPrevColoredSquares];
        console.log(tempPrevColoredSquares);
        newTempPrevColoredSquares[currIndex] = newLetters[value.charCodeAt(0) - 'A'.charCodeAt(0)]
        setTempPrevColoredSquares(newTempPrevColoredSquares);
        
        
    }
    const updateKeypad = () => {
        if (currWord === res)
            setWinner(true);
        setLetters(tempLetters);
       
        setPrevColoredSquares([...tempPrevColoredSquares]);
    }
    const resetGame = () =>{
        setPrevColoredSquares([...Array(30).fill('')]);
        setTempPrevColoredSquares([...Array(30).fill('')]);
        setCurrRow(0);
        setLetters([...Array(26).fill('black')]);
        setTempLetters([...Array(26).fill('black')]);
        setCurrWord('');
        setRes(Words[Math.floor(Math.random()*Words.length)]);
        setWinner(false);
        setSquares([...Array(30).fill('')]);
        
    }
    
    return (
        <div className='game'>
            {/* <input type = 'text' onKeyDown = {(e) =>detectKeyDown(e)}></input> */}
            <Board squares = {squares} letters = {letters} currRow = {currRow} prevColoredSquares ={prevColoredSquares} ></Board>
            <Keypad  onKeyDown = {(e) =>detectKeyDown(e)} handleClick = {handleKeypadClick} handleClickBigKey ={handleClickBigKey} letters = {letters}></Keypad>
            <button className='reset-button' onClick ={resetGame}>{winner? 'You Won! Click here if you want another Word' : 'Another Word?'} </button>
        </div>
        
    )
}
export default Game;