// JavaScript Document
var board=new Array();
var score=0;
var hasConflicted=new Array();

var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function() {
	prepareForMobile();
	newGame();
    
});

function prepareForMobile(){
	if(documentWidth>=500){
		gridContainerWidth=500;
		ceilSpace=20;
		ceilSideLength=100;
	}
	
	$("#grid_container").css("width",gridContainerWidth-2*ceilSpace);
	$("#grid_container").css("height",gridContainerWidth-2*ceilSpace);
	$("#grid_container").css("padding",ceilSpace);
	$("#grid_container").css("border-radius",0.02*gridContainerWidth);
	
	$(".grid_ceil").css("width",ceilSideLength);
	$(".grid_ceil").css("height",ceilSideLength);
	$(".grid_ceil").css("border-radius",0.02*ceilSideLength);
	
}

function newGame(){
	//初始化棋盘格
	init();
	//随机生成两个格子的数字
	generateOneNumber();
	generateOneNumber();
}

function init(){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			//用jquery找各个单元
			var gridCeil=$("#grid_ceil_"+i+"_"+j);
			gridCeil.css("top",getPosTop(i,j));
			gridCeil.css("left",getPosLeft(i,j));
		}
	for(var i=0;i<4;i++){
		hasConflicted[i]=new Array();
		board[i]=new Array();
		for(var j=0;j<4;j++){
			//初始化棋盘的数字
			board[i][j]=0;
			//是否冲突初始化为否
			hasConflicted[i][j]=false;
		}
	}
	score=0;
	updateScore(score);
	updateBoardView();
}
//刷新界面
function updateBoardView(){
	//先全部移走
	$(".number_ceil").remove();
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			$("#grid_container").append('<div class="number_ceil" id="number_ceil_'+i+'_'+j+'"></div>');
			var theNumberCeil=$('#number_ceil_'+i+'_'+j);
			
			if(board[i][j]==0){
				theNumberCeil.css("width","0px");
				theNumberCeil.css("height","0px");
				theNumberCeil.css("top",getPosTop(i,j)+0.5*ceilSideLength);//各方格的中心
				theNumberCeil.css("left",getPosLeft(i,j)+0.5*ceilSideLength);
			}
			else{
				theNumberCeil.css("width",ceilSideLength);
				theNumberCeil.css("height",ceilSideLength);
				theNumberCeil.css("top",getPosTop(i,j));//各方格的中心
				theNumberCeil.css("left",getPosLeft(i,j));
				theNumberCeil.css("background-color",getNumberBackgroundColor(board[i][j]));
				theNumberCeil.css("color",getNumberColor(board[i][j]));
				theNumberCeil.text(board[i][j]);
			}
			
			hasConflicted[i][j]=false;
		}
	$(".number_ceil").css("line-height",ceilSideLength+"px");
	$(".number_ceil").css("font-size",0.6*ceilSideLength+"px");
}



function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;
		case 4:return "#cde08c";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
	}
	return "black";
}

function getNumberColor(number){
	if(number<=4)
		return "#776e65";
	return "white";
}

function generateOneNumber(){
	if(nospace(board)) return false;
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	
	var times=0;
	while(times<50){
		if(board[randx][randy]==0)
			break;
			
		randx=parseInt(Math.floor(Math.random()*4));
	    randy=parseInt(Math.floor(Math.random()*4));
		
		times++;
	}
	if(times==50){
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j;
				}
			}
	}
		
	//随机一个数字
	var randNumber=Math.random()<0.5?2:4;
	
	//在随机位置显示随机数
	board[randx][randy]=randNumber;
	showNumberAnimation(randx,randy,randNumber);
	
	return true;
}
$(document).keydown(function(event){
	event.preventDefault();//阻挡键盘--默认效果
	switch(event.keyCode){
		case 37://Left
			//event.preventDefault();//阻挡键盘--默认效果
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 38://Up
			//event.preventDefault();//阻挡键盘--默认效果
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 39://right
			//event.preventDefault();//阻挡键盘--默认效果
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		case 40://down
			//event.preventDefault();//阻挡键盘--默认效果
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
			break;
		default:
			break;
	}
})

//事件监听器
document.addEventListener("touchstart",function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
})

document.addEventListener("touchmove",function(event){
	event.preventDefault();//阻挡手势识别默认效果
})

document.addEventListener("touchend",function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;
	
	var deltax=endx-startx;
	var deltay=endy-starty;
	
	if((Math.abs(deltax)<0.3*documentWidth)&&(Math.abs(deltay)<0.3*documentWidth))
		return;
	
	if(Math.abs(deltax)>=Math.abs(deltay)){
		if(deltax>0){
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
		    }
		}
		else{
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}
	else{
		if(deltay>0){
			//movedown
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
		else{
			//moveup
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameOver()",300);
			}
		}
	}
})

function isGameOver(){
	if(nospace(board)&&nomove(board))
		gameover();	
}
function gameover(){
	alert("gameover");
}

function moveLeft(){
	if(!canMoveLeft(board)) return false;
	//moveLeft
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
					//move
						showMoveAnimate(i,j,i,k);//移过去覆盖在上面的效果
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&hasConflicted[i][k]==false){
						//move
						showMoveAnimate(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//score
						score+=board[i][k];
						updateScore(score);
						
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveUp(){
	if(!canMoveUp(board)) return false;
	//moveUp
	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noBlockVertical(k,i,j,board)){
					//move
						showMoveAnimate(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(k,i,j,board)&&hasConflicted[k][j]==false){
						//move
						showMoveAnimate(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//score
						score+=board[k][j];
						updateScore(score);
						
						hasConflicted[k][j]=true;
						continue;
					}	
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveDown(){
	if(!canMoveDown(board)) return false;
	//moveUp
	for(var i=2;i>=0;i--)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noBlockVertical(i,k,j,board)){
					//move
						showMoveAnimate(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(i,k,j,board)&&hasConflicted[k][j]==false){
						//move
						showMoveAnimate(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//score
						score+=board[k][j];
						updateScore(score);
						
						hasConflicted[k][j]=true;
						continue;
					}	
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveRight(){
	if(!canMoveRight(board)) return false;
	//moveLeft
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
					//move
						showMoveAnimate(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&hasConflicted[k][j]==false){
						//move
						showMoveAnimate(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//score
						score+=board[i][k];
						updateScore(score);
						
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}
