## 개요

'데이터를 요청하면 해당 데이터를 보내주는 프로그램'을 서버라고 한다.
node.js와 mongoDB를 사용해서 서버 개발을 할 예정
node.js는 일종의 자바스크립트 파일 실행기라고 볼 수 있는데,
자바스크립트 런타임을 설치하면 컴퓨터에서 자바스크립트로 작성한 파일을 실행할 수 있음
간결한 문법과 준수한 성능을 바탕으로 웹서버도 만들기 시작했음.

nodeJS는 쉽고, 성능도 준수하다는 점 때문에 사람들이 많이 애용한다.
특히 non-blocking I/O나 비동기처리도 가능하다는 장점이 있음.
- non-blocking I/O : 빠른 웹서버를 만드는데 도움, 비동기로 요청들을 처리해줌

그러나 단점도 있는데, CPU를 많이 써야하는 처리는 비효율적일 수 있음.
기본적으로 node.js는 싱글스레드에서 동작해서 코어와 스레드가 여러개 달린 CPU를 비효율적으로 사용함.
그러나 이런 무거운 작업들도 별도의 스레드에서 처리하도록 코드 짤 수는 있음.

### 기본적인 세팅

- nodejs LTS 버전 설치
- server.js와 같이 서버 코드를 작성할 수 있게 준비
- 터미널에서 'npm init -y'로 package.json 파일을 생성함
- 터미널에서 'npm install express' 입력하여 express 라이브러리 설치 (express 라이브러리 사용하여 서버 구축)
- 'node server.js' 하면 서버코드 실행 (기본적으로 http://localhost:8080), 서버코드는 다음과같이 구성하기


<pre>
<code>
    const express = require('express')
    const app = express()

    app.listen(8080, () => {
        console.log("서버 실행")
    })

    app.get('/', (req, res) => {
        res.send("메인 페이지 접속")
    })
</code>
</pre>


- app.listen() : 실제 서버를 띄우라는 뜻
- app.get() : 특정 부분에 접속하면 실행할 부분, (url, function) 으로 구성되는데, url 부분에 접속하면 function을 실행하는 식으로 진행된다.
- 참고 : 컴퓨터는 항상 외부 컴퓨터와 통신할 수 있게 설계되어 있다. 랜선만 꽂혀 있으면, 다른 사람이 나의 컴퓨터로 접속할 수 있는 구조. 웹서버 역시 다른 사람 컴퓨터에 접속하는 행위랑 같으며, 접속하면 웹페이지를 보여줄 뿐이다. 그러나 평상시에는 남들이 내 컴퓨터에 무단으로 접속할 수 없는데, 구멍을 뚫어둬서 나의 컴퓨터에 외부 사람들이 접속할 수 있게 하는 것임. 이러한 구멍을 전문 용어로 port라고 하는 것이다. 내 컴퓨터에는 마음대로 오픈할 수 있는 포트 구멍이 약 6만개 정도 있음.(이 중 컴퓨터가 예약해서 쓰고 있는 포트번호는 사용하면 안된다.) 누군가 내 컴퓨터에 접속할 수 있게 하기 위해서 8080 번째 포트를 연 것이라고 할 수 있다. 이제 외부 컴퓨터가 나의 아이피주소:8080 이라고 브라우저 주소창에 입력하면 내 컴퓨터로 들어올 수 있게 되는 것이다. (이 아이피는 ipconfig 치면 나오는 주소다.) 

### html 파일 보내기

특정 경로로 접속했을 때, html 파일을 뿌려주고 싶다면 다음과 같이 구성한다. 

<pre>
<code>

    app.get('/', (req, res) => {
        res.sendFile(__dirname + "/index.html")
    })

</code>
</pre>

- .sendFile()은 안의 인자를 유저에게 보여주는 역할을 한다.
- __dirname은 server.js 파일의 절대경로가 나오게 된다.
- 소스 코드를 수정했을 경우 ctrl+c를 눌러서 서버를 종료하고, node server.js를 입력해야 수정사항을 미리볼 수 있다. 이게 귀찮으면 nodemon를 사용해야 하는데, 'npm install -g nodemon' 명령어를 통해 설치하자.

### static 파일 넣기

대표적인 static 파일이라고 하면 css 파일이 있을 것임
통상적으로 public 디렉토리 안에 css 파일을 만든다.
우선 public 디렉토리를 등록해주자

<pre>
<code>

    app.use(express.static(__dirname + '/public'));

</code>
</pre>

이렇게 등록헀다면, html 파일 내에서
'<link href="/main.css" rel="stylesheet">'
와 같은 코드를 사용하여 css 파일을 사용할 수 있다.
(이는 img 등의 파일 등도 같음)


### mongo DB 사용하기

DB는 관계형과 비관계형 데이터베이스가 있는데,
관계형은 SQL 문법에 대한 이해와 정규화/비정규화를 신경써야 한다는 점이 제약일 수 있다.
좀 더 자유로운 형식으로 데이터를 저장
예를 들어, Redis는 { 데이터 이름 : 데이터 값 } 형식으로 데이터를 저장할 수 있고, mongoDB도 이와 유사함.
정규화를 안 하고 저장하는 게 권장사항이라서 데이터를 입출력할 때 생각할 게 없어서 빠르게 가능함. 물론 데이터 정확도가 떨어지기 때문에, 그런 부분이 중요한 서비스면 관계형 DB를 사용해야 한다. 


- mongoDB Atlas 가입 및 초기 세팅
1. mongodb.com 들어가서 가입 - M0 tier/seoul 선택
2. database Access 메뉴에서 DB 접속용 아이디/비번 생성, 역할을 atlas admin으로 설정해 줘야 한다.
3. Network Access 메뉴에서 IP를 추가한다 (allow access from anywhere이나 0.0.0.0/0을 추가하면 어디서든 접속할 수 있게 할 수 있음)


MongoDB는 document 데이터베이스라고 부르기도 하는데,
collection(폴더, table)을 만들고 그 안에 document(파일, row)를 만들어 데이터를 기록한다.
document에다 데이터를 기록하는데, 자바스크립트 object 자료와 똑같은 모습으로 기록한다.


-- 사용 방법 2 가지
1. 컴퓨터에 직접 mongoDB 설치
2. 클라우드에서 호스팅받아 사용

yanqhwa
1dqLaLLM5xW9ZQsr

### mongoDB를 node.js에 연결하기

예를 들어 글을 하나 DB에 저장하고 싶다면,
유저가 서버로 게시물을 보내고
서버는 그걸 검열한 후에 DB에 저장한다

'npm install mongodb@5'

한 후에 아래 코드를 서버 파일 상단에 추가한다.

<pre>
<code>

    const { MongoClient } = require('mongodb')

    let db
    const url = 'mongodb사이트에 있던 님들의 DB 접속 URL'
    new MongoClient(url).connect().then((client)=>{
    console.log('DB연결성공')
    db = client.db('forum')
    }).catch((err)=>{
    console.log(err)
    })

</code>
</pre>


- objectId의 특징 : 서로 중복되지 않고, 먼저 만든 document가 낮은 ObjectId를 가지고 있음 (자동부여)

- - -

### 웹페이지에 DB 데이터 꽂기 (EJS/서버사이드 렌더링)

 npm install ejs
 app.set('view engine', 'ejs') 
 - 서버 파일 상단에 view engine 쓰겠다고 선언
 - ejs 파일들은 views 라는 폴더에 만들어서 보관해야 함 (post.ejs 로 저장)


 <pre>
<code>

    app.get('/list', async (요청, 응답) => {
        let result = await db.collection('post').find().toArray()
        응답.render('list.ejs', { 글목록 : result })
    })  


    (list.ejs 파일 아무데나)
    <%= JSON.stringify(글목록) %>

    <% for (var i = 0; 글목록.length < 2; i++) { %>
        <hr>
        <div class="list-box">
            <h4><%= JSON.stringify(글목록[i].title) %></h4>
            <p><%= JSON.stringify(글목록[i].content) %></p>
        </div>
        <hr>
    <% } %>

</code>
</pre>


서버사이드 렌더링과 클라이언트사이드렌더링

html 조립식으로 첨부하기

<%- include('nav.ejs') %>

<%- %> <%= %> 차이 조사
<%- %> 사용하면 그 안에 들어있는게 html인 경우 그걸 실제로 렌더링해줍니다.
<%= %> 사용하면 그 안에 들어있는게 html이어도 그걸 렌더링해주진 않고 일반 문자처럼 보여줍니다.