trigger SpeakerAssignmentTrigger on Speaker_Assignment__c (before insert, before update) 
{
  if(trigger.isbefore)
  {
      if(trigger.isinsert || trigger.isupdate)
      {
          SpeakerAssignmentHandler.checkDuplicateAssignment(trigger.new, trigger.oldmap);
      }
  }
}