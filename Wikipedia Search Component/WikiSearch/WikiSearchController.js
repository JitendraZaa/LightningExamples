({
	searchWiki : function(component, event, helper) {
        if(event.ea.keyCode == 13){ 
            helper.wikiCallOut(component.get('v.txtWikiText'),component, helper); 
        }
	}
})