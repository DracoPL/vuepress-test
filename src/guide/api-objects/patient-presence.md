# Patient Presence



#### Doctors can mark patients as present/non-present on the visit. If your system supports the flow, you can reflect patients presence state in the API.



It’s purpose is notifying Docplanner/Doctoralia database if patient attended the visit. It’s quite useful for invoicing purposes, doctor isn’t charged for the visits that didn’t take place. This method is optional and doesn’t have to be implemented in Integration process.

To mark patient presence, you need to call our endpoint:

```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/bookings/{booking_id}/presence/patient
```

Two operations are available: **POST** (to mark patient as present) and **DELETE** (indicating no-show).

