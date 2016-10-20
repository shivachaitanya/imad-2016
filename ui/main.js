button = document.getElementById("bclick");

button.onclick=function()
{
    var counter;var bool=0;
   button.disabled = true;
   var macName = " ";
   //step-1
   var request = new XMLHttpRequest({mozSystem: true});
   request.open('GET','http://192.168.236.28:8080/counter',true);
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
			   
			   
			   //step-2 for sending client name
			   var clientNameSending = new XMLHttpRequest({mozSystem: true});
			   clientNameSending.onreadystatechange = function()
			   {
			   	if(clientNameSending.readystate = XMLHttpRequest.DONE)
				{
					if(clientNameSending.status == 200)
					{
					
					    //step-3 for sending generted data to server
					    var clientData = new XMLHttpRequest({mozSystem: true});
					    clientData.onreadystatechange = function()
					    {	
						if(clientData.readystate = XMLHttpRequest.DONE)
						{
							if(clientData.status == 200)
							{
								
							}
						}	 
					   //step-3 ends
					    };
					    var temp=0,hum=0,pre=0,avgTemp,avgHum,avgPre;
        	 			   var i=0;
					    setInterval(function(){  
		    
						temp = temp + Math.floor((Math.random() * 100) + 1);
						hum = hum + Math.floor((Math.random() * 100) + 1);
						pre = pre + Math.floor((Math.random() * 100) + 1);
						i = i+1;
						if(i%10 == 0)
						{
							avgTemp = temp/60;
							avgHum = hum/60;
							avgPre = pre/60;
							
							clientData.open('GET','http://192.168.236.28:8080/clientData?name='+macName+ '&pre='+ avgPre+ '&temp='+avgTemp+'&hum='+avgHum ,true);
			    		    		clientData.send(null);
							temp = 0;
							hum = 0;
							pre = 0;
					
						}
				
						 
				     }, 1000);
					    
					}	   
			   
			   	}
			   };
	
			    //for sending client name
			    var check = counter.toString();
			     macName = "client".concat(check)  ;
			     
			     
			    if(check && bool==0){
			    //alert(macName);
			    bool =1;
			    clientNameSending.open('GET','http://192.168.236.28:8080/clientName?name='+macName,true);
			    clientNameSending.send(null);
				}
			
		}	   
			   
	}
     };

	   
//button click ends   
};



 
