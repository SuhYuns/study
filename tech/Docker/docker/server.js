

const express = require('express');
const app = express();

app.listen(8082, () => {
    console.log("서버 실행");
})

app.get('/', (req, res) => {
    res.send("hello world");
})