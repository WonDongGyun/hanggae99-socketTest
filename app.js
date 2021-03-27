const express = require('express');
const socketIo = require('socket.io');
// nodejs의 기본 웹서버 라이브러리. express는 http를 상속받아서 만들어진 모듈임
const Http = require('http');

const app = express();

// Http.createServer가 다른 http 서버를 받아서 확장할 수 있다. 기존의 http서버에 expree서버를 추가하여 확장한 식이 된다.
const http = Http.createServer(app);

// origin - 여기 명시된 서버만 내서버로 연결을 허용함. 
// methods - 허용할 HTTP method
// 인자로 포트대신, http 서버를 받게 되면, socketio가 자체적으로 이 http 서버에 soketio를 연결하는 router를 붙인다.
const io = socketIo(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


app.get('/test', (req, res) => {
    res.send('익스프레스 잘 켜져 있습니다.');
})


//http 서버 키기
http.listen(3000, () => {
    console.log('서버가 켜졌습니다.');
});

// 사람들이 연결할 때마다 소켓이 하나하나씩 생긴다.
// emit - 커스텀 이벤트를 만들 수 있습니다.
io.on('connection', (socket) => {
    console.log('연결 완료')

    socket.send('연결 잘 됐어요')

    socket.emit('customEventName', '새로운 이벤트인가?');
})