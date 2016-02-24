({
	openDialog : function(component, event, helper) {
		$A.createComponent(
            "c:modalDialog",
            {
                "title": component.get("v.modalTitle"),
                "body": component.get("v.modalMessage")
            },
            function(msgBox){
                
                if (component.isValid()) {
                    var targetCmp = component.find('ModalDialogPlaceholder');
                    var body = targetCmp.get("v.body");
                    body.push(msgBox);
                    targetCmp.set("v.body", body); 
                }
            }
        );
	}
})