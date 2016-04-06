/**
 * Author	:	Jitendra Zaa
 * Desc		:	This Controller is used by Lightning component to make Http request to Wikipedia
 * */
public class WikiHttpRequest {

    @AuraEnabled
    public static String getWikiResponse(String searchText, Integer searchLimit){
        HttpRequest req = new HttpRequest();
        req.setEndpoint( 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchText + '&limit='+
                        searchLimit + '&namespace=0&format=json' );
		req.setMethod('GET');
        
        Http http = new Http();
		HTTPResponse res = http.send(req);  
		return res.getBody();
    }
}