# Salesforce Speaker Management System

## Project Overview
This project is a Salesforce LWC and Apex based application developed as part of a
Junior Salesforce Developer assessment.

The application allows users to search speakers and assign them to sessions while
ensuring that a speaker is not double-booked for overlapping sessions.

---

## Business Requirement
- A speaker can be assigned to multiple sessions
- A speaker must NOT be assigned to two sessions that overlap in date and time
- If an overlap occurs, the system should prevent saving the record and show an error

---

## Objects Used
- Speaker__c  
- Session__c  
- Speaker_Assignment__c (Junction Object)

---

## Technical Implementation
- Apex Trigger on Speaker_Assignment__c
- Trigger Handler class to handle business logic
- Validation logic to check overlapping sessions
- Lightning Web Components (LWC) for:
  - Searching speakers
  - Displaying speaker list
  - Booking sessions
- Lightning Message Service for component communication
- GitHub used for version control

---

## Key Features
- Prevents double booking of speakers
- Clean trigger-handler design pattern
- Modular and reusable LWC components
- Fully version controlled Salesforce metadata

---

## How to Test
1. Create a Speaker record
2. Create two Session records with overlapping time
3. Assign the same Speaker to the first session → Save (Success)
4. Assign the same Speaker to the second overlapping session → Error shown

---

## Technologies Used
- Salesforce Apex
- Lightning Web Components (LWC)
- Lightning Message Service
- Salesforce CLI
- Git & GitHub
