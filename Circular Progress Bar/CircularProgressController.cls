/**
 * Author	:	Jitendra Zaa
 * Desc		:	Controller class for LEX component CircularProgress.
 * 			:	On the basis of field API name passed, it calculates percentage of completion.
 * */
public class CircularProgressController {     
    
    /**
     * This class is used to return as JSON Object
     **/
    public class WrapperJSON{
        public Integer total {get;set;}
        public Integer actual {get;set;}
        public Integer val {get;set;}
    }
    
    @AuraEnabled
    public static String computePercentage(String sObjectName, String recordId, String totalValueFieldName, String actualValueFieldName){
        Integer retVal = 0 ;
        String query = null;
        WrapperJSON retObj = new WrapperJSON();
        
        if(totalValueFieldName != null && totalValueFieldName.trim() != '' &&  actualValueFieldName != null && actualValueFieldName.trim() != '' ){
            query = 'SELECT '+totalValueFieldName+', '+actualValueFieldName+' FROM '+sObjectName+' WHERE Id =: recordId';
        }
        else if (actualValueFieldName != null && actualValueFieldName.trim() != '' ) {
            query = 'SELECT '+actualValueFieldName+' FROM '+sObjectName+' WHERE Id =: recordId';
        }
        
        if(query != null){
            try{
                List<SOBject> lstObj = Database.query(query);
                if(lstObj.size() > 0){
                    Decimal totalVal = 0;
                    Decimal actualVal = 0; 
                    
                    if(totalValueFieldName != null && totalValueFieldName.trim() != ''){ 
                        totalVal = Decimal.valueOf(String.valueOf(lstObj[0].get(totalValueFieldName)));
                        retObj.total = Integer.valueOf(totalVal) ; 
                    } 
                    actualVal = Decimal.valueOf(String.valueOf(lstObj[0].get(actualValueFieldName)));                     
                    //Means only 1 API Name was supplied and field type is percentage
                    if(totalVal == 0){
                        retObj.val = Integer.valueOf(actualVal) ; 
                        retObj.actual = Integer.valueOf(actualVal) ;  
                    }else if (actualVal > 0){
                        retObj.val = Integer.valueOf( ( actualVal /totalVal ) * 100 );   
                        retObj.actual = Integer.valueOf(actualVal) ;  
                    } 
                }
            }catch(Exception e){}
            
        }         
        return JSON.serialize(retObj) ;        
    }
}