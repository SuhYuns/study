const express = require('express');  // 세미콜론 추가
const app = express();

// mongoDB 관련 세팅

const { MongoClient } = require('mongodb');

let db
// const url = 'mongodb+srv://yan9hwa:<>@practice.8beb9.mongodb.net/'
const url = 'mongodb+srv://yan9hwa:<DcDnpJYxWXt3irzl>@practice.8beb9.mongodb.net/?retryWrites=true&w=majority&appName=practice';


new MongoClient(url).connect().then((client) => {
    console.log("db 접속")
    db = client.db('posts')

    app.listen(8081, () => {
        console.log("서버 실행")
    })

}).catch((err) => {
    console.log("오류", err)
})

// 서버 실행

// app.listen(8081, () => {
//     console.log("서버 실행");
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send("메인 페이지 접속");
});

// 주석 처리된 부분은 그대로 두어도 문제 없으나, 주석을 풀면 리스팅 페이지가 동작할 거예요.
// app.get('/list', (req, res) => {
//     res.send("리스트 페이지 접속");
// });

app.get('/test', (req, res) => {
    res.sendFile(__dirname + "/template/index.html");
});
