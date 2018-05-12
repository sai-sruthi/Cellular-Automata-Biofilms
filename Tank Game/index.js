
(function (){
 	
	var tank=document.getElementById('tank');

	var hwal =  document.querySelectorAll('[hwallno]');
	var vwal =  document.querySelectorAll('.vwall');
	var ground = document.getElementById('ground');
	var turret = document.getElementById('turret');
	var spanscore = document.getElementById('spanscore');

	var trophy = document.getElementById('trophy');
	var value = 1000;
	spanscore.innerHTML=value;
	function score(){
	value--;
	spanscore.innerHTML=value;
	
	}
	window.setInterval(score,1000);
	

	if(tank.style.top === ''){
		tank.style.top = '0px';
		tank.style.left = '85%';
		tank.direction = 'south';
	}

	function F2Run(){
	deltaX = 0;
	deltaY = 0;
	dx = 1;
	dy = 2;	

	switch(window.event.which){
	
	case 97:
		if(tank.direction === 'south'){
			tank.direction = 'east';
		}
		else if(tank.direction === 'east'){

			tank.direction = 'north';

		}else if(tank.direction === 'north'){

			tank.direction = 'west';
		}
		else if(tank.direction === 'west'){

			tank.direction = 'south';
		}

	tank.className = tank.direction;	
			
	break;
	
	case 100:

		if(tank.direction === 'south'){
			tank.direction = 'west';
		}
		else if(tank.direction === 'west'){

			tank.direction = 'north';

		}else if(tank.direction === 'north'){

			tank.direction = 'east';
		}
		else if(tank.direction === 'east'){

			tank.direction = 'south';
		}

	tank.className = tank.direction;
	break;

	case 115:
	
		if(tank.direction === 'south'){
			deltaY= +1*dy;
		}
		else if(tank.direction === 'west'){

			deltaX= -1*dx;

		}else if(tank.direction === 'north'){

			deltaY= -1*dy;
		}
		else if(tank.direction === 'east'){

			deltaX= +1*dx;
		}
	break;
	
	case 119:
		if(tank.direction === 'south'){
			deltaY= -1*dy;
		}
		else if(tank.direction === 'west'){

			deltaX= +1*dx;

		}else if(tank.direction === 'north'){

			deltaY= +1*dy;
		}
		else if(tank.direction === 'east'){

			deltaX= -1*dx;
		}

		break;
	}

	var orgT = window.parseInt(tank.style.top, 10);
	var orgL = window.parseInt(tank.style.left, 10);

 	tank.style.top = orgT+ deltaY + 'px';

	tank.style.left = orgL+ deltaX + '%';

	window.scrollBy(0,deltaY);
	
	window.setTimeout(check, 0);
	
	
	
	
}


	function check (){

	for(i=0 ;i < hwal.length;i++){
	if(collision(hwal[i],tank) || collision(hwal[i],turret) ){
		window.alert('Game Over');


	}
	
	
	}
	for(i=0 ;i < vwal.length;i++){

	if(collision(vwal[i],tank) || collision(vwal[i],turret) ){
		window.alert('Game Over');


	}
	
	
	}

	if(!collision(ground,tank) || !collision(ground,turret) ){
		window.alert('Game Over');
	}
	
	if(collision(trophy,tank)|| collision(trophy,turret)){
		window.alert('Game Over, you won with a score of '+ value );
	}


	}
	
	function collision (box1, box2){
		
		box1=box1.getBoundingClientRect();
		box2 = box2.getBoundingClientRect();
		var y1= box1.top, y2= box2.top;
		var x1= box1.left, x2=box2.left;
		var h1= box1.height , h2=box2.height;
		var w1= box1.width , w2=box2.width;
		
		


		if((x2>=x1)&&(x2<=x1+w1)){
			if((y2>=y1)&& (y2<=y1+h1)){
				return true;
			}
			if((y1>=y2) && (y1<=y2+h2)){

				return true;
			}


		}
		if((x1>=x2)&&(x1<=x2+w2)){
			if((y2>=y1)&& (y2<=y1+h1)){
				return true;
			}
			if((y1>=y2) && (y1<=y2+h2)){

				return true;
			}


		}
		

	 return false;

	}
	
	window.addEventListener("keypress",F2Run);

}) ();