//USE TOOLTIP CSS FOR BUILDINGS!!!
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
var got_miner = false; //open up workshop research. (one for each resource) agricultural tools, lumber tools, bank/commodities, mining tools, scientific instrumentation (increse base click collection)
var got_scholar = false; //explore
var aged_modern = false; //Happen on 10 expeditions - show oil


//maybe load the hides before the JS to stop them breifly showing
$("#wealth_box").hide();
$("#metal_box").hide();
$("#knowledge_box").hide();
$("#oil_box").hide();


$("#classical").hide();
/* just for ui testing
$("#explore").hide();
$("#modern").hide();
*/
var collect_rate = 1000;

var food = 0;
var wood = 0;
var wealth = 0;
var metal = 0;
var knowledge = 0;
var oil = 0;

//atm randome number between 1-9 is subtracted (easier for exponential increase metal upgrades)
var base_food = 1000; //FOR TESTING
var base_wood = 1000;
var base_wealth = 10;
var base_metal = 10;
var base_knowledge = 10;
var base_oil = 10;

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

function collect(resource){
	//Simply a function to register collection has taken place, start a 1 second timer and animate. Will not effect resource amount.
	var res_img = resource + " > img";
	var res_status = resource + " > h4";
	
	$(resource).prop('disabled', true);
	$(res_img).css('opacity','0');
	$(res_status).css('visibility','visible');
	
	$(res_img).fadeTo(collect_rate, 1);
	setTimeout(function(){
		$(resource).prop('disabled', false);
		$(res_status).css('visibility','hidden');
	}, collect_rate);
	
};

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



//Functions which listen for clicks and update resource counts.
$(function(){
	$("#food").click(function(){
		collect("#food");
		food+=(base_food - Math.floor(Math.random()*10));
		$("#food > p").text(food);
	});	
});

$(function(){
	$("#wood").click(function(){
		collect("#wood");
		wood+=(base_wood - Math.floor(Math.random()*10));
		$("#wood > p").text(wood);
	});	
});

$(function(){
	$("#wealth").click(function(){
		collect("#wealth");
		wealth+=(base_wealth - Math.floor(Math.random()*10));
		$("#wealth > p").text(wealth);
	});	
});

$(function(){
	$("#metal").click(function(){
		collect("#metal");
		metal+=(base_metal - Math.floor(Math.random()*10));
		$("#metal > p").text(metal);
	});	
});

$(function(){
	$("#knowledge").click(function(){
		collect("#knowledge");
		knowledge+=(base_knowledge - Math.floor(Math.random()*10));
		$("#knowledge > p").text(knowledge);
	});	
});

$(function(){
	$("#oil").click(function(){
		collect("#oil");
		oil+=(base_oil - Math.floor(Math.random()*10));
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
			$("#classical").remove(); //SHOULD COST 500 GOLD!
			aged_classical = true;
			$("#metal_box").show();
			$("#knowledge_box").show();
		} else {
			"<img src='images/food_cost.png'>" + next_scholar_cost_fo
$("#scholar > p").html(next_scholar_cost_html);
		}

	})});
$(function(){ 
	$("#explore").click(function(){
		get_farmer();
	})});
$(function(){ 
	$("#modern").click(function(){
		get_farmer();
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
};

function update_display(){

	if (~got_tribe){ 
		if (woodcutters+farmers >= 5){
			//message?
			got_tribe = true;
			$("#wealth_box").show();
		}; };
	
	if(~got_trader){
		if (traders>0){
			//message?
			got_trader = true;
			$("#classical").show();
		}; };
	
	
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

/*
working update display
$("#food > p").text(food);
$("#wood > p").text(wood);
$("#wealth > p").text(wealth);
$("#metal > p").text(metal);
$("#knowledge > p").text(knowledge);
$("#oil > p").text(oil);

$("#farmer > h4").text(farmers);
$("#woodcutter > h4").text(woodcutters);
$("#trader > h4").text(traders);
$("#miner > h4").text(miners);
$("#scholar > h4").text(scholars);
$("#driller > h4").text(drillers);
*/

