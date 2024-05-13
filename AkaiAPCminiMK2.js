
//Functions

function setLed(pad, color)
{
	local.sendNoteOn(1, pad, colors[0]);
}

//Commands

function uiledon(pad)
{
	local.values.uiLeds.getChild("pad"+pad[0]).set(1);
}

function uiledoff(pad)
{
	local.values.uiLeds.getChild("pad"+pad[0]).set(0);
}

function setPadDefColor(pad, colors, mode)
{
	//setLed(pad, color[0]);
	i = parseInt(pad);
	//script.log("a: "+i+"/"+colors[0]);
	script.log(pad + "/" + colors[0] + "/" + mode[0]);
	x = colors[0];
	local.values.padColors.getChild("pad"+i).set(x);
	setMode(pad, mode);
	//local.values.padMode.getChild("pad"+i).setData(y);
}

function setPadCustColor(pad, colors, mode)
{
	//setLed(pad, color[0]);
	i = parseInt(pad);
	//script.log("a: "+i+"/"+colors[0]);
	script.log(pad + "/" + colors + "/" + mode[0]);
	local.values.padColors.getChild("pad"+i).set(colors);
	setMode(pad, mode);
	//local.values.padMode.getChild("pad"+i).setData(y);
}

function setMode(pad, mode)
{
	i = parseInt(pad);
	y = mode[0];
	if (y==1){local.values.padMode.getChild("pad"+i).set("On 10%");}
	else if (y==2){local.values.padMode.getChild("pad"+i).set("On 25%");}
	else if (y==3){local.values.padMode.getChild("pad"+i).set("On 50%");}
	else if (y==4){local.values.padMode.getChild("pad"+i).set("On 65%");}
	else if (y==5){local.values.padMode.getChild("pad"+i).set("On 75%");}
	else if (y==6){local.values.padMode.getChild("pad"+i).set("On 90%");}
	else if (y==7){local.values.padMode.getChild("pad"+i).set("On 100%");}
	else if (y==8){local.values.padMode.getChild("pad"+i).set("Pulse 1/16");}
	else if (y==9){local.values.padMode.getChild("pad"+i).set("Pulse 1/8");}
	else if (y==10){local.values.padMode.getChild("pad"+i).set("Pulse 1/4");}
	else if (y==11){local.values.padMode.getChild("pad"+i).set("Pulse 1/2");}
	else if (y==12){local.values.padMode.getChild("pad"+i).set("Blink 1/24");}
	else if (y==13){local.values.padMode.getChild("pad"+i).set("Blink 1/16");}
	else if (y==14){local.values.padMode.getChild("pad"+i).set("Blink 1/8");}
	else if (y==15){local.values.padMode.getChild("pad"+i).set("Blink 1/4");}
	else if (y==16){local.values.padMode.getChild("pad"+i).set("Blink 1/2");}
}
	
function resetColors()
{
	for(var i=0;i<64;i++) 
		{
			setPadDefColor(i, [0], [7]);
			local.sendNoteOn(7, i, 0);
		}

}

function resetUI()
{
	for(var i=100;i<108;i++){uiledon([i]);uiledoff([i]);}
	for(var i=112;i<120;i++){uiledon([i]);uiledoff([i]);}
}

//Events

function moduleParameterChanged(param)
{
  script.log(value.name + " param changed, new value: " + param.get());
}

function moduleValueChanged(value) {
	Changement = false;

  	if(value.getParent().name == "padColors")
		{
			var val = value.get();
			var mod = local.values.padMode.getChild(value.name).get();
			Changement = true;
			script.log(value.name + " Couleur : " + val + " Mode : " + mod[0]);
		}
		if(value.getParent().name == "padMode")
		{
			var mod = value.get();
			var val = local.values.padColors.getChild(value.name).get();
			Changement = true;
			script.log(value.name + " Couleur : " + val + " Mode : " + mod[0]);
		}
		if(Changement){local.sendNoteOn(mod[0], value.name.substring(3, 5), val);}
		if(value.getParent().name == "uiLeds")
		{
			local.sendNoteOn(1,value.name.substring(3,6),value.get());
		}
}

function noteOnEvent(channel, pitch, velocity)
{
	//script.log("Note on received "+channel+", "+pitch+", "+velocity);
	i = pitch;
		if (i<=63){local.values.pads.getChild("pad" + i).set(1);}
		else {local.values.ui.getChild("pad" + i).set(1);}
}


function noteOffEvent(channel, pitch, velocity)
{
	//script.log("Note off received "+channel+", "+pitch+", "+velocity);
	i = pitch;
	if (i<=63){local.values.pads.getChild("pad" + i).set(0);}
	else {local.values.ui.getChild("pad" + i).set(0);}
}

function ccEvent(channel, number, value)
{
	//script.log("ControlChange received "+channel+", "+number+", "+value);
	i = number-48;
	local.values.faders.getChild("Fader" + i).set(value);
}

function sysExEvent(data)
{
	//script.log("Sysex Message received, "+data.length+" bytes :");
}


resetColors();
resetUI();
