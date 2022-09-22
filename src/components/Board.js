import React from 'react';
import { useState } from 'react';
const Board = (props) =>{

    
    const renderSquare = (value, renderingRow, mainIndex) => {

        let color = '';
        
        color = props.prevColoredSquares[mainIndex];
            
        return (
            <div className='square' style = {{background :`${color}`}}>{value}</div>
        
        )
    }
    let count = 0;
    return (
        <div className='board'>
            {[...Array(6)].map((elem, i) =>(
                <div className='board-row'>
                    {[...Array(5)].map((elem, j) => {
                        count++;
                        return renderSquare(props.squares[count-1], i, count-1);
                })}
                </div>
            ))}
        </div>
    )


}
export default Board;