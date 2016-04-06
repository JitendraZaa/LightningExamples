/*
 * Used in Lightning Component to get first 10 contacts
 * */
public class ContactController {

    @AuraEnabled
    public static List<Contact> getContacts(){
        return [SELECT 
                	ID, 
                	Name, 
                	Email,
                	Phone,
                	Birthdate 
               FROM 
                	Contact LImit 10];
    }
}