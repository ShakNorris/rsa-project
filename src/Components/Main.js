import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import "./Main.css";

function Main() {
  const [inputEncrypt, setInputEncrypt] = useState("");
  const [inputEncryptCount, setInputEncryptCount] = useState(0);
  const [inputDecrypt, setInputDecrypt] = useState("");
  const [inputDecryptCount, setDecryptInputCount] = useState(0);
  const [keys, setKeys] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [encryption, setEncryption] = useState(null);
  const [decryption, setDecryption] = useState(null);
  const [check, setCheck] = useState(false);
  // var Buffer = require("buffer/").Buffer;

  const GenerateKeys = () => {
    fetch("/api/keypairs")
      .then((res) => res.json())
      .then((data) => setKeys(data));
  };

  const EncryptedInput = async (value) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: value,
        publicKey: publicKey,
      }),
    };
    await fetch("/api/encryption", requestOptions)
      .then((response) => response.json())
      .then((data) => setEncryption(data));
  };

  const DecryptedInput = async (value) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        encryptedData: value,
        privateKey: privateKey,
      }),
    };
    await fetch("/api/decryption", requestOptions)
      .then((response) => response.json())
      .then((data) => setDecryption(data));
  };

  const DisplayResult = () => {
    return check ? encryption?.encryptedData : decryption?.decryptedData
  }
  
  return (
    <div>
      <div className="keys">
        <TextField
          id="input-with-icon-textfield"
          label="Public Key"
          multiline
          rows={3}
          sx={{ minWidth: 400 }}
          value={keys?.publicKey}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Button
          onClick={GenerateKeys}
          variant="contained"
          startIcon={<SettingsSuggestIcon />}
          style={{
            height: 50,
            backgroundColor: "#60b0f4",
            fontWeight: "bold",
          }}
        >
          Generate Keys
        </Button>
        <TextField
          id="input-with-icon-textfield"
          label="Private Key"
          multiline
          rows={3}
          sx={{ minWidth: 400 }}
          value={keys?.privateKey}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </div>

      <div className="main">
        <div className="encrypt">
          <TextField
            id="publickey"
            label="Input Public Key Here"
            variant="standard"
            fullWidth
            multiline
            rows={3}
            sx={{
              mb: 2,
            }}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <div className="input">
            <textarea
              onChange={(e) => {
                setInputEncryptCount(e.target.value.length);
                setInputEncrypt(e.target.value);
              }}
            />
            <div className="count">
              <span>{inputEncryptCount}</span>
            </div>
          </div>
          <Button onClick={() => {EncryptedInput(inputEncrypt, publicKey); setCheck(true)}} variant="outlined">Encrypt</Button>
        </div>
        <div className="output">
          <textarea disabled value={DisplayResult()} />
        </div>
        <div>
          <TextField
            id="publickey"
            label="Input Private Key Here"
            variant="standard"
            fullWidth
            multiline
            rows={3}
            sx={{
              mb: 2,
            }}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <div className="input">
            <textarea
              onChange={(e) => {
                setDecryptInputCount(e.target.value.length);
                setInputDecrypt(e.target.value);
              }}
            />
            <div className="count">
              <span>{inputDecryptCount}</span>
            </div>
          </div>
          <Button onClick={() => {DecryptedInput(inputDecrypt, privateKey); setCheck(false)}} variant="outlined">Decrypt</Button>
        </div>
      </div>
    </div>
  );
}

export default Main;