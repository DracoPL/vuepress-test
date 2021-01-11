# Validating schedule coverage



#### Calendars are crucial items for all the doctors. Their availability needs to be always kept up-to-date in order to prevent from missing booking opprotunities or overbooking. 



Recommended practice ensuring, that the setup for each doctor is performing periodic (daily/hourly) cross-check of the available slots in the schedule using [getSlots](https://integrations.docplanner.com/docs/#operation/getSlots) endpoint. In order to run it, you need to call our endpoint:

```http
https://www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/slots
```

In response, the API will return the list of all currently added slots 

```json
{
  "_items": [
    {
      "start": "2020-12-16T14:00:00+01:00"
    },
    {
      "start": "2020-12-16T14:30:00+01:00"
    }
  ]
}
```

To get the full picture, you should also perform [getBookings](https://integrations.docplanner.com/docs/#operation/getBookings) and [getCalendarBreaks](https://integrations.docplanner.com/docs/#operation/getCalendarBreaks) operations in order to retrive all the items affecting the schedule. The result of the combination provides list of all currently available slots in the marketplace. The list should be compared to actual availabilities list in the partner system. 

In case of any inconsistencies, the Docplanner configuration should be updated accordingly.