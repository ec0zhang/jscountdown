/**
 * Created by zhangchen on 18-5-30.
 */
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;//全局变量，这样的好处，1.屏幕的大小改变起来特别的方便
var RADIUS = 8;                          // 2.在做屏幕的自适应的时候只需要计算着两个值就好了
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2018,8,16,21,00,00);//js的Date中设置月份是从0~11    const定义，不可修改而且必须初始化
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","CC0000"];

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");


    canvas.width = WINDOW_WIDTH;    //全局变量引用
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(
        function () {
            render( context );
            update();
        },
        50
    );
                                 //render( context );//context为绘图的上下文环境，render是绘制函数
};
function getCurrentShowTimeSeconds() {     //获取倒计时的差值，秒
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    ret = Math.round( ret/1000 );

    return ret >= 0 ? ret : 0;
}

function update() {              //如果仅仅是获取时间的话，也可以使用render函数，这里分出来主要是因为小球的动画也需要使用这个

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds/3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600)/60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds/3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600)/60);
    var curSeconds = curShowTimeSeconds % 60;

    if ( nextSeconds != curSeconds ){
        if ( parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls ( MARGIN_LEFT + 0, MARGIN_TOP , parseInt( curHours/10 ));
        }
        if ( parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls ( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , (curHours/10));
        }
        if ( parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls ( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , (curMinutes/10));
        }
        if ( parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls ( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , (curMinutes%10));
        }
        if ( parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls ( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , (curSeconds/10));
        }
        if (parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls ( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , (nextSeconds%10));
        }
     curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
}

function updateBalls() {
    for ( var i = 0 ; i< balls.length ; i ++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }

    }
    
}

function addBalls( x , y , num) {

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if ( digit[num][i][j] == 1 ) {
                var aBall = {
                    x: x+j*2*(RADIUS+1)+(RADIUS+1),
                    y: y+i*2*(RADIUS+1)+(RADIUS+1),
                    g: 1.5+Math.random(),
                    vx: Math.pow( -1 , Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[ Math.floor( Math.random() * colors.length) ]
                };
                balls.push(aBall)
            }
}

function render( cxt ){

    cxt.clearRect( 0 , 0 , WINDOW_WIDTH , WINDOW_HEIGHT );//刷新框内部分

    var hours = parseInt(curShowTimeSeconds/3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600)/60);
    var seconds = curShowTimeSeconds % 60;

    renderDigit( MARGIN_LEFT , MARGIN_TOP ,parseInt(hours/10) , cxt);//cxt绘图的上下文环境
    renderDigit( MARGIN_LEFT+15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt);
    renderDigit( MARGIN_LEFT+30*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
    renderDigit( MARGIN_LEFT+39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
    renderDigit( MARGIN_LEFT+54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
    renderDigit( MARGIN_LEFT+69*(RADIUS+1) , MARGIN_TOP , 10 , cxt)
    renderDigit( MARGIN_LEFT+78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
    renderDigit( MARGIN_LEFT+93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

    for ( var i = 0 ; i < balls.length ; i ++){
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true);
        cxt.closePath();

        cxt.fill();
    }
}
function renderDigit( x , y , num , cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for( var i = 0 ; i<digit[num].length ; i++)
        for( var j = 0 ; j<digit[num][i].length ; j++)
            if ( digit[num][i][j] == 1){
        cxt.beginPath();
        cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , Math.PI*2);

        cxt.fill()
    }


}
