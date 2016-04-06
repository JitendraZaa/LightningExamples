({
	OnInit : function(component, event, helper) {         
        var obj = this.parseTableBody(component);
        component.set("v.rows", obj.rows);	
        component.set("v.cols" , obj.cols);	
	},
    
    parseTableBody : function(component,colItems){
        
        var body = 	component.get("v.body");	
        
        colItems = colItems || [] ;
        
        var  rowData = [], rowDataItems = [] , rowItems = [];
        
        var result , currentTag ;
        
        for(var i = 0 ; i<body.length ; i++){
            currentTag = body[i] ;
            
            switch(currentTag.getDef().getDescriptor().getName()){
                case 'DataRow' :
                    rowData = currentTag.get("v.data").split(currentTag.get("v.delimiter"));
                    rowDataItems = [] ;
                    
                    for(var j = 0; j<rowData.length ; j++){
                        rowDataItems.push({
                            data : rowData[j],
                            class : colItems[j].class
                        });  
                    }
                    rowItems.push({
                        dataColumns : rowDataItems,
                        uk : currentTag.get("v.uk")
                    });
                     
                    break ;
                    
                case 'DataColumn' :
                    colItems.push({
                        label : currentTag.get("v.label") ,
                        type : currentTag.get("v.type"),
                        class : currentTag.get("v.class")
                    });
                    break ;    
                    
                case 'iteration' :
                    console.log('Detected Iteration tag');
                    result = this.parseTableBody(currentTag,colItems);
                    rowItems = rowItems.concat(result.rows);
                    break ;
            }
            
        }
        
        return {
            rows : rowItems,
            cols : colItems
        };
        
    }
})