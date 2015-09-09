// JavaScript Document
function showNumberAnimation(i,j,randNumber){
	var numberCeil=$("#number_ceil_"+i+"_"+j);
	
	numberCeil.css("background-color",getNumberBackgroundColor(randNumber));
	numberCeil.css("color",getNumberColor(randNumber));
	numberCeil.text(randNumber);
	
	numberCeil.animate({
		width:ceilSideLength,
		height:ceilSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j),
	},50);
}

function showMoveAnimate(fromx,fromy,tox,toy){
	var numberCeil=$("#number_ceil_"+fromx+"_"+fromy);
	numberCeil.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy),
	},200);
}
function updateScore(score){
	$("#score").text(score);
}