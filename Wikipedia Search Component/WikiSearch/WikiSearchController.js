({
	searchWiki : function(component, event, helper) {
        if((event.ea && event.ea.keyCode == 13) || 
			(event.getParams() && event.getParams().keyCode == 13) ||
			(event.keyCode == 13)){ 
            helper.wikiCallOut(component.get('v.txtWikiText'),component, helper); 
        }
	}
})