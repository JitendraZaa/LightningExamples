public class ContactListController_Server {
    
    @AuraEnabled
    public static List<Contact> getContacts(String search){
        search = '%'+search+'%' ;
        return [SELECT Name FROM Contact WHERE Name LIKE :search LIMIT 10] ;
    }

}