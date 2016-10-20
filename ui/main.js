button = document.getElementById("bclick");

button.onclick=function()
{
    var counter;var bool=0;
   //button.disabled = true;
   var macName = " ";
   var request = new XMLHttpRequest();
   request.open('GET','http://localhost:8080/counter',true);
   request.send(null);
   request.onreadystatechange = function()
   {
   	if(request.readystate = XMLHttpRequest.DONE)
	{
		if(request.status == 200)
		{
			  counter = request.responseText;
			 
			   var disp = "Now Happy customers are ".concat(counter.toString());
			     var count = document.getElementById("counter");
			   count.innerHTML = disp;
			   
			   
			   //for sending client name
			   var clientNameSending = new XMLHttpRequest();
			   clientNameSending.onreadystatechange = function()
			   {
			   	if(clientNameSending.readystate = XMLHttpRequest.DONE)
				{
					if(clientNameSending.status == 200)
					{
						var ansFromServer = clientNameSending.responseText;
						 //  alert(ansFromServer);
		
					}	   
			   
			   	}
			   };
	
			    //for sending client name
			    var check = counter.toString();
			     macName = "client".concat(check)  ;
			     
			     
			    if(check && bool==0){
			    //alert(macName);
			    bool =1;
			    clientNameSending.open('GET','http://localhost:8080/clientName?name='+macName,true);
			    clientNameSending.send(null);
				}
			
					}	   
			   
			   	}
			   };

	   
   
};



 
