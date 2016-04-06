({
	wikiCallOut : function(txtToSearch , component, helper) {
        
        var action = component.get("c.getWikiResponse");
        var resLimit = component.get('v.resultLimit');
        action.setParams({
            searchText : txtToSearch,
            searchLimit : resLimit
        });
        
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                helper.parseResult(a.getReturnValue(),helper);                
            }  
        });
        $A.enqueueAction(action);   
	},
    parseResult : function(res,helper){
        var retJSON = JSON.parse(res);
        var jsonTitles = retJSON[1] ; 
        var jsonDetails = retJSON[2];
        var jsonURL = retJSON[3];
        
        domSearch = document.getElementById('resultPlaceHolder');
        while (domSearch.firstChild) {
            domSearch.removeChild(domSearch.firstChild);
        }
        
        for(var i=0 ; i<jsonTitles.length ; i++)
        {
           helper.createChildNodes(domSearch, jsonTitles[i],jsonDetails[i],jsonURL[i]); 
        }
        
    },
    
    createChildNodes : function(domSearch,title,desc,url){ 
        var res_li = document.createElement('li');
        res_li.setAttribute('class', 'slds-list__item'); 
                
        var desc_span = document.createElement('span');
        desc_span.innerText = ' '+desc ;
        desc_span.setAttribute('class', 'slds-text-body--small');  
        
        
        var link = document.createElement('a');
        link.setAttribute('href', url);
        link.innerText = title ;
        
        res_li.appendChild(link);
        res_li.appendChild(desc_span);
        domSearch.appendChild(res_li); 
    }
})