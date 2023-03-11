import React, { useState, useEffect } from 'react'
import { Switch, FormControlLabel, FormGroup } from '@mui/material';

import './Main.css'

function Main() {
    const [inputCount, setInputCount] = useState(0);
    const [outputCount, setOutputCount] = useState(0);
    const [check, setCheck] = useState(false);

    const handleChange = () => {
        setCheck((e) => !e);
    };

  return (
    <div>
        <div className='toggle'>
            <FormGroup className='toggle'>
                <FormControlLabel
                control={<Switch check={check} onChange={handleChange} />}
                label={`${check ? 'Decrypt':'Encrypt'}`}
                />
            </FormGroup>
        </div>

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
    </div>
  )
}

export default Main