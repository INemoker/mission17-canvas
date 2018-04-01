var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
canvasSize(yyy)
var lineWidth = 3



function canvasSize(yyy) {
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight
yyy.width = pageWidth
yyy.height = pageHeight
}
window.onresize = function() {
    canvasSize()
}

context.fillStyle = "white";
context.fillRect(0,0,yyy.width,yyy.height);

// function drawCircle(x,y,radius){
// context.beginPath()
// context.arc(x,y,radius,0,Math.PI*2)
// context.fill()
// }

function drawLine(x1,y1,x2,y2) {
    context.beginPath()
    context.moveTo(x1,y1)//起点
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)//终点
    context.stroke()
    context.closePath()  
}


var usingEraser = false
eraser.onclick = function() {
    usingEraser = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}
//橡皮擦
brush.onclick = function() {
    usingEraser = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0,0,yyy.width,yyy.height);
    context.fillRect(0,0,yyy.width,yyy.height);
}
download.onclick = function(){
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = "picture"
    a.target = "_blank"
    a.click()
}

var lastPoint ={x:undefined,y:undefined}
var painting = false

black.onclick = function(){
    context.strokeStyle = 'black'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.add('active')
}
red.onclick = function(){
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}

thin.onclick = function(){
    lineWidth = 3
}
thick.onclick = function(){
    lineWidth = 6
}

//特性检测
paintingBegin:
if(document.body.ontouchstart !== undefined){
    xxx.ontouchstart = function(aaa){
        console.log('开始摸我了')
        console.log(aaa)
        painting = true
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        // 这都是相对于视口的位置
        console.log(x,y)
        if(usingEraser) {
            context.clearRect(x-5,y-5,10,10)
        }else{
            lastPoint = {'x':x,'y':y}
        }
    }
    xxx.ontouchmove = function(aaa){
        console.log('边摸变动')
        if(painting){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
        // 这都是相对于视口的位置
            if(usingEraser) {
                context.clearRect(x-5,y-5,20,20)
            }else {
            var newPoint = {'x':x,'y':y}
            // drawCircle(x,y,5)
            drawLine (lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint = newPoint 
            }
            // 这一点很难
            
        }else{

        }
    }
    xxx.ontouchend = function(){
        console.log('摸完了')
        paiting = false
    }   
}else{
    yyy.onmousedown = function(aaa){
        painting = true
        var x = aaa.clientX
        var y = aaa.clientY
        // 这都是相对于视口的位置
        if(usingEraser) {
            context.clearRect(x-5,y-5,10,10)
        }else{
            lastPoint = {'x':x,'y':y}
        }
        // drawCircle(x,y,3)
    }
    yyy.onmousemove = function(aaa){
        if(painting){
            var x = aaa.clientX
            var y = aaa.clientY
        // 这都是相对于视口的位置
            if(usingEraser) {
                context.clearRect(x-5,y-5,20,20)
            }else {
            var newPoint = {'x':x,'y':y}
            // drawCircle(x,y,5)
            drawLine (lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint = newPoint 
            }
            // 这一点很难
            
        }else{

        }
    }
    yyy.onmouseup = function(aaa){
    painting = false   
    }
}






