var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
canvasSize(yyy)



function canvasSize(yyy) {
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight
yyy.width = pageWidth
yyy.height = pageHeight
}
window.onresize = function() {
    canvasSize()
}



function drawCircle(x,y,radius){
context.beginPath()
context.arc(x,y,radius,0,Math.PI*2)
context.fill()
}

function drawLine(x1,y1,x2,y2) {
    context.beginPath()
    context.moveTo(x1,y1)//起点
    context.lineWidth = 3
    context.lineTo(x2,y2)//终点
    context.strokeStyle = 'black'
    context.stroke()
    context.closePath()   
}


var usingEraser = false
eraser.onclick = function() {
    usingEraser = true
    actions.className = "actions x"
}
//橡皮擦
brush.onclick = function() {
    usingEraser = false
    actions.className = "actions"
}

var lastPoint ={x:undefined,y:undefined}
var painting = false



//特性检测
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






