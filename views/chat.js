var socket=io();
var userId='#{getId}';
var sendBox
var msgBox

socket.emit('myId',{id:userId})
socket.on('new',(data)=>{
	var userName=data.user;
	var msg=data.msg;
	document.getElementById('msgBox').innerHTML += "<p>" + userName+": "+msg+"</p>";
	msgBox.scrollTo(0,msgBox.scrollHeight)

})
function sendMsg(){
var msga=document.getElementById('sendBox').value;
document.getElementById('sendBox').value='';
sendBox.focus();
socket.emit('new msg',{id:userId,msg:msga});
}

window.onkeypress=(event)=>{
	if(event.keyCode===13)
		sendMsg();
}

window.onresize=(event)=>{
	setHeigt()
	msgBox.scrollTo(0,msgBox.scrollHeight)
}
window.onload=(event)=>{
	setHeigt();
	sendBox=document.getElementById('sendBox');
	msgBox=document.getElementById('msgBox')
}

function setHeigt(){
	var winHeight=window.innerHeight;
	var elmHeight=document.getElementById('bottom').offsetHeight;
	var box=document.getElementById('msgBox')
	box.style.height=(winHeight-elmHeight)+'px';
}