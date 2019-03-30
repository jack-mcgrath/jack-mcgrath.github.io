$(document).ready(function () {
	    var current_game = null;
	    var timer=null;
	$("#submit_button").click(function (e) {
		e.preventDefault();
		var width = parseInt($("#width").val());
		if(!$('#width').val()){
			width=20;
		}
		if (isNaN(width) || width < 20 || width > 200) {

			alert("Illegal width: " + $("#width").val());
		    return;
		}
		var height = parseInt($("#height").val());
		if(!$('#height').val()){
			height=20;
		}

		if (isNaN(height) || height < 20 || height > 200) {
		    alert("Illegal height: " + $("#height").val());
		    return;
		 }
		var speed = parseInt($("#speed").val());
		if(!$('#speed').val()){
			speed=1;
		}

		if (isNaN(speed) || speed < 0 || speed> 1000) {
		    alert("Speed is invalid: " + $("#speed").val());
		    return;
		}

		var radius = parseInt($("#radius").val());
		if(!$('#radius').val()){
			radius=1;
		}
		if (isNaN(radius) || radius < 1 || radius > 10) {
		    alert("Radius invalid: " + $("#radius").val());
		    return;
		}
		var under = parseInt($("#under").val());
		if(!$('#under').val()){
			under=2;
		}
		if (isNaN(under) || under < 1 || under > 10) {
		    alert("under invalid: " + $("#under").val());
		    return;
		}
		var over = parseInt($("#over").val());
		if(!$('#over').val()){
			over=3;
		}
		if (isNaN(over) || over< 1 || over > 10) {
		    alert("over invalid: " + $("#over").val());
		    return;
		}
		var gmin = parseInt($("#gmin").val());
		if(!$('#gmin').val()){
			gmin=3;
		}
		if (isNaN(gmin) ||gmin < 1 ||gmin  > 10) {
		    alert("gmin invalid: " + $("#gmin").val());
		    return;
		}
		var gmax = parseInt($("#gmax").val());
		if(!$('#gmax').val()){
			gmax=3;
		}
		if (isNaN(gmax) || gmax< 1 ||gmax  > (4*radius*radius)+(4*radius)||gmax<gmin) {
		    alert("gmax invalid: " + $("#gmax").val());
		    return;
		}
		var edges =$("input[name=edge]:checked").val();
		current_game = new GameOfLife($("#board"), width, height, speed, radius, under, over, gmin, gmax,edges);
});
	$("#step_button").click(function(e){
		e.preventDefault();
		
		//alert(ne);
		current_game.step();
		return false;
	});
	$("#go_button").click(function(e){
		$("#step_button").hide();

		e.preventDefault();
		//alert(speed)
		if(timer!=null){
			clearInterval(timer);
		}
		timer=setInterval(function(){current_game.step();}, speed);
		//timer;
	});
	$("#stop_button").click(function(e){
		e.preventDefault();
		clearInterval(timer);
		$("#step_button").show();
	});
	$("#random_button").click(function(e){
		e.preventDefault();
		current_game.randomize();
	});
	$("#reset_button").click(function(e){
		e.preventDefault();
		current_game.reset();
	});
});
var GameOfLife = function(board_div, width, height, speed, radius, under, over, gmin, gmax, edges) {
    this.board_div = board_div;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.radius = radius;
    this.under = under;
    this.over = over;
    this.gmin = gmin;
    this.gmax = gmax;
    this.edges = edges;
    this.started = false;
    this.killed = false;
    this.spaces = new Array(height);

    $("#status_display").text("speed left: " + this.speed.toString());

    board_div.css({position: "relative",
		       width: this.width * Space.WIDTH,
		       height: this.height * Space.HEIGHT});

    for (var y=0; y<this.height; y++) {
	this.spaces[y] = new Array(width);
	for (var x=0; x<this.width; x++) {
	    var space = new Space(this, x, y);
	    this.spaces[y][x] = space;
	    board_div.append(space.getSpaceDiv());
	}	
    }
};
GameOfLife.prototype.reset = function(){
	for(var i=0;i<this.height;i++){
		for(var j=0;j<this.width;j++){
			this.spaces[i][j].resetSpace();
		}
	}
}
GameOfLife.prototype.randomize = function(){
	for(var i=0;i<this.height;i++){
		for(var j=0;j<this.width;j++){
			var rand =10*Math.random();
			if(rand>5){
				this.spaces[i][j].comeAlive();
			}
			else{
				this.spaces[i][j].die();
			}
		}
	}
}
GameOfLife.prototype.step = function(){
//	alert(this.width);
	var kill=new Array();
	var makeAlive = new Array();
	var ma=0;
	var ka=0;
	for(var i=0;i<this.height;i++){
		for(var j=0; j<this.width;j++){
		//	alert(radius);
		//	alert(this.spaces[i][j]);


			var aliveNeighbors=0;
		//	alert("radius");


			for(var k=this.radius;k>0;k--){
		//		alert("hihi");
			//	alert("yo: "+this.spaces[i-k][j-k]);
			//	if(this.spaces[i-k][j-k]!=undefined){
				if(i-k>=0){
					if(j-k>=0){
						if(this.spaces[i-k][j-k].alive){
							//alert((i-k) +" "+(j-k)+"is alive compared to "+i+ " "+j);
							aliveNeighbors++;
							alert(1);
							alert(aliveNeighbors+" top left");

						}
					}
					if(this.spaces[i-k][j].alive){
						//alert(aliveNeighbors);
					//	alert(2);

						aliveNeighbors++;
						alert(aliveNeighbors+"top");

					}
					
					if(j+k<this.width){
						//alert("hmm"+ " " +i +" "+j)
						if(this.spaces[i-k][j+k].alive){
							aliveNeighbors++;
						//	alert(3);
							alert(aliveNeighbors+"top right");

						}
					}
				
				}	
				if(j-k>=0){
					if(this.spaces[i][j-k].alive){
					
				//	alert(4);
						aliveNeighbors++;
						//alert(aliveNeighbors+" left of "+ i + " "+j);

					}
				}
				if(j+k<this.width){
					if(this.spaces[i][j+k].alive){
					//alert(5);
						aliveNeighbors++;
					//	alert(aliveNeighbors);

					}
				}
				if(i+k<this.height){
					if(j-k>=0){
						if(this.spaces[i+k][j-k].alive){
						//	alert(6);
							aliveNeighbors++;
							//alert(aliveNeighbors);

						}
					}
					if(this.spaces[i+k][j].alive){
						//alert(aliveNeighbors);
					//	alert(7);
						aliveNeighbors++;
					}
					
					if(j+k<this.width){
						if(this.spaces[i+k][j+k].alive){
							//alert(aliveNeighbors);
						//	alert(8);
						//	alert(l+" "+k);
							aliveNeighbors++;
						//	alert(aliveNeighbors);

						}
					}
				}
				alert("total aliveNeighbors for " +i+ " "+j+" : "+aliveNeighbors);
				if(!this.spaces[i][j].alive){
					if(aliveNeighbors>=this.gmin&&aliveNeighbors<=this.gmax){
						alert("hallo " + i+" "+j +" "+aliveNeighbors);
						//this.spaces[i][j].comeAlive();
						makeAlive[ma]=this.spaces[i][j];
						ma++;
					}
				}
				else if(this.spaces[i][j].alive){
					if(aliveNeighbors>this.over||aliveNeighbors<this.under){
						kill[ka]=this.spaces[i][j];
						ka++;
					}
				}
			}
		
		}
	}
	for(var l=0;l<ma;l++){

				makeAlive[l].comeAlive();
			}
			for(l=0;l<ka;l++){
				kill[l].die();
			}

}
var Space = function (board, x, y) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.unused = true;
    this.dead = false;
    this.alive = false;

    this.space_div = $("<div></div>").css({position: "absolute",
				           width: Space.WIDTH,
				           height: Space.HEIGHT,
					   top: y * Space.HEIGHT,
				           left: x * Space.WIDTH});
    this.space_div.addClass("space");
    this.space_div.addClass("unused");

    var space = this;

    this.space_div.on('mousedown', function (e) {
	e.preventDefault(); });

    this.space_div.click(function (e) {
	e.preventDefault();
	if (!e.shiftKey)  {
	    space.leftClick();
	} 
	else if(e.altKey){
		space.altLeftClick();
	}
	else if(e.shiftKey){
		space.shiftLeftClick();
	}
	else if ((e.button == 1) || ((e.button == 0) && e.shiftKey)) {
	    space.rightClick();
	}
    });

};
Space.WIDTH = 25;
Space.HEIGHT = 25;
Space.prototype.leftClick = function(){
	 if(!this.space_div.alive){
	 	this.comeAlive();
	 }
	 else{
	 	this.die();
	 }
}
Space.prototype.shiftLeftClick = function(){
	 if(!this.space_div.alive){
	 	this.comeAlive();
	 }
}
Space.prototype.altLeftClick = function(){ //and with strange aeons even death may die...
	 this.die();
	 
}
Space.prototype.getSpaceDiv = function() {
    return this.space_div;
};
Space.prototype.comeAlive = function(){
	this.space_div.alive=true;
	this.alive=true;
	this.space_div.removeClass("dead");
	this.space_div.addClass("alive");
}
Space.prototype.resetSpace = function(){
	this.alive=false;
	this.space_div.unused=true;
	this.unused=true;
	this.space_div.removeClass("dead");
	this.space_div.removeClass("alive");
	this.space_div.addClass("unused");
}
Space.prototype.die = function(){
	this.space_div.alive=false;
	this.alive=false;
	this.space_div.addClass("dead");
	this.space_div.removeClass("alive");
}
