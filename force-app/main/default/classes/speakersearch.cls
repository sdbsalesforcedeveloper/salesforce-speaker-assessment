public with sharing class speakersearch {

    @AuraEnabled(cacheable=true)
    public static List<Speaker__c> searchSpeakers(String nameKey, String specialityKey) {

        String nameLike = '%' + nameKey + '%';
        String specLike = '%' + specialityKey + '%';

        return [
            SELECT Id, Name, Email__c, Speciality__c, Bio__c
            FROM Speaker__c
            WHERE Name like:namelike 
            AND Speciality__c like:specLike
            ORDER BY Name
        ];
    }

    @AuraEnabled(cacheable=true)
    public static Speaker__c getSpeaker(Id speakerId) {
        return [
            SELECT Id, Name, Speciality__c, Bio__c
            FROM Speaker__c
            WHERE Id = :speakerId
            LIMIT 1
        ];
    }

   @AuraEnabled(cacheable=true)
public static Boolean isAvailable(Id speakerId, Date selectedDate) {
    return [
        SELECT COUNT()
        FROM Speaker_Assignment__c
        WHERE Speaker__c = :speakerId
        AND Assignment_Date__c = :selectedDate
    ] == 0;
}

@AuraEnabled
public static void createAssignment(Id speakerId, Date selectedDate) {
    insert new Speaker_Assignment__c(
        Speaker__c = speakerId,
        Assignment_Date__c = selectedDate,
        Name = 'Assignment - ' + String.valueOf(selectedDate)
    );
}
}