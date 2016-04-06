({
	serverCall : function(component,event) {
		
        var txtVal = component.get("v.txtContact");
        
        var action = component.get("c.getContacts");
        
		 action.setParams({
            search : txtVal 
        });
        
         action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                component.set("v.rows",a.getReturnValue()); 
            } else if (a.getState() === "ERROR") {
                $A.log("Errors", a.getError());
            }
        });
        
        $A.enqueueAction(action);

	}
})