({
	doInit : function(component, event, helper)  {
        helper.computeProgress(component, event, helper);
        
	},
    computeProgress : function(component, event, helper)  {
 
        var totalVal = component.get("v.totalProgress");
        var actualVal = component.get("v.actualProgress"); 
        
        var threshold = component.get("v.threshold");
        var beforeTheme = component.get("v.themeBeforeThreshold");
        var afterTheme = component.get("v.themeAfterThreshold");
     
        if(totalVal && actualVal && !isNaN(parseInt(totalVal)) && isFinite(totalVal) && !isNaN(parseInt(actualVal)) && isFinite(actualVal)){
           //parameter is number 
            var percVal = parseInt(actualVal) / parseInt(totalVal) ;
            var progressVal = parseInt(  percVal * 360  ) ;
        
            if((percVal * 100) >= threshold){
                component.set("v.theme" , afterTheme );
            }else{
                component.set("v.theme" , beforeTheme );
            }
    
            component.set("v.cirDeg" , progressVal );
            component.set("v.perText" , parseInt(percVal * 100)  +'%' ); 
        }else if(actualVal){
            helper.callApexMethod(component, event, helper, totalVal, actualVal);
        }else{
            //valuea are used directly 
            if(actualVal >= threshold){
                component.set("v.theme" , afterTheme );
            }else{
                component.set("v.theme" , beforeTheme );
            }
        }
    },
    callApexMethod : function(component, event, helper, txt_totalVal, txt_actualVal)  {
        
        var action = component.get('c.computePercentage');
        var txt_recordId = component.get("v.recordId");
        var txt_sObjectName = component.get("v.sObjectName");
        
        action.setParams({
            recordId : txt_recordId,
            sObjectName : txt_sObjectName,
            totalValueFieldName : txt_totalVal,
            actualValueFieldName : txt_actualVal
        });
        
        action.setCallback(this, function(a) {
            if (a.getState() === 'SUCCESS') {
                var retObj =  JSON.parse(a.getReturnValue())  ; 
                	
                var threshold = component.get("v.threshold");
        		var beforeTheme = component.get("v.themeBeforeThreshold");
        		var afterTheme = component.get("v.themeAfterThreshold");
                
                component.set("v.totalProgress" , retObj.total );
                component.set("v.actualProgress" , retObj.actual ); 
                
                if( parseInt(retObj.val) >= threshold){
                	component.set("v.theme" , afterTheme );
                }else{
                    component.set("v.theme" , beforeTheme );
                }
                
                var progressVal = parseInt(  (retObj.val/100) * 360  ) ; 
                component.set("v.cirDeg" , progressVal );
                component.set("v.perText" , parseInt(retObj.val)  +'%' );              
            }  
        });
        $A.enqueueAction(action);  
    }
})