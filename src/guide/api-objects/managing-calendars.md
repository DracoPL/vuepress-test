# Managing calendars

#### Calendars on doctors profiles are the core of Docplanner Marketplace. They allow to book visits to doctors via online channel.



Calendars on doctor profiles are strictly connected to addresses. Each premium address (paid one) can have a calendar activated. They aggregate [slots](https://integrations.docplanner.com/guide/api-objects/resources.html#slots) which give patients availability to book a visit to a chosen professional. 



## Feeding calendars



The first action after activation of an integration for a certain professional should be feeding full set of **availabilities (slots)** and **bookings**. Thanks to that operation the calendar in Docplanner should reflect the state of the partner system 1:1. 

The activation process should be ran in an isolated conditions, we recommend contacting  local specialists the support initial activations for clinics.



## Updating calendars



In order to maintain the most recent configuration we strongly encourage to update the doctors calendars basing on the events happening in the partner system. Each change of availability should instantly be reflected by an API call. 

Currently the API supports 3 operations allowing to modify the set of available slots:

- **Bookings** - in case of a booking (or cancellation / reschedule) - you should use corresponding method in the API 
- **Breaks** - in case of adding a non-specified event or a break during the day, you should use a method called calendar break to block the availability 
- **Availbility modification** - in case of change in the schedule, you should trigger updateSlots operation in order to change the current availabilities configuration.

See detailed description of the actions and objects in [Resources](https://integrations.docplanner.com/guide/api-objects/resources.html) section

##### 