//Breakdown the pseudoclasses by id? that way you can show a more specific message than improve your clicks.

//tooltips could be a good way to show inf without cluttering the ui
//Naming the Civ would be good.................. Levelling from resourece collection would be amazing. (where the hr bars are)
//var next_farmer_cost_html = "<img src='images/wood_cost.png'>" + next_farmer_cost; -- these injections need to play once on load (WHEN SAVE IS IMPLEMENTED).
//There will be overflow errors for worker costs once quantities get to about 100 (for three resources)
//Watch videos on Big O notation.
//Maybe the first explorer should discover a rare straight away, to show the player it is possible, then after have a chance for finding nothing or runes.

//IMPLEMENTED IN UPDATE DISPLAY FUCNTION
	//News box could have a max of 5 or so Items stored in an array, pop and push, and display all of them in a box.
	// got_tribe = (woodcutters + farmers) >= 5 ? true : false; could break down this ternary operator into if else blocks, 
	//adding a status 'With a pop>5 you can now trade!' pop ups with absolute position form bottom of the screen could be good


var got_tribe = false;
var got_trader = false;
var aged_classical = false;
var got_miner = false; //(increse base click collection)
var got_scholar = false; //explore
var can_age_modern = false;
var aged_modern = false; //Happen on 10 expeditions - show oil

//maybe load the hides before the JS to stop them breifly showing
var res_buttons = ["#stronger_sickle","#better_axe","#harder_bargain","#greater_pick","#finer_instruments","#tougher_drill"];
var tools = [0,0,0,0,0,0]; //KeyValue pairs with res_buttons.

var base_upgrade_cost = 500;

for (i=0; i<res_buttons.length; i++){
    var button_type = res_buttons[i] + " > p";
    $(button_type).html(base_upgrade_cost + " <img src='images/metal_cost.png'>");
}

$("#wealth_box").hide();
$("#metal_box").hide();
$("#knowledge_box").hide();
$("#oil_box").hide();

$(".click_upgrade_buttons").hide();

$("#classical").hide();
$("#explore").hide();
$("#modern").hide();

var explorations = 0;

var food = 0;
var wood = 0;
var wealth = 0;
var metal = 0;
var knowledge = 0;
var oil = 0;

//atm randome number between 1-9 is subtracted (easier for exponential increase metal upgrades)
var base_food = 15; //FOR TESTING
var base_wood = 15;
var base_wealth = 15;
var base_metal = 15;
var base_knowledge = 15;
var base_oil = 15;

var farmers = 0;
var woodcutters = 0;
var traders = 0;
var miners = 0;
var scholars = 0;
var drillers = 0;

/*
//per-unit gather-rates, amount a single resource collecter produces per game loop
var pu_gr_food 
*/

var pu_gr_food = 1;
var pu_gr_wood = 1;
var pu_gr_wealth = 1;
var pu_gr_metal = 1;
var pu_gr_knowledge = 1;
var pu_gr_oil = 1;


update_display();
//If save is implemented, then this should not run.
$(document).ready(function(){
    var king = null;
    while (king == null)
        {
            king = prompt("Please type a name for your kingdom","England");   
        };
    $("#subtitle").text("Kingdom of " + king);
});


function collect(resource){
	//Simply a function to register collection has taken place, start a 1 second timer and animate. Will not effect resource amount.
    //Function may be obselete.
	
	var res_status = resource + " > h4";
    
    $(res_status).css('visibility','visible');
	$(res_status).css('opacity','1');
    $(res_status).fadeTo(250, 0);

}

//Get basic resource building functions.
function get_farmer(){
	var farmer_cost = Math.floor(100*Math.pow(1.1,farmers));
	
	if (wood>= farmer_cost){
		++farmers;
		wood -= farmer_cost;
		update_display();
		
	}
	var next_farmer_cost = Math.floor(100*Math.pow(1.1,farmers));
	var next_farmer_cost_html = "<img src='images/wood_cost.png'>" + next_farmer_cost;
	$("#farmer > p").html(next_farmer_cost_html);
}

function get_woodcutter(){
	var woodcutter_cost_f = Math.floor(100*Math.pow(1.1,woodcutters));
	
	if ((food >= woodcutter_cost_f)){
		++woodcutters;
		food -= woodcutter_cost_f;
		update_display();
		
	}
	var next_woodcutter_cost_f = Math.floor(100*Math.pow(1.1,woodcutters));
	var next_woodcutter_cost_html = "<img src='images/food_cost.png'>" + next_woodcutter_cost_f ;
	$("#woodcutter > p").html(next_woodcutter_cost_html);
}

function get_trader(){ 
	var trader_cost_f = Math.floor(200*Math.pow(1.1,traders));
	var trader_cost_wo = Math.floor(200*Math.pow(1.1,traders));
	//var trader_cost_we = Math.floor(50*Math.pow(1.1,traders)); 
	
	if ((food >= trader_cost_f) && (wood >= trader_cost_wo)){
		++traders;
		food -= trader_cost_f;
		wood -= trader_cost_wo;
		update_display();
		
	}
	var next_trader_cost_f = Math.floor(200*Math.pow(1.1,traders));
	var next_trader_cost_wo = Math.floor(200*Math.pow(1.1,traders));
	var next_mine_cost_html = "<img src='images/food_cost.png'>" + next_trader_cost_f +"&ensp; <img src='images/wood_cost.png'>" + next_trader_cost_wo;
	$("#trader > p").html(next_mine_cost_html);
}

function get_miner(){
	var mine_cost_we = Math.floor(20*Math.pow(1.1,miners));
	var mine_cost_wo = Math.floor(150*Math.pow(1.1,miners));
	
	if ((wealth >= mine_cost_we) && (wood >= mine_cost_wo)){
		
		++miners;
		wealth -= mine_cost_we;
		wood -= mine_cost_wo;
		update_display();
		
	}
	var next_mine_cost_we = Math.floor(20*Math.pow(1.1,miners));
	var next_mine_cost_wo = Math.floor(150*Math.pow(1.1,miners));
	var next_mine_cost_html = "<img src='images/wood_cost.png'>" + next_mine_cost_wo +"&ensp; <img src='images/wealth_cost.png'>" + next_mine_cost_we;
	$("#miner > p").html(next_mine_cost_html);
}

function get_scholar(){
	var scholar_cost_fo = Math.floor(150*Math.pow(1.1,scholars));
	var scholar_cost_we = Math.floor(200*Math.pow(1.1,scholars));
	
	if ((food >= scholar_cost_fo) && (wealth >= scholar_cost_we)){
		
		++scholars;
		wealth -= scholar_cost_we;
		food -= scholar_cost_fo;
		update_display();
		
	}
	var next_scholar_cost_fo = Math.floor(150*Math.pow(1.1,scholars));
	var next_scholar_cost_we = Math.floor(200*Math.pow(1.1,scholars));
	var next_scholar_cost_html = "<img src='images/food_cost.png'>" + next_scholar_cost_fo +"&ensp; <img src='images/wealth_cost.png'>" + next_scholar_cost_we;
	$("#scholar > p").html(next_scholar_cost_html);
}

function get_driller(){
	var driller_cost_k = Math.floor(1000*Math.pow(1.1,drillers));
	var driller_cost_m = Math.floor(200*Math.pow(1.1,drillers));
	
	if ((knowledge >= driller_cost_k) && (metal >= driller_cost_m)){
		
		++drillers;
		knowledge -= driller_cost_k;
		metal -= driller_cost_m;
		update_display();
		
	}
	var next_driller_cost_k = Math.floor(1000*Math.pow(1.1,scholars));
	var next_driller_cost_m = Math.floor(200*Math.pow(1.1,scholars));
	var next_driller_cost_html = "<img src='images/metal_cost.png'>" + next_driller_cost_m +"&ensp; <img src='images/knowledge_cost.png'>" + next_driller_cost_k;
	$("#driller > p").html(next_driller_cost_html);
}
function upgrade_tool(t_index,e){
    //THIS FUNCITON FOR UPGRADING, MADE GENERAL

    var button_text = res_buttons[t_index] + " > p";
    var upgrade_cost = Math.floor(base_upgrade_cost*Math.pow(1.5,tools[t_index]));
    
    if (metal >= upgrade_cost){
        //Assumes cost are only metal (simplified).
        metal -= upgrade_cost;
        //animate downwards?
        tools[t_index]+=1;
        animatePlus({x:e.pageX,y:e.pageY},"Upgraded!",2000,50);
        upgrade_cost = Math.floor(base_upgrade_cost*Math.pow(1.5,tools[t_index]));

    }
    
    
    var button_text = res_buttons[t_index] + " > p";
    $(button_text).html( upgrade_cost + " <img src='images/metal_cost.png'>");
	
}

$(function(){
    $("#stronger_sickle").click(function(e){
        upgrade_tool(0,e);
        base_food += 10;
    });
});
$(function(){
    $("#better_axe").click(function(e){
        upgrade_tool(1,e);
        base_wood += 10;
    });
});
$(function(){
    $("#harder_bargain").click(function(e){
        upgrade_tool(2,e);
        base_wealth += 10;
    });
});
$(function(){
    $("#greater_pick").click(function(e){
        upgrade_tool(3,e);
        base_metal += 10;
    });
});
$(function(){
    $("#finer_instruments").click(function(e){
        upgrade_tool(4,e);
        base_knowledge += 10;
    });
});
$(function(){
    $("#tougher_drill").click(function(e){
        upgrade_tool(5,e);
        base_oil += 10;
    });
});

$(function(){
    $("#explore").click(function(e){
        //Math.floor((Math.random() * 10)
        if (explorations < 10){
            //whatever the modern cost is.
            animatePlus({x:e.pageX, y:e.pageY}, "KEEP CLICKING!", 2000,100);  
            explorations += 1;
        };

    });
});



//Functions which listen for clicks and update resource counts.
//If the bhaviours for the various resources remain sufficiently similar you could construct an object of the resources and use it for the pass by referenc feature, meaning only one gerneral function would be neccessary in leiu of several (one for each resource)
//This has been implemented in the signle function that is called to upgrade one of the many tools. It takes a integer argument where that integer is the index of both a list and an object.
$(function(){
	$("#food").click(function(e){
		collect("#food");
        
        var f_gathered = (base_food - Math.floor(Math.random()*10));
        food+=f_gathered;
        f_gathered += "<img src='images/food_cost.png'>";
        animatePlus({x:e.pageX, y:e.pageY}, f_gathered);
		
		$("#food > p").text(food);
	});	
});

$(function(){
	$("#wood").click(function(e){
		collect("#wood");
        //alert('clicked');
        var wo_gathered = (base_wood - Math.floor(Math.random()*10));
        wood+=wo_gathered;
        wo_gathered += "<img src='images/wood_cost.png'>";
        animatePlus({x:e.pageX, y:e.pageY}, wo_gathered);
		//wood+=(base_wood - Math.floor(Math.random()*10));
        
		$("#wood > p").text(wood);
	});	
});

$(function(){
	$("#wealth").click(function(e){
		collect("#wealth");
        
        var we_gathered = (base_wealth - Math.floor(Math.random()*10));
        wealth+=we_gathered;
        we_gathered += "<img src='images/wealth_cost.png'>";
        animatePlus({x:e.pageX, y:e.pageY}, we_gathered);
		
		$("#wealth > p").text(wealth);
	});	
});

$(function(){
	$("#metal").click(function(e){
		collect("#metal");
        
        var m_gathered = (base_metal - Math.floor(Math.random()*10));
        metal += m_gathered;
        m_gathered += "<img src='images/metal_cost.png'>";
        animatePlus({x:e.pageX, y:e.pageY}, m_gathered);
		
		$("#metal > p").text(metal);
	});	
});

$(function(){
	$("#knowledge").click(function(e){
		collect("#knowledge");
        
        var k_gathered = (base_knowledge - Math.floor(Math.random()*10));
        knowledge+=k_gathered;
        k_gathered += "<img src='images/knowledge_cost.png'>";
        animatePlus({x:e.pageX, y:e.pageY}, k_gathered);
		
		$("#knowledge > p").text(knowledge);
	});	
});

$(function(){
	$("#oil").click(function(e){
		collect("#oil");
        
        var o_gathered = (base_oil - Math.floor(Math.random()*10));
        oil+=o_gathered;
        o_gathered += "<img src='images/oil_cost.png'>";
        animatePlus({x:e.pageX, y:e.pageY}, o_gathered);
		
		$("#oil > p").text(oil);
	});	
});

//Buying base buildings.
$(function(){ 
	$("#farmer").click(function(){
		get_farmer();
	})});
$(function(){ 
	$("#woodcutter").click(function(){
		get_woodcutter();
	})});
$(function(){ 
	$("#trader").click(function(){
		get_trader();
	})});
$(function(){ 
	$("#miner").click(function(){
		get_miner();
	})});
$(function(){ 
	$("#scholar").click(function(){
		get_scholar();
	})});
$(function(){ 
	$("#driller").click(function(){
		get_driller();
	})});

//Buying research
$(function(){ 
	$("#classical").click(function(){
		if (wealth >= 500){
			$("#classical").remove(); 
			wealth -= 500;
			aged_classical = true;
			$("#metal_box").show();
			$("#knowledge_box").show();
		}

	})});
$(function(){ 
	$("#explore").click(function(){
		//Could Randomly add workers? If not find rares, be smart use general functions for finding rares.
		++explorations;
		//get_farmer();
	})});
$(function(){ 
	$("#modern").click(function(){
		//ADD COST RESTRICTIONS LIKE WITH THE CLASSICAL ONE
		$("#oil_box").show();
		$("#modern").remove();
		//get_farmer();
		
	})});


function update_game(){
	//funtion to run every for passive increased.

	food += Math.floor(pu_gr_food * farmers);
	wood += Math.floor(pu_gr_wood * woodcutters);
	wealth += Math.floor(pu_gr_wealth * traders);
	metal += Math.floor(pu_gr_metal * miners);
	knowledge += Math.floor(pu_gr_knowledge * scholars);
	oil += Math.floor(pu_gr_oil * drillers);
	
	update_display();
}

function update_display(){

	if (~got_tribe){ 
		if (woodcutters+farmers >= 5){
			//message?
			got_tribe = true;
			$("#wealth_box").show();
		} }
	if(~got_trader){
		if (traders>0){
			//message?
			got_trader = true;
			$("#classical").show();
		} }
	if(~got_miner){
		if (miners>0){
			//message?
			got_miner = true;
			$(".click_upgrade_buttons").show();
		} }
	if(~got_scholar){
		if (scholars>0 && got_miner){
			//message?
			got_scholar = true;
			$("#explore").show();
		} }
	if(~can_age_modern){
		if (explorations > 9){
			//message?
			can_age_modern = true;
			$("#modern").show();
		} }
	
	
	$("#food > p").text(food);
	$("#wood > p").text(wood);
	$("#wealth > p").text(wealth);
	$("#metal > p").text(metal);
	$("#knowledge > p").text(knowledge);
	$("#oil > p").text(oil);
	
	//These Jqueries will be flawed if upgrades change resource production so that a worker gets more than 1.
	$("#farmer > h4").text("+" + Math.floor(pu_gr_food * farmers) + "/s");
	$("#woodcutter > h4").text("+" + Math.floor(pu_gr_wood * woodcutters) + "/s");
	$("#trader > h4").text("+" + Math.floor(pu_gr_wealth * traders) + "/s");
	$("#miner > h4").text("+" + Math.floor(pu_gr_metal * miners) + "/s");
	$("#scholar > h4").text("+" + Math.floor(pu_gr_knowledge * scholars) + "/s");
	$("#driller > h4").text("+" + Math.floor(pu_gr_oil * drillers) + "/s");
	
	
	//if (got_tribe){ $("#oil_box").show(); };
}

window.setInterval(function(){
	update_game();
    
}, 1000);


function animatePlus(origin = {x: 100, y: 100}, value = 0, time = 1000, height = 100) { 
    //seihoukei's

    let dvPlus = document.createElement("div")
    dvPlus.className = "floating-plus"
    dvPlus.innerHTML = `+${value}` //template tags
    dvPlus.style.left = `${origin.x - (dvPlus.offsetWidth >> 1)}px`, // Adds x position to nev div.
    document.body.appendChild(dvPlus)
    
    //actually animate it
    dvPlus.animate([{
        top : `${origin.y}px`,
        opacity : 1
    },{
        top : `${origin.y - (height >> 1)}px`,
        opacity : 1
    },{
        top : `${origin.y - height}px`,
        opacity : 0
    }], time).onfinish = (event) => {
        dvPlus.parentElement.removeChild(dvPlus)
    }
}