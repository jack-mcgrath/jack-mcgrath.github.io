"use strict";
function setup(){
        var declare=null; //game type declaration
        var tN = null; //number of teams
        var z=1; //# of custom teams
        var teams = new Array();
        var done=0;
        var consent=false;
        while(true){
                declare=prompt("Choose game type:\nStandard\nCustom");
                if(declare=="defcon"){
                        teams[0]=1;
                        teams[1]=2;
                        teams=makeTeamsStandard(teams, 2);  
                        gameplay(teams, 2);
                }
                if(declare==null){
                        return;
                }
                declare=declare.toUpperCase();
                if(declare=="STANDARD"||declare=="CUSTOM"){
                        break;
                }
        }
        if(declare=="CUSTOM"){
                while(true){
                        tN=prompt("Number of teams: (Fewer than 10)");
                        if(tN==null){
                                return;
                        }
                        if(!isNaN(tN)&&tN!=""&&tN<=10){
                                break;
                        }
                        while(tN>=5){
                                tN=prompt("Maximum number of teams allowed is 10.\nNumber of teams:");
                        }
                }
       
                for (var i=0; i<tN; i++){
                        while(done==0){
                                teams[i]=prompt("Assign a nation to team "+[i+1]+" (just enter the number):\n1. AMNAT (USA and NATO Nations\n2. SOVWAR (Soviet Union and WARSAW Nations)\n3. REDCHI (China)\n4. IRLYBSIR (Israel, Lybia, Syria)\n5. INDPAK (India and Pakistan)\n6. Custom Team");
                                if(!isNaN(teams[i])){
                                        done=1;
                                }
                        }
                        if(teams[i]==null){
                                return;
                        }
                        if(teams[i]==6){
                                z++;
                        }
                        if(i>=1){
                                for (var j=0; j<i; j++){
                                        while (teams[j].nmbr==teams[i] || teams[i] =="" || teams[i]>6 || teams[i]<1|| isNaN(teams[i])){
                                        teams[i]=prompt("Try Again: Assign a nation to team "+[i+1]+":\n1. AMNAT\n2. SOVWAR\n3. REDCHI\n4. IRLYBSIR\n5. INDPAK\n6. Custom Team");
                                                if (teams[i]==null){
                                                        return;
                                                }      
                                        }      
                                }      
                        }      
                        teams[i]=makeTeamsCustom(teams[i], tN,z);      
                        done=0;
                }
                gameplay(teams, tN);
        }
        if(declare=="STANDARD"){
                while(true){
                        tN=prompt("Number of teams: (Fewer than 5)");
                        if(tN==null){
                                return;
                        }
                        if(!isNaN(tN)&&tN!=""&&tN<=5){
                                break;
                        }
                        while(tN>=5){
                                tN=prompt("Maximum number of teams allowed is 5.\nNumber of teams:");
                        }
                }
                for (var i=0; i<tN; i++){
                        done=0;
                        while(done==0){
                                teams[i]=prompt("Assign a nation to team "+[i+1]+" (just enter the number):\n1. AMNAT (USA and NATO Nations\n2. SOVWAR (Soviet Union and WARSAW Nations)\n3. REDCHI (China)\n4. IRLYBSIR (Israel, Lybia, Syria)\n5. INDPAK (India and Pakistan)");
                                if(!isNaN(teams[i])&&teams[i]<=5&&teams[i]>=1&&teams[i]!=""&&teams[i]!=null){
                                        done=1;
                                }
                        }
                        if(teams[i]==null){
                                return;
                        }
                        /*if(i>=1){
                                for (var j=0; j<i; j++){
                                        while (teams[j].nmbr==teams[i] || teams[i] =="" || teams[i]>5 || teams[i]<1||isNaN(teams[i])){ 
                                        teams[i]=prompt("Try Again: Assign a nation to team "+[i+1]+":\n1. AMNAT\n2. SOVWAR\n3. REDCHI\n4. IRLYBSIR\n5. INDPAK");
                                                if (teams[i]==null){
                                                        return;
                                                }
                                        }      
                                }
                        }*/
                        if(i>=1){
                                for(var j=0; j<i;j++){
                                        if(teams[j].nmbr==teams[i]){
                                                while(done<i){
                                                        teams[i]=prompt("Try Again: Assign a nation to team "+[i+1]+":\n1. AMNAT\n2. SOVWAR\n3. REDCHI\n4. IRLYBSIR\n5. INDPAK");
                                                        for(var k=0;k<i;k++){
                                                                if(teams[i]!=teams[k].nmbr){
                                                                        done++;
                                                                }
                                                        }
                                                }
                                        }
                                }
                        }
                        teams[i]=makeTeamsStandard(teams[i], tN);      
                }
                gameplay(teams, tN);
        }
}
 
function gameplay(teams, tN){
        var input;
        var t=1; //current turn
        var r=1; //current round (1 round = tN turns)
        var gameOn=true;
        var done=0; //for use in while statements
        while (gameOn){
                for(var i=0; i<tN; i++){
                        teams[i].pts=((teams[i].mgt/(teams[i].cap*10))+((teams[i].pop/3)*teams[i].mama));
                }      
                input = prompt("Round "+r+": Turn "+t+"\nEnter a command:\nCity Attack\nSub Attack\nStats\nDEFCON\nAward Points\nAdjust stats\nDone (QUIT)");
                input = input.toUpperCase();           
                if(input=="DONE"||input==null){
                        exit();
                }
                if(input=="CITY ATTACK"||input=="CITYATTACK"){
                        done=0;
                        while (done==0){
                                input=prompt("Agressor:");
                                input=input.toUpperCase();
                                for(var s=0; s<tN;s++){
                                        if(teams[s].name==input){
                                                if(teams[s].dfcn>1){
                                                        alert("NATION MUST BE AT DEFCON 1 TO ATTACK");
                                                        done=1;
                                                }
                                                if(teams[s].dfcn==1){
                                                        cityAttack(teams, tN, t, r, s);
                                                        t++;
                                                        done=1;
                                                }
                                        }
                                }
                        }
                }
                if(input=="SUBATTACK"||input=="SUB ATTACK"){
                        subAttack(teams, tN, t, r);
                        t++;
                }
                if(input=="STATS"){
                        stats(teams, tN);
                }
                if (input=="DEFCON"){
                        defcon(teams, tN);
                }
                if(input=="AWARDPOINTS"||input=="AWARD POINTS"){
                        awardpoints(teams, tN);
                }
                if(input=="ADJUSTSTATS"||input=="ADJUST STATS"){
                        adjustStats(teams, tN);
                }
                if (input=="DONE"){
                        gameOn=false;
                }
                if(t%5==0){    
                        alert("End of round!");
                        r++;
                        t=1;
                }
        }
}
 
function cityAttack(teams, tN, t, r, agg){
        var input;
        var done=0;
        alert(teams[agg].name);
        input=prompt("Number of missiles launched:");
        if(input=="DONE"||input==null){
                return;
        }
        if(!isNaN(input) && input<teams[agg].mgt){
                teams[agg].mgt=teams[agg].mgt-input;
        }
        input=prompt("Target Country:");
        if(input=="DONE"||input==null){
                return;
        }
        input = input.toUpperCase();
        for(var s=0;s<tN;++s){
                if(teams[s].name==input){
                        while(isNaN(input)){
                                while (input!="Y"||input!="N"){
                                        input=prompt("Capitol hit?(Y/N)");
                                        input=input.toUpperCase();
                                        if (input=="Y"||input=="YES"){
                                                teams[s].cap=teams[s].cap-1;
                                                alert(teams[s].name+"'s capitol destroyed. \nCommunication disabled for next two turns.");
                                                break;
                                        }
                                        if (input=="N"||input=="NO"){
                                                break;
                                        }
                                }
                                input=prompt("Number of Direct Hits:");
                                if(input=="DONE"||input==null){
                                        return;
                                }
                                if(!isNaN(input)){
                                        teams[s].pop=teams[s].pop-input;
                                }
                                input=prompt("Number of Indirect Hits");
                                if(input=="DONE"||input==null){
                                        return;
                                }
                                if(!isNaN(input)){
                                        teams[s].pop=teams[s].pop-(input/2);
                                        alert(teams[s].name+"'S MAMA's Remaining: "+teams[s].mama+"\nTotal surviving population: (in millions) "+teams[s].pop);
                                        done=1;
                                }
                        }
                }
        }
}
 
function subAttack(teams, tN,t,r){
        var input;
        var done=0;
        input=prompt("SUB ATTACK\nAgressor:");
        input=input.toUpperCase();
        for(var s=0;s<tN;++s){
                if(teams[s].name==input){
                        teams[s].mgt=teams[s].mgt-1;
                }
        }
        while(done==0){
                input=prompt("SUB OWNER:");
                if(input==null){
                        input.toUpperCase();
                }
                input=input.toUpperCase();
                for(s=0;s<tN;s++){
                        if(teams[s].name==input){
                                teams[s].subs=teams[s].subs-1;
                                done=1;
                                break;
                        }
                }
        }      
        var chance=prompt("Game Lord: What are the chances? \nRecommended input: 20\nClose range: 4");
        if (((Math.random()*100)/2)>chance){
                alert("HIT.\n"+teams[s].name+" has lost a nuclear submarine.");
        }
        else {
                alert("MISS");
        }
        t++;
        return;
}
 
function awardpoints(teams, tN){
        var input;
        var done=0;
        while (done==0){
                input=prompt("Nation gaining or losing points:");
                input=input.toUpperCase();
                for (var s=0; s<tN; s++){
                        if(teams[s].name==input){
                                while(done==0){
                                        input=prompt("Change in points");
                                        if(!isNaN(input)){
                                                teams[s].pts=teams[s].pts+input;
                                                alert(teams[s].name+" now has "+teams[s].pts+"points");
                                                done=1;
                                        }
                                        if(input==null){
                                                return;
                                        }
                                }
                                break;
                        }
                }
        }
}
 
function defcon(teams, tN){
        var done=0;
        var input;
        var consent = false;
        while (done==0){
                input=prompt("Nation declaring DEFCON adjustment:");
                input=input.toUpperCase();
                for(var s=0;s<tN;s++){
                        if(teams[s].name==input){
                                while(done==0){
                                        input=prompt("\nCurrent level:"+teams[s].dfcn+"\nNew DEFCON level:");
                                        if(input>5){
                                                alert("Maximum DEFCON level is 5.");
                                        }
                                        if(input<=5){
                                                consent=prompt("Confirm DEFCON level "+input+".\n Enter CONFIRM or BACK");
                                                if(consent.equals("CONFIRM")){
                                                        teams[s].dfcn=input;
                                                        alert(teams[s].name+" IS NOW AT DEFCON "+teams[s].dfcn+".");
                                                        done=1;
                                                }       
                                                else{
                                                        gameplay(teams, tN);
                                                }
                                        }
                                }
                        }
                }
        }
}
 
function adjustStats(teams, tN){
        var input;
        var done=0;
        while(done==0){
                input=prompt("Nation to adjust:")
                input=input.toUpperCase();
                if(input=="BACK"){
                        return;
                }
                for(var i=0; i<tN;i++){
                        if(teams[i].name==input){
                                done=1;
                                break;
                        }
                }
        }
        done=0;
        while(done==0){
                input=prompt(teams[i].name+" manual adjustment:\nName\nPopulation\nCities\nMissile Installations\nSubs\nNukes\n");
                input=input.toUpperCase();
                if(input=="NAME"){
                        teams[i].name=prompt("New name for "+teams[i].name+":");
                        teams[i].name=teams[i].name.toUpperCase();
                        alert("Team "+teams[i].nmbr+" is now named "+teams[i].name);
                        done=1;
                }
                if(input=="POPULATION"){
                        input=prompt(teams[i].name+" current population: "+teams[i].pop+".\nNew population: (in millions)");
                        if(!isNaN(input)&&input>0){
                                teams[i].pop=input;
                        }
                        alert(teams[i].name+" population: "+teams[i].pop);
                        done=1;
                }
                if(input=="CITIES"){
                        input=prompt(teams[i].name+" current number of MaMA's: "+teams[i].mama+"\nChange to: ");
                        if(!isNaN(input)&&input>=0){
                                teams[i].mama=input;
                        }
                        alert(teams[i].name+"current number of cities: "+teams[i].mama);
                        done=1;
                }
                if(input=="NUKES"){
                        input=prompt(teams[i].name+" current number of nuclear warheads: "+teams[i].mgt+"\nChange to: ");
                        if(!isNaN(input)&&input>=0){
                                teams[i].mgt=input;
                        }
                        alert(teams[i].name+"current number of warheads: "+teams[i].mgt);
                        done=1;
                }
                if(input=="SUBS"){
                        input=prompt(teams[i].name+" current number of nuclear submarines: "+teams[i].subs+"\nChange to: ");
                        if(!isNaN(input)&&input>=0){
                                teams[i].subs=input;
                        }
                        alert(teams[i].name+"current number of submarines: "+teams[i].subs);
                        done=1;
                }
                if(input=="MISSILE INSTALLATIONS"){
                        input=prompt(teams[i].name+" current number of missile installations: "+teams[i].mi+"\nChange to: ");
                        if(!isNaN(input)&&input>=0){
                                teams[i].mi=input;
                        }
                        alert(teams[i].name+"current number of missile installations: "+teams[i].mi);
                        done=1;
                }
        }
}
 
function stats(teams, tN){
        var points="";
        var info="PUBLIC INFORMATION\n";
        for (var b=0; b<tN; b++){
                alert("CLASSIFIED INFORMATION AVAILABLE ONLY TO\nGAME MASTER AND "+teams[b].name+"'S HEADS OF STATE\n\nTeam "+(b+1)+": "+teams[b].name+"\nTotal points: "+Math.floor(teams[b].pts)+"\nDEFCON LEVEL: "+teams[b].dfcn+"\nMissile installations: "+teams[b].mi+"\nCities intact: "+teams[b].mama+"\nPopulation: "+(teams[b].pop*250000)+"\nNuclear Subs: "+teams[b].subs+"\nBombs remaining: "+teams[b].mgt);
                points=points+teams[b].name+" points: "+Math.round(teams[b].pts)+". DEFCON: "+teams[b].dfcn+".\n";
        }
        alert(info+points);
        return;
}
 
 
function makeTeamsCustom(teams, tN, z){
        for (var i=0; i<tN; i++){
                switch(parseInt(teams[i])){
                        case 1:
                                var AMNAT={
                                        nmbr : 1,
                                        name : "AMNAT",
                                        pop : prompt("AMNAT\nPopulation size: (in millions)"),
                                        mama : prompt("AMNAT\nNumber of Major Metropolitan Areas:"),
                                        mgt : prompt("AMNAT\nNumber of nuclear warheads:"),
                                        subs : prompt("AMNAT\nNumber of nuclear subs:"),
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : prompt("AMNAT\nNumber of Missile installations:"),
                                }
                        return(AMNAT);
                        break;
                        case 2:
                                var SOVWAR={
                                        nmbr : 2,
                                        name : "SOVWAR",
                                        pop : prompt("SOVWAR\nPopulation size: (in millions)"),
                                        mama : prompt("SOVWAR\nNumber of Major Metropolitan Areas:"),
                                        mgt : prompt("SOVWAR\nNumber of nuclear warheads"),
                                        subs : prompt("SOVWAR\nNumber of nuclear subs"),
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : prompt("SOVWAR\nNumber of Missile installations"),
                                }
                                return(SOVWAR);
                                break;
                        case 3:
                                var REDCHI={
                                        nmbr : 3,
                                        name : "REDCHI",
                                        pop : prompt("REDCHI\nPopulation size: (in millions)"),
                                        mama : prompt("REDCHI\nNumber of Major Metropolitan Areas:"),
                                        mgt : prompt("REDCHI\nNumber of nuclear warheads"),
                                        subs : prompt("REDCHI\nNumber of nuclear subs"),
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : prompt("REDCHI\nNumber of Missile installations"),
                                }
                                return(REDCHI);
                                break;
                        case 4:
                                var IRLYBSIR={
                                        nmbr : 4,
                                        name : "IRLYBSIR",
                                        pop : prompt("IRLYBSIR\nPopulation size: (in millions)"),
                                        mama : prompt("IRLYBSIR\nNumber of Major Metropolitan Areas:"),
                                        mgt : prompt("IRLYBSIR\nNumber of nuclear warheads"),
                                        subs : prompt("IRLYBSIR\nNumber of nuclear subs"),
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : prompt("IRLYBSIR\nNumber of Missile installations"),
                                }
                                return(IRLYBSIR);
                                break;
                        case 5:
                                var INDPAK={
                                        nmbr : 5,
                                        name : "INDPAK",
                                        pop : prompt("INDPAK\nPopulation size: (in millions)"),
                                        mama : prompt("INDPAK\nNumber of Major Metropolitan Areas:"),
                                        mgt : prompt("INDPAK\nNumber of nuclear warheads"),
                                        subs : prompt("INDPAK\nNumber of nuclear subs"),
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : prompt("INDPAK\nNumber of Missile installations"),
                                }
                                return(INDPAK);
                                break;
                        case 6:
                                var tname=prompt("Custom team name:");
                                tname=tname.toUpperCase();
                                var nmber=(5+z);
                                var custom={
                                        nmbr : nmber,
                                        name : tname,
                                        pop : prompt(tname+"\nPopulation size: (in millions)"),
                                        mama : prompt(tname+"\nNumber of Major Metropolitan Areas:"),
                                        mgt : prompt(tname+"\nNumber of nuclear warheads"),
                                        subs : prompt(tname+"\nNumber of nuclear subs"),
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : prompt(tname+"\nNumber of Missile installations"),
                                }
                                return(custom);
                                break;
                                default:
                                break;
                }
        }      
}
function makeTeamsStandard(teams, tN){
        for (var i=0; i<tN; i++){
                switch(parseInt(teams[i])){
                        case 1:
                                alert("HUH?");
                                var AMNAT={
                                        nmbr : 1,
                                        name : "AMNAT",
                                        pop : 100,
                                        mama : 10,
                                        mgt : 20,
                                        subs : 5,
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : 3,
                                }
                                return(AMNAT);
                                break;                 
                        case 2:
                                var SOVWAR={
                                        nmbr : 2,
                                        name : "SOVWAR",
                                        pop : 100,
                                        mama : 10,
                                        mgt : 20,
                                        subs : 5,
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : 3,
                                }
                                return(SOVWAR);
                                break;
                        case 3:
                                var REDCHI={
                                        nmbr : 3,
                                        name : "REDCHI",
                                        pop : 100,
                                        mama : 10,
                                        mgt : 20,
                                        subs : 5,
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : 3,
                                }
                                return(REDCHI);
                                break;
                        case 4:
                                var IRLYBSIR={
                                        nmbr : 4,
                                        name : "IRLYBSIR",
                                        pop : 100,
                                        mama : 10,
                                        mgt : 20,
                                        subs : 5,
                                        cap : 1,
                                        pts : 0,
                                        dfcn : 5,
                                        mi : 3,
                                }
                                return(IRLYBSIR);
                                break;
                        case 5:
                            var INDPAK={
                                nmbr : 5,
                                name : "INDPAK",
                                pop : 100,
                                mama : 10,
                                mgt : 20,
                                subs : 5,
                                cap : 1,
                                pts : 0,
                                dfcn : 5,
                                mi : 3,
                            }
                            return(INDPAK);
                                break;
                                default:
                                break; 
                }
        }
}
