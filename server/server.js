// Section 1
// import express from 'express';
// import crypto from "crypto";

const express = require("express");
const crypto = require("crypto");
// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key

// Section 2
const app = express();

app.use(express.json());

// Section 3
app.get("/", (req, res) => {
  res.send("<h1>Welcome in RSA Algo</h1>");
});

//----------------geting pair of keys -------------------------------
app.get("/api/keypairs", (req, res) => {
  let { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    // The standard secure default length for RSA keys is 2048 bits
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  console.log("Generated Public Key:", publicKey);
  console.log("Generated Private Key:", privateKey);
  res.json({
    publicKey: publicKey,
    privateKey: privateKey,
  });
});
//--------------------encrypt message with key---------------------------
app.post("/api/encryption", (req, res) => {
  let body = req.body;
  let message = body.message;
  let publicKey = body.publicKey;
  let encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(message)
  );
  console.log("encypted data: ", encryptedData);
  res.json({
    encryptedData: encryptedData.toString('hex'),
  });
});
app.post("/api/decryption", (req, res) => {
  let body = req.body;
  let encryptedData = Buffer.from(body.encryptedData, 'hex');
  let privateKey = body.privateKey;
  let decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      // In order to decrypt the data, we need to specify the
      // same hashing function and padding scheme that we used to
      // encrypt the data in the previous step
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedData
  );

  // The decrypted data is of the Buffer type, which we can convert to a
  // string to reveal the original data
  console.log("decrypted data: ", decryptedData.toString());
  res.json({
    decryptedData: decryptedData.toString(),
  });
});
// Section 4
app.listen(3001, () => {
  console.log("server started on port 3001");
});
