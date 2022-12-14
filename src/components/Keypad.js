import React from 'react';
const Keypad = (props) =>{
    const handleClickBigKey = (value) =>{
        console.log('clickEnterDel');
        props.handleClickBigKey(value);
    }
    const handleKeypadClick = ( value) =>{
        
        props.handleClick( value );
    }
    
    const renderKey = (value) =>{
        
        let color = props.letters[value.charCodeAt(0)-'A'.charCodeAt(0)];
        if (color === 'black')
            color = '#818384'
        
        return(
            (value === 'ENTER' || value === 'DEL')? <div onClick = {() => handleClickBigKey(value)} className='big-key'>{value}</div> : 
            <div  onClick = {() => handleKeypadClick(value)} className='small-key' style ={{background: `${color}`}}>{value}</div>
        )
    }
    const Row1  = [
        'Q', 'W', 'E', 'R', 'T', 'Y','U' ,'I', 'O', 'P'
    ]
    const Row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const Row3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'];
    // const handleKeyboard  = useCallback((e) =>{
    //     let letter = String(e.key);
    //     letter = letter.toUpperCase();
    //     console.log(letter);
        
    //     if (letter.length === 1 && letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90){
    //         handleKeypadClick(letter);
    //     }
    //     if (letter === 'ENTER' ){
    //         handleClickBigKey(letter);
    //     }
    //     if (letter === 'BACKSPACE'){
    //         handleClickBigKey('DEL');
    //     }
    // })
    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyboard);
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyboard);
    //     };
    // },[handleKeyboard]);

    
    return (
        <div className='keypad'>
            <div className='key-row'>
                {Row1.map ((elem) =>(
                    renderKey(elem )
                ))}
            </div>
            <div className='key-row'>
                {Row2.map ((elem) =>(
                    renderKey(elem,)
                ))}
            </div>
            <div className='key-row'>
                {Row3.map ((elem) =>(
                    renderKey(elem,)
                ))}
            </div>
        </div>
    )

}
export default Keypad;