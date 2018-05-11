var check=require('./dBase').CheckById;
var cookieParser = require('socket.io-cookie');

function ok(socket,io) {
	socket.on('new msg',(data)=>{
		var id=data.id;
		var msgCont=data.msg;
		if (msgCont.trim()=="") {
			return
		}
		check(id,(result,userInfo)=>{
			if (result) {
				io.emit('new',{user:userInfo.name,msg:msgCont})
			}else {
				socket.emit('errorId',{});
			}
		})
	})
}

function start(http) {
	var io=require('socket.io')(http);
	io.use(cookieParser);

	io.on('connection',(socket)=>{
		socket.on('myId',(data)=>{
			check(data.id,(result,user)=>{
				if (result){
					ok(socket,io)
				}
			})
		})
	});
}

module.exports={
	"start":start
}