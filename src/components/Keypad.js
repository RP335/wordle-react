import React from 'react';

const Keypad = (props) =>{
    const handleClickBigKey = (value) =>{
        console.log('clickEnterDel');
        props.handleClickBigKey(value);
    }
    const handleKeypadClick = ( value) =>{
        console.log('clicked')
        props.handleClick( value );
    }
    const renderKey = (value) =>{
        return(
            (value === 'ENTER' || value === 'DEL')? <div onClick = {() => handleClickBigKey(value)} className='big-key'>{value}</div> : 
            <div  onClick = {() => handleKeypadClick(value)} className='small-key'>{value}</div>
        )
    }
    const Row1  = [
        'Q', 'W', 'E', 'R', 'T', 'Y','U' ,'I', 'O', 'P'
    ]
    const Row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const Row3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL'];
    
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