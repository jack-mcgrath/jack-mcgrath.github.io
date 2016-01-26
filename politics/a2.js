$(document).ready(function () {
      var current_game = null;
      var timer=null;
      var speed=500;
  $(document).ready(function (e) {
   // e.preventDefault();
    if(current_game!=null){
    	current_game.reset();
    }
    var width = parseInt($("#width").val());
    if(!$('#width').val()){
      width=100;
    }
    if (isNaN(width) || width < 20 || width > 200) {

    //  alert("Illegal width: " + $("#width").val());
     //   return;
    }
    var height = parseInt($("#height").val());
    if(!$('#height').val()){
      height=40;
    }

    if (isNaN(height) || height < 20 || height > 200) {
       // alert("Illegal height: " + $("#height").val());
        //return;
     }
    speed = parseInt($("#speed").val());
    if(!$('#speed').val()){
      speed=150;
    }

    if (isNaN(speed) || speed < 0 || speed> 1000) {
        alert("Speed is invalid: " + $("#speed").val());
        return;
    }
    ////alert("speed: "+ speed);
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
    if(edges==undefined){
    	edges="dead";
    }
    current_game = new GameOfLife($("#board"), width, height, speed, radius, under, over, gmin, gmax,edges);
});
  $("#step_button").click(function(e){
    e.preventDefault();
    
    ////alert(ne);
    current_game.step();
    return false;
  });
  $("#go_button").click(function(e){
    $("#step_button").hide();

    e.preventDefault();
    ////alert(speed)
    if(timer!=null){
      clearInterval(timer);
    }
  //  //alert("timer is "+ speed);
    speed=parseInt(speed);
    //alert("timer is "+ speed);

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

//  //alert(this.width);
  var kill=new Array();
  var makeAlive = new Array();
  var ma=0;
  var ka=0;
  //alert("edges: "+this.edges);

  if(this.edges=="dead"){
  	//alert("hi jack!");
    for(var i=0;i<this.height;i++){
      for(var j=0; j<this.width;j++){
      //  //alert(radius);
      //  //alert(this.spaces[i][j]);


        var aliveNeighbors=0;
      //  //alert("radius");


        for(var k=this.radius;k>0;k--){
      //    //alert("hihi");
        //  //alert("yo: "+this.spaces[i-k][j-k]);
        //  if(this.spaces[i-k][j-k]!=undefined){
          if(i-k>=0){
            if(j-k>=0){
              if(this.spaces[i-k][j-k].alive){
                ////alert((i-k) +" "+(j-k)+"is alive compared to "+i+ " "+j);
                aliveNeighbors++;
            //    //alert(1);
            //    //alert(aliveNeighbors+" top left");

              }
            }
            if(this.spaces[i-k][j].alive){
              ////alert(aliveNeighbors);
            //  //alert(2);

              aliveNeighbors++;
          //    //alert(aliveNeighbors+"top");

            }
            
            if(j+k<this.width){
              ////alert("hmm"+ " " +i +" "+j)
              if(this.spaces[i-k][j+k].alive){
                aliveNeighbors++;
              //  //alert(3);
            //    //alert(aliveNeighbors+"top right");

              }
            }
          }  
          if(j-k>=0){
            if(this.spaces[i][j-k].alive){
            
          //  //alert(4);
              aliveNeighbors++;
              ////alert(aliveNeighbors+" left of "+ i + " "+j);

            }
          }
          if(j+k<this.width){
            if(this.spaces[i][j+k].alive){
            ////alert(5);
              aliveNeighbors++;
            //  //alert(aliveNeighbors);

            }
          }
          if(i+k<this.height){
            if(j-k>=0){
              if(this.spaces[i+k][j-k].alive){
              //  //alert(6);
                aliveNeighbors++;
                ////alert(aliveNeighbors);

              }
            }
            if(this.spaces[i+k][j].alive){
              ////alert(aliveNeighbors);
            //  //alert(7);
              aliveNeighbors++;
            }
            
            if(j+k<this.width){
              if(this.spaces[i+k][j+k].alive){
                ////alert(aliveNeighbors);
              //  //alert(8);
              //  //alert(l+" "+k);
                aliveNeighbors++;
              //  //alert(aliveNeighbors);

              }
            }
          }
          ////alert("total aliveNeighbors for " +i+ " "+j+" : "+aliveNeighbors);
          if(!this.spaces[i][j].alive){
            if(aliveNeighbors>=this.gmin&&aliveNeighbors<=this.gmax){
              ////alert("hallo " + i+" "+j +" "+aliveNeighbors);
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
  }
  if(this.edges=="alive"){
  //  //alert("hi!");
    for(var i=0;i<this.height;i++){
      for(var j=0; j<this.width;j++){
      	aliveNeighbors=0;
        for(var k=1;k>0;k--){
    //    //alert("hihi");
      //  //alert("yo: "+this.spaces[i-k][j-k]);
      //  if(this.spaces[i-k][j-k]!=undefined){
          if(i-k>=0){
            if(j-k>=0){
              if(this.spaces[i-k][j-k].alive){
                ////alert((i-k) +" "+(j-k)+"is alive compared to "+i+ " "+j);
                aliveNeighbors++;
              //  //alert(1);
            //    //alert(aliveNeighbors+" top left");

              }
            }
            else{
              aliveNeighbors++;
            }
            if(this.spaces[i-k][j].alive){
              ////alert(aliveNeighbors);
            //  //alert(2);

              aliveNeighbors++;
            //  //alert(aliveNeighbors+"top");

            }
            
            if(j+k<this.width){
              ////alert("hmm"+ " " +i +" "+j)
              if(this.spaces[i-k][j+k].alive){
                aliveNeighbors++;
              //  //alert(3);
            //    //alert(aliveNeighbors+"top right");

              }
            }
            else{
              aliveNeighbors++;
            }
          
          }
          else{
            aliveNeighbors=aliveNeighbors+3;
          }  
          if(j-k>=0){
            if(this.spaces[i][j-k].alive){
            
          //  //alert(4);
              aliveNeighbors++;
              ////alert(aliveNeighbors+" left of "+ i + " "+j);

            }
          }
          else{
            aliveNeighbors++;
          }
          if(j+k<this.width){
            if(this.spaces[i][j+k].alive){
            ////alert(5);
              aliveNeighbors++;
            //  //alert(aliveNeighbors);

            }
          }
          else{
            aliveNeighbors++;
          }
          if(i+k<this.height){
            if(j-k>=0){
              if(this.spaces[i+k][j-k].alive){
              //  //alert(6);
                aliveNeighbors++;
                ////alert(aliveNeighbors);

              }
            }
            else{
              aliveNeighbors++;
            }
            if(this.spaces[i+k][j].alive){
              ////alert(aliveNeighbors);
            //  //alert(7);
              aliveNeighbors++;
            }
            
            if(j+k<this.width){
              if(this.spaces[i+k][j+k].alive){
                ////alert(aliveNeighbors);
              //  //alert(8);
              //  //alert(l+" "+k);
                aliveNeighbors++;
              //  //alert(aliveNeighbors);

              }
            }
            else{
              aliveNeighbors++;
            }
          }
          else{
            aliveNeighbors=aliveNeighbors+3;
          }
          if(!this.spaces[i][j].alive){
          	//alert("gmin"+this.gmin);
            if(aliveNeighbors>=this.gmin&&aliveNeighbors<=this.gmax){
            //  //alert("hallo " + j+" "+k);
              //this.spaces[i][j].comeAlive();
              makeAlive[ma]=this.spaces[i][j];
              ma++;
              //alert("ma going up:" +ma);
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
  }
   if(this.edges=="toroidal"){
   	var z;
   	var h;
  		for(var i=0;i<this.height;i++){
      		for(var j=0; j<this.width;j++){
      			aliveNeighbors=0;
				for(var k=1;k>0;k--){
					var a=0;
			//		//alert("hihi");
				//	//alert("yo: "+this.spaces[i-k][j-k]);
				//	if(this.spaces[i-k][j-k]!=undefined){
					if(i-k>=0){
						if(j-k>=0){
							if(this.spaces[i-k][j-k].alive){
								////alert((i-k) +" "+(j-k)+"is alive compared to "+i+ " "+j);
								//alert("huh");
								aliveNeighbors++;
								//alert("alive neighbor of "+i+ " "+j+" found!"+a);
								
							//	//alert(1);
						//		//alert(aliveNeighbors+" top left");

							}
						}else{
							if(this.spaces[i-k][this.width-1].alive){
								aliveNeighbors++;
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
							}
						}
						if(this.spaces[i-k][j].alive){
							////alert(aliveNeighbors);
						//	//alert(2);

							aliveNeighbors++;
							//alert("alive neighbor of "+i+ " "+j+" found !"+a);
							
						//	//alert(aliveNeighbors+"top");

						}
						
						// z=this.width%(j+k);
						if(j+k<this.width){
						// 	//alert("mod"+i+" "+j+" "+z);
							////alert("hmm"+ " " +i +" "+j)
							if(this.spaces[i-k][j+k].alive){
								aliveNeighbors++;
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
							//	//alert(3);
						//		//alert(aliveNeighbors+"top right");

							}
						}
						else{
							if(this.spaces[i-k][0].alive){
								aliveNeighbors++;
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
							}
						}
					a=1;//1
					}else{
						a=1;
						var h=this.height-1;
						if(j-k>=0){
							if(this.spaces[h][j-k].alive){
								////alert((i-k) +" "+(j-k)+"is alive compared to "+i+ " "+j);
								aliveNeighbors++;
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
							//	//alert(1);
						//		//alert(aliveNeighbors+" top left");

							}
						}
						else if(this.spaces[h][this.width-1].alive){
							aliveNeighbors++;
							//alert("alive neighbor of "+i+ " "+j+" found !"+a);
							
						}
						a=11;
						if(this.spaces[h][j].alive){
							//alert("alive neighbor of "+i+ " "+j+" found !"+a);
							
							////alert(aliveNeighbors);
						//	//alert(2);

							aliveNeighbors++;
						//	//alert(aliveNeighbors+"top");

						}
						
						//z=this.width%(j+k);
						if(j+k<width){
							////alert("hmm"+ " " +i +" "+j)
							if(this.spaces[h][j+k].alive){
								aliveNeighbors++;
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
							//	//alert(3);
						//		//alert(aliveNeighbors+"top right");

							}
						}
						else{
							if(this.spaces[h][0].alive){
								aliveNeighbors++;
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
							}
						}
					}
						a=2;//2
					if(j-k>=0){
						if(this.spaces[i][j-k].alive){
						
					//	//alert(4);
							aliveNeighbors++;
							//alert("alive neighbor of "+i+ " "+j+" found !"+a);
							
							////alert(aliveNeighbors+" left of "+ i + " "+j);

						}
					}
					else{
						if(this.spaces[i][this.width-1].alive){
						
					//	//alert(4);
					//alert("alive neighbor of "+i+ " "+j+" found !"+a);
					
							aliveNeighbors++;
							////alert(aliveNeighbors+" left of "+ i + " "+j);

						}

					}
					// z=this.width%(j+k);
					a=3;//3
					if(j+k<this.width){
						if(this.spaces[i][j+k].alive){
							////alert(5);
							//alert("alive neighbor of "+i+ " "+j+" found !"+a);
							
							aliveNeighbors++;
						//	//alert(aliveNeighbors);

						}
					}
					else{
						if(this.spaces[i][0].alive){
							//alert("alive neighbor of "+i+ " "+j+" found !"+a);
							
							aliveNeighbors++;
						}
					}
					a=4;//4
					if(i+k<this.height){
						if(j-k>=0){
							if(this.spaces[i+k][j-k].alive){
							//	//alert(6);
							//alert("alive neighbor of "+i+ " "+j+" found !"+a);
							
								aliveNeighbors++;
								////alert(aliveNeighbors);

							}
						}else{
							if(this.spaces[i+k][this.width-1].alive){
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
								aliveNeighbors++;
							}
						}
						if(this.spaces[i+k][j].alive){
							////alert(aliveNeighbors);
						//	//alert(7);
						//alert("alive neighbor of "+i+ " "+j+" found !"+a);
						
							aliveNeighbors++;
						}
						a=5;//5
						if(j+k<this.width){
							if(this.spaces[i+k][j+k].alive){
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
								////alert(aliveNeighbors);
							//	//alert(8);
							//	//alert(l+" "+k);
								aliveNeighbors++;
							//	//alert(aliveNeighbors);

							}
						}else{
							if(this.spaces[i+k][this.width-1].alive){
								aliveNeighbors++;
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
							}
						}
					}
					else{
					a;//6
						var f=0;
						if(j-k>=0){
							if(this.spaces[f][j-k].alive){
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
							//	//alert(6);
								aliveNeighbors++;
								////alert(aliveNeighbors);

							}
						}
						else{
							if(this.spaces[f][this.width-1].alive){
							//	//alert(6);
							//alert("alive neighbor of "+i+ " "+j+" found !"+a);
							
								aliveNeighbors++;
								////alert(aliveNeighbors);

							}
						}
						if(this.spaces[f][j].alive){
							//alert("alive neighbor of "+i+ " "+j+" found !"+a);
							
							////alert(aliveNeighbors);
						//	//alert(7);
							aliveNeighbors++;
						}
						
						//var g = this.width%(j+k);
						if(j+k<this.width){
							if(this.spaces[f][j+k].alive){
								////alert(aliveNeighbors);
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
							//	//alert(8);
							//	//alert(l+" "+k);
								aliveNeighbors++;
							//	//alert(aliveNeighbors);

							}
						}
						else{
							if(this.spaces[f][this.width-1].alive){
								//alert("alive neighbor of "+i+ " "+j+" found !"+a);
								
								aliveNeighbors++;
							}
						}
					}
					if(!this.spaces[i][j].alive){
					//	//alert("hallo " + i+" "+j+" neighbors:"+aliveNeighbors);

						if(aliveNeighbors>=this.gmin&&aliveNeighbors<=this.gmax){
							//alert("hallo " + i+" "+j+" neighbors:"+aliveNeighbors);
							//this.spaces[i][j].comeAlive();
							makeAlive[ma]=this.spaces[i][j];
							ma++;
						}
					}
					else if(this.spaces[i][j].alive){
						if(aliveNeighbors>this.over||aliveNeighbors<this.under){
							//alert(i+" "+j+"dying with "+ aliveNeighbors);
							kill[ka]=this.spaces[i][j];
							ka++;
						}
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
    this.space_div.mouseover(function (e){
      e.preventDefault();
      space.shiftLeftClick();
    });
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
Space.WIDTH = 12;
Space.HEIGHT = 12;
Space.prototype.leftClick = function(){
   if(!this.space_div.alive){
     this.comeAlive();
   }
   else{
     this.die();
   }
}
Space.prototype.mouseOver
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
