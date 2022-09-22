import React, { useState } from 'react';
import Board from './Board';
import Keypad from './Keypad';
const Game  = () =>{
    const res = 'WENDY';
    const [currRow, setCurrRow] = useState(0);
    
    const [currWord, setCurrWord] = useState('');
    const [squares, setSquares] = useState([...Array(30).fill('')]);
    const [prevColoredSquares, setPrevColoredSquares] = useState([...Array(30).fill('')]);
    const [tempPrevColoredSquares, setTempPrevColoredSquares] = useState([...Array(30).fill('')]);
    const [letters, setLetters] = useState([...Array(26).fill('black')]);
    const [enter, setEnter] = useState(false);
    const [tempLetters, setTempLetters] = useState([...Array(26).fill('black')]);
    const handleClickBigKey = (value) =>{
        if (value === 'ENTER' && currWord.length >= 5){
            console.log('Enter')
            
            updateKeypad();
            setCurrRow(currRow+1);
            setCurrWord('');
        }
        if (value === 'DEL'){
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
        
        let newWord = currWord + value;
        console.log(currWord.length);
        if (currWord.length > 4){
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
       setLetters(tempLetters);
       
       setPrevColoredSquares([...tempPrevColoredSquares]);

          

    }
    
    return (
        <div className='game'>
            <Board squares = {squares} letters = {letters} currRow = {currRow} prevColoredSquares ={prevColoredSquares} ></Board>
            <Keypad   handleClick = {handleKeypadClick} handleClickBigKey ={handleClickBigKey}></Keypad>
        </div>
        
    )
}
export default Game;