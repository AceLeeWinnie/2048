// JavaScript Document
documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;
ceilSideLength=0.18*documentWidth;
ceilSpace=0.04*documentWidth;

function getPosTop(i,j){
	return ceilSpace+i*(ceilSpace+ceilSideLength);
}
function getPosLeft(i,j){
	return  ceilSpace+j*(ceilSpace+ceilSideLength);
}
function nospace(board){
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]==0)
				return false;
		}
	return true;
			
}
function canMoveLeft(board){
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0)
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])
					return true;
		}
	return false;
}
function canMoveUp(board){
	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0)
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])
					return true;
		}
	return false;
}
function canMoveDown(board){
	for(var i=2;i>=0;i--)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0)
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])
					return true;
		}
	return false;
}
function canMoveRight(board){
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0)
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])
					return true;
		}
	return false;
}
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++)
		if(board[row][i]!=0)
			return false;
	return true;
}
function noBlockVertical(row1,row2,col,board){
	for(var i=row1+1;i<row2;i++)
		if(board[i][col]!=0)
			return false;
	return true;
}
//不能移动
function nomove(board){
	if(canMoveLeft(board)||
	   canMoveRight(board)||
	   canMoveUp(board)||
	   canMoveDown(board))
		return false;
	return true;
}
