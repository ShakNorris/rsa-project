import React, { useState, useEffect } from 'react'
import { Switch, FormControlLabel, FormGroup, TextField,Button } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';

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

            <div className='keys'>
                <div className='prime'>
                    <TextField id="outlined-basic" label="P" variant="outlined" />
                    <TextField id="outlined-basic" label="Q" variant="outlined" />
                    <Button variant="contained" startIcon={<CalculateIcon/>}
                    style={{
                        height:50,
                        backgroundColor:'#60b0f4',
                        fontWeight: "bold",
                    }}>Calculate</Button>   
                </div>  
                <div className='key-values'>
                    <TextField
                    label="N"
                    defaultValue=""
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                    <TextField
                    label="L"
                    defaultValue=""
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                    <TextField
                    label="E"
                    defaultValue=""
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                    <TextField
                    label="D"
                    defaultValue=""
                    InputProps={{
                        readOnly: true,
                    }}
                    />
                </div>
            </div>

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