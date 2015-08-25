<?php
  $jsonRequest=$_REQUEST['json'];
  switch($jsonRequest['functionName']){
    case 'saveColorValuesToXML':
	  $colours=simplexml_load_file("colours.xml");
	  for($i=0; $i< count($colours); $i++){
		if($colours->colour[$i]['id'] == $jsonRequest['color']){
		  $colours->colour[$i]->Red=$jsonRequest['Red'];
		  $colours->colour[$i]->Green=$jsonRequest['Green'];
		  $colours->colour[$i]->Blue=$jsonRequest['Blue'];	
		  $colours->asXML("colours.xml");
		  $result=NULL;
		}
	  }
	  $response=array("jsonrpc"=>"2.0", "result"=>$result, "id"=>1);
	  header('Content-Type: application/json');
	  echo json_encode($response);
	break;
	case 'getColorValuesFromXML':
	  $colours=simplexml_load_file("colours.xml");
	  $colorValues=array();
	  for($i=0; $i< count($colours); $i++){
	    $colorValues[]=array("Red"=>$colours->colour[$i]->Red, "Green"=>$colours->colour[$i]->Green, "Blue"=>$colours->colour[$i]->Blue);
	  }
	  $response=array("jsonrpc"=>"2.0", "result"=>$colorValues, "id"=>1);
	  header('Content-Type: application/json');
	  echo json_encode($response);
	break;
  }
?>