var signIPAddress=window.location.protocol + "//" + window.location.hostname;
var sUrl = signIPAddress+":42000";
//sUrl="http://192.168.0.10:42000";
var jsonRequest = {};
jsonRequest.jsonrpc = "2.0";
jsonRequest.method = "";
jsonRequest.params = {};
jsonRequest.id = 1;
var jsonData = {'signIPAddress': signIPAddress+':42000','jsonRequest': ''};
var sendColour=function(mode,colour){
  jsonRequest.method="display.test_mode";
  jsonRequest.params={};
  jsonRequest.params['mode']=mode;
  if(mode!=0) jsonRequest.params['colour']=parseInt(colour);
  $.ajax({
	type: 'POST',
	url:sUrl,
	data:JSON.stringify(jsonRequest),
	dataType:'json',
	cache: false,
	success:function(data){
	  
	}
  });
};
var signBrightnessSettings=function(){
  jsonRequest.method="display.brightness";
  jsonRequest.params={};
  if(!$("#brightnessMode").is(":checked")){
	$('#brightnessValue').attr("disabled","disabled");  
	jsonRequest.params=[parseInt($('#brightnessValue').val()),true];
  }
  else{
	$('#brightnessValue').removeAttr("disabled");
	jsonRequest.params=[parseInt($('#brightnessValue').val()),false];
  }
  $.ajax({
	type: 'POST',
	url:sUrl,
	data:JSON.stringify(jsonRequest),
	dataType:'json',
	cache: false,
	success:function(data){
	}
  });
};
var saveColorValues=function(colorID){
  var jsonData={};
  jsonData.functionName='saveColorValuesToXML';
  jsonData.color=colorID;
  jsonData.Red=$("#colorPickerHolder .sp-input-r").val();
  jsonData.Green=$("#colorPickerHolder .sp-input-g").val();
  jsonData.Blue=$("#colorPickerHolder .sp-input-b").val();
  var jsonObj={"json":""};
  jsonObj.json=jsonData;
  $.ajax({
	type:'POST',
	url: 'backend/controller.php',
	data: jsonObj,
	dataType:'json',
	cache: false,
	success:function(data){
	  if(data.result==null){	
	    $("#"+colorID+"1").html($("#colorPickerHolder .sp-input-r").val());
	    $("#"+colorID+"2").html($("#colorPickerHolder .sp-input-g").val());
	    $("#"+colorID+"3").html($("#colorPickerHolder .sp-input-b").val());
	  }
	}
  });
};
var getColorValues=function(){
  var jsonData={};
  jsonData.functionName='getColorValuesFromXML';	
  var jsonObj={"json":""};
  jsonObj.json=jsonData;
  $.ajax({
	type:'POST',
	url: 'backend/controller.php',
	data: jsonObj,
	dataType:'json',
	cache: false,
	success:function(data){
	  for(var i=0;i<=4;i++){
		var colorID="color"+i;  
	    $("#"+colorID+"1").html(data.result[i].Red[0]);
	    $("#"+colorID+"2").html(data.result[i].Green[0]);
	    $("#"+colorID+"3").html(data.result[i].Blue[0]);
	  }
	}
  });
};