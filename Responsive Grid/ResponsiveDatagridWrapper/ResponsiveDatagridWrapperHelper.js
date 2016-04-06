({
	callServer : function(component) {
		var action = component.get("c.getContacts");
        
        action.setCallback(this, function(response){   
            var state = response.getState();
            
            if(state === 'SUCCESS'){
                var retVal = response.getReturnValue();
                 
                var recs = [];
                
                for(var i=0; i< retVal.length;i++){
                    recs.push({
                        uk : retVal[i].id,
                        data : ''.concat(
                            retVal[i].Name ? retVal[i].Name : ' ',
                            '|',
                            retVal[i].Birthdate ? retVal[i].Birthdate : ' ',
                            '|',
                            retVal[i].Email ? retVal[i].Email : ' ',
                            '|',
                            retVal[i].phone ? retVal[i].phone : ' '
                        	),
                        delimiter : '|'
                    });
                }                
                component.set("v.rows",recs); 
                component.find("grid").refresh();
                
            }else if(state === 'ERROR'){
                var errors = response.getError();
                if(errors){
                    alert('Error in Component - '+errors[0].message);
                }                
            }
            
        });
        
        $A.enqueueAction(action);
	}
})