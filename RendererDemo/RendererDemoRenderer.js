({
	 afterRender : function(component , helper){
        this.superAfterRender();
        var appDom = component.find("containerDiv").getElement();
        
        appDom.addEventListener("touchmove", function(e){
            //cancel touch move event of main Container in Salesforce1
            e.stopPropagation();
        },false)
    }
})