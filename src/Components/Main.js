import React, { useState, useEffect } from 'react'
import './Main.css'

function Main() {
    const [inputCount, setInputCount] = useState(0);
    const [outputCount, setOutputCount] = useState(0);
  return (
    <div className='main'>
        <div className='input'>
            <textarea onChange={e => setInputCount(e.target.value.length)}/>
            <div className='count'>
                <span>{inputCount}</span>
            </div>
        </div>

        {/* <div>
            <input/>
        </div> */}

        <div className='output'>
            <textarea disabled onChange={e => setOutputCount(e.target.value.length)}/>
            <div className='count'>
                <span>{outputCount}</span>
            </div>
        </div>
    </div>
  )
}

export default Main