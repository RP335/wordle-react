import React, { useEffect, useState, useCallback } from 'react';
import Board from './Board';
import Keypad from './Keypad';
import  Words  from '../data/Words'
import Navbar from './Navbar';
import $ from 'jquery';
// let words;
// var checkWord = require('check-if-word');
//     words = checkWord('en');
// var randomWord =require('random-word-by-length');
const Game  = () =>{
   
       
    
   
    const [isWord, setIsWord] = useState(false);
    const [isStarted, setIsStarted] = useState(false); 
    const [loser, setLoser] = useState(false); 
    const [res, setRes] = useState('');
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
    const [gameStatus, setGameStatus] = useState('Type words or use the key-pad');
    const standardStatus = 'Type words or use the key-pad';
    const handleKeyboard  = useCallback((e) =>{
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
    })
    const checkIfInList =(currWord) =>{
        const lowerCaseCurrWord = currWord.toLowerCase();
        const url = "https://api.wordnik.com/v4/word.json/" + lowerCaseCurrWord + "/definitions?limit=500&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
        let wordExist = false;
        $.ajax({
            type: "GET",
            url: url,
            async: false
            
          
        }).done(function (result) {
            
           
            wordExist = true;
            console.log('word exists')
            
            
        }).fail(function () {
            console.log("word does not exist");
           
        });
        return wordExist;
        
    }
    const handleClickBigKey = (value) =>{
    
        if (value === 'ENTER' && currWord.length >= 5){
            
            if (!checkIfInList(currWord))
            {
                setGameStatus("Word doesn't exist");
                return;
            }
            setGameStatus('Type words or use the key-pad');
           

            
            console.log('Enter')
            
            updateKeypad();
            setCurrRow(currRow+1); 
            if (currRow === 5)
                setLoser(true);
            setCurrWord('');
        }
        if (value === 'DEL' && currWord !== ''){
            setGameStatus(standardStatus);
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
        if (!isStarted)
            return;
        
        console.log(res);
        let newWord = currWord + value;
        
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
        setRes(generateRandomWord());
        setWinner(false);
        setSquares([...Array(30).fill('')]);
        setLoser(false);
        
    }
    const generateRandomWord =() =>{
        // var word = randomWord(6);
        // while (!words.check(word) && word.length === 5){
        //     word = randomWord(6);
        // }
        // return word.toLocaleUpperCase;
        return Words[Math.floor(Math.random()*Words.length)];

    }
    const handleStartGame = () =>{
        setIsStarted(true);
       
        
        setRes(generateRandomWord());
    }

    const renderStartPlayingButton = () =>{
        
        return (<button  onClick ={handleStartGame} className='start-playing-button'>
            Click Here to Start Playing
        </button>)

    }
    
    return (
        <div className='game' onKeyDown = {(e) =>handleKeyboard(e)} tabIndex = "0">
            <Navbar>

            </Navbar>       
            <div>
               
                {/* <input type = 'text' onKeyDown = {(e) =>detectKeyDown(e)}></input> */}
                <Board squares = {squares} letters = {letters} currRow = {currRow} prevColoredSquares ={prevColoredSquares} ></Board>
                {!isStarted? renderStartPlayingButton(): <div className='game-status'>{gameStatus}</div>}
                <Keypad   handleClick = {handleKeypadClick} handleClickBigKey ={handleClickBigKey} letters = {letters}></Keypad>
                <button className='reset-button' onClick ={resetGame}>{winner? 'You Won! Click here if you want another Word' : loser?  `Aww man, nice try its ${res} . Maybe Another Word?`: 'Guess the word brother, or you want different word? click here'} </button>
            </div>
        </div>
        
    )
}
export default Game;