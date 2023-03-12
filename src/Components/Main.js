import React, { useState, useEffect } from 'react'
import { Switch, FormControlLabel, FormGroup, TextField,Button } from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

import './Main.css'

function Main() {
    const [inputCount, setInputCount] = useState(0);
    const [outputCount, setOutputCount] = useState(0);
    const [check, setCheck] = useState(false);
    const [P, setP] = useState();
    const [Q, setQ] = useState();

    const changeCheck = () => {
        setCheck((e) => !e);
    };

    const getPrimes = (min, max) => {
        const result = Array(max + 1)
          .fill(0)
          .map((_, i) => i);
        for (let i = 2; i <= Math.sqrt(max + 1); i++) {
          for (let j = i ** 2; j < max + 1; j += i) delete result[j];
        }
        return Object.values(result.slice(Math.max(min, 2)));
      };
      
      const getRandNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      
      const getRandPrime = (min, max) => {
        const primes = getPrimes(min, max);
        return primes[getRandNum(0, primes.length - 1)];
      };

      const generatePnQ = () => {
        setQ(getRandPrime(1,1000));
        setP(getRandPrime(1,1000));
      }

      const handleChangeP = (event) => {
        setP(event.target.value);
      };

      const handleChangeQ = (event) => {
        setQ(event.target.value);
      };

  return (
    <div>
        <div className='toggle'>
            <FormGroup className='toggle'>
                <FormControlLabel
                control={<Switch check={check} onChange={changeCheck} />}
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
                    <TextField id="P" label="P" variant="outlined" focused value={P} onChange={handleChangeP}/>
                    <TextField id="Q" label="Q" variant="outlined" focused value={Q} onChange={handleChangeQ}/>
                    <Button variant="contained" startIcon={<CalculateIcon/>}
                    style={{
                        height:50,
                        backgroundColor:'#60b0f4',
                        fontWeight: "bold",
                    }}>Calculate Keys</Button>
                    <Button onClick={generatePnQ} variant="contained" startIcon={<SettingsSuggestIcon/>}
                    style={{
                        height:50,
                        backgroundColor:'#60b0f4',
                        fontWeight: "bold",
                    }}>Generate P & Q</Button>   
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