
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));  // static 폴더 등록
app.set('view engine', 'ejs') // ejs 파일 사용
const { MongoClient } = require('mongodb') // mongoDB 연결

let db
const url = 'mongodb+srv://yanqhwa:1dqLaLLM5xW9ZQsr@test.pbzu6.mongodb.net/?retryWrites=true&w=majority&appName=test'

new MongoClient(url).connect().then((client)=>{
    console.log('DB connection')
    db = client.db('table') // 여기에는 collection 이름을 적는 것

    app.listen(7070, () => {
        console.log("server start");
    })
}).catch((err)=>{
    console.log(err)
})

// test set

var postList = ["안녕하세요", "테스트", "메롱"]


app.get("/", (req, res) => {
    res.send("main page");
})

app.get("/test", (req, res) => {
    res.sendFile(__dirname + "/test.html")
})

app.get("/list", (req, res) => {
    // res.render('index.ejs')
    res.render('index.ejs', { postList : postList });
})

app.get("/mongoTest", async (req, res) => {
    res.send("check console");
    let result = await db.collection('post').find().toArray();

    for (var i = 0; i < result.length; i++) {
        console.log(i + 1, "번째 제목 : ", result[i].title);
    }

    // console.log(result);
})