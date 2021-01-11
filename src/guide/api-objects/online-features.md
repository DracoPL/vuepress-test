# Online Features

Docplanner allows to use set of features meant to support doctors in running their everyday practices using online features. The  functionalities consists of:

- **Remote Consultation Addresses**
- **Payments**
- **Video consultations**



## Online calendars

In the whole service we’ve highlighted calendars and filters allowing patients to find the specialist providing online service. On doctor profile, the onlien calendars are coloured in purple

<add image of online calendar>

The goal is to promote a safe way of conducting a consultation without face to face contact (via remote channels). The changes have affected the whole service - new calendars can be find on doctor’s profiles, we have added a dedicated search filter allowing to easily find them, there’s also a dedicated section on our homepage.

**The online addresses can be handled using our API**. Addresses presented on the image above are regular addresses and can be fetched from our API using regular GET /addresses call. In order to make it easier to distinguish which address is dedicated to online/remote consultations, we have added a **new scope on GET /addresses** endpoint.

To get that information you need to call our endpoint and add **addresses.online_only** filter. The request will then look as follows:

```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}?with=address.online_only
```

The response API will return parameter is_online_only to the payload which can be **true/false**. Sample response will look as follows:

```json
{
  "_items": [
    {
      "id": "123",
      "name": "Test Hospital",
      "post_code": "02-691",
      "street": "Obrzezna",
      "is_online_only": true,
      "_links": {
        "doctor": {
          "href": "/api/v3/integration/facilities/139878/doctors/11",
          "method": "get"
        },
        "facility": {
          "href": "/api/v3/integration/facilities/139878",
          "method": "get"
        },
        "self": {
          "href": "/api/v3/integration/facilities/139878/doctors/11/addresses/333",
          "method": "get"
        },
        "services": {
          "href": "/api/v3/integration/facilities/139878/doctors/11/addresses/333/services",
          "method": "get"
        }
      }
    }
  ]
}
```

Same value will be added to GET /doctors endpoint with **doctors.addresses** scope used.

While using the online calendars we strongly recommend using our unified service called **online consultation** - available in the services dictionary. Thanks to that the doctors will be able to benefit from dedicated filters in our search and boost on the listings.

#### How to implement it?

In the current model - doctors need to create **a separate calendar** for online appointments only. The flow is meant not to affect the already created mapping between Docplanner and 3rd party. In order to implement the communication to the new calendar, there needs to be a second mapping created on the software provider side. After the configuration on the doctor profile - there will be 2 addresses related to the same clinic on each profile:

- Address 1 -> Regular
- Address 2 -> Online

Calling GET/addresses with online_only scope allows to distinguish the type.

Due to such setup a new mapping needs to be created according to the graph:

<add online consultations graph>

The natural consequence of this state is that services need to be mapped accordingly. In the current structure, address_services (and their identifiers) are unique for each address. So if your current mapping looks as follows:

##### Addresses

| Docplanner ID |        Address        | Partner ID |    Address     |
| :-----------: | :-------------------: | :--------: | :------------: |
|      123      | Medical Clinic “Test” |     1      | Medical Clinic |

And in this address your configuration stores Docplanner services IDs, for example:

##### Services 

| DP address_service_id | Docplanner service | Partner service_id |   Service    |
| :-------------------: | :----------------: | :----------------: | :----------: |
|        112233         |   Regular Visit    |         1          |    Visit     |
|        223344         |  Recurring Visit   |         2          | Second visit |
|        445566         |        USG         |         3          |     USG      |

Both identifiers will change. The setup after configuration of online calendar will look as follows:

##### Addresses (with online)

| Docplanner ID |           Address            | Partner ID |        Address        |
| :-----------: | :--------------------------: | :--------: | :-------------------: |
|      123      |    Medical Clinic “Test”     |     1      |    Medical Clinic     |
|      234      | Medical Clinic “Test” online |     2      | Medical Clinic online |

The services will also change - we need a separate set of services for both addresses, so following the example

##### Services for Medical Clinic “Test” address:

| DP address_service_id | Docplanner service | Partner service_id |   Service    |
| :-------------------: | :----------------: | :----------------: | :----------: |
|        112233         |   Regular Visit    |         1          |    Visit     |
|        223344         |  Recurring Visit   |         2          | Second visit |
|        445566         |        USG         |         3          |     USG      |

###### Services for Medical Clinic “Test” online address:

| DP address_service_id | Docplanner service | Partner service_id | Service |
| :-------------------: | :----------------: | :----------------: | :-----: |
|        112233         |   Regular Visit    |         1          |  Visit  |

To sum up the implementation details, in order to stay inline with the docplanner data structure, the easiest way to build the new integration is by **creating a separate schedule dedicated to online/remote consultations**.

If the recommended option is impossible to develop, filtering can happen on the partner system side **based on the services**. Slots related to physical (regular) visits can be sent to existing addresses with current services setup. Slots dedicated to online visits can be channeled to the new online address with newly configured services set.

## Payments

To address doctors’ need of having the payment for the booking processed, we’ll allow users to pay for the visits using Docplanner marketplace functionality.

#### How does it work?

In case the doctor configures the payments feature, each patient that has completed the booking process will be automatically redirected to the payment flow. After the booking user is given a 90-minute window to complete the payment. If, for some reason, the payment isn’t completed - we will automatically cancel the booking.

From the technical perspective, the process will look as follows:

- User books a visit using Docplanner marketplace
- After completing booking - **slot-booked** request is generated and sent/ready to be pulled
- User is redirected to payment system to proceed with the payment - **the patient has 90 minutes to complete the payment**
  - Payment is successful - nothing changes
  - Payment isn’t successful within 90 minutes - visit is automatically cancelled and **booking-cancelled** event will be triggered

To sum up the flow: the whole payment processing will be done entirely on Docplanner side, once the booking is completed but not paid yet - regular notification will be dispatched with additional information about the payment

#### Changes in the API

In order to provide an information about payment, in case the doctor/clinic activates the feature a special field is added to the booking request: below an example of **slot-booked** request with new **“visit_payment”** field

```json
{
    "name": "slot-booked",
    "data": {
    "facility": {
        "id": "226402",
        "name": "Sample clinic",
        "_links": {
            "self": {
                "href": "/api/v3/integration/facilities/226402",
                "method": "get"
            },
            "doctors": {
                "href": "/api/v3/integration/facilities/226402/doctors",
                "method": "get"
            }
        }
    },
    "doctor": {
        "id": "161262",
        "name": "Henryk",
        "surname": "Mikulski",
        "_links": {
            "self": {
                "href": "/api/v3/integration/facilities/226402/doctors/161262",
                "method": "get"
            },
            "addresses": {
                "href": "/api/v3/integration/facilities/226402/doctors/161262/addresses",
                "method": "get"
            }
        }
    },
    "address": {
        "id": "410150",
        "name": "Hippopotomonstrosesquippedaliophobia",
        "street": "Kolejowa",
        "_links": {
            "self": {
                "href": "/api/v3/integration/facilities/226402/doctors/161262/addresses/410150",
                "method": "get"
            },
            "facility": {
                "href": "/api/v3/integration/facilities/226402",
                "method": "get"
            },
            "doctor": {
                "href": "/api/v3/integration/facilities/226402/doctors/161262",
                "method": "get"
            }
        }
    },
    "visit_booking": {
        "id": "6263715",
        "status": "booked",
        "start_at": "2020-04-16T16:00:00+01:00",
        "end_at": "2020-04-16T16:30:00+01:00",
        "duration": "30",
        "booked_by": "user", // or "doctor" or "integration"
        "canceled_by": "",
        "booked_at": "2020-02-26T14:38:19+02:00",
        "address_service": {
            "id": "243665",
            "name": "biopsja nerki",
            "price": 50,
            "is_price_from": false,
            "visit_payment": true
        },
        "patient": {
            "name": "Abraham",
            "surname": "Lincoln",
            "email": "example@example.com",
            "phone": "+48123123123",
            "birth_date": "1985-01-01",
            "nin": "894237492",
            "gender": "m" // or "f"
        },
        "comment": "Additional information about the visit"
    }
    },
    "created_at": "2020-02-26T14:38:32+02:00"
}
```

In order to make it possible to check the current status of the payment - we’ll extend info returned in **GET /bookings** endpoint with new data:

```json
{
"_items": [
{
    "id": "2134124",
    "status": "booked",
    "start_at": "2018-04-16T14:00:00+01:00",
    "end_at": "2018-04-16T14:30:00+01:00",
    "duration": "30",
    "booked_by": "user", // or "doctor" or "integration"
    "canceled_by": "",
    "booked_at": "2018-03-16T12:40:49+01:00",
    "canceled_at": null,
    "patient": {
        "name": "Abraham",
        "surname": "Lincoln",
        "email": "example@example.com",
        "phone": "+48123123123",
        "birth_date": "1985-01-01",
        "nin": "894237492",
        "gender": "m" // or "f"
    },
    "presence": "present" // or "absent" or null
    "visit_payment": true,
    "visit_payment_status": 'new'// or 'canceled', 'failed', 'successful', 'in_progress' 
}
```

The field will be added automatically to every slot-booked request on **all addresses** where the **payment feature is activated**. To distinguish the addresses with the payment feature - we have added a new scope to the **GET /addresses** endpoint. In order to get an information, one needs to query the endpoint with filter **?with=visit.payment**. The request will then look as follows:

```html
https://www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}?with=visit.payment
```

and the returned payload will look as follows:

```json
{
  "_items": [
    {
      "id": "123",
      "name": "Test Clinic",
      "post_code": "02-002",
      "street": "Aleje Jerozolimskie",
      "visit_payment": true,
      "_links": {
        "doctor": {
          "href": "/api/v3/integration/facilities/139878/doctors/11",
          "method": "get"
        },
        "facility": {
          "href": "/api/v3/integration/facilities/139878",
          "method": "get"
        },
        "self": {
          "href": "/api/v3/integration/facilities/139878/doctors/11/addresses/333",
          "method": "get"
        },
        "services": {
          "href": "/api/v3/integration/facilities/139878/doctors/11/addresses/333/services",
          "method": "get"
        }
      }
    }
  ]
}
```

Activation itself should be done by the clinic in contact with the Docplanner Customer Success team.

#### How to implement it?

Since the whole process is initiated and handled on Docplanner side, the only additional implementation is related with proper marking of the specific booking. If the partner software handles such information - after the slot-booked message is process visit can be marked as **“to be paid”**. There are 2 possible outcomes:

- Visit can be marked as **paid** if:
  - 90 minutes has passed and it’s not cancelled (we recommend adding slight delay for the messages to be processed)
  - GET/ booking endpoint was called with `visit.payment` scope and it’s visit_payment_status is marked as **successful**
- Visit can be marked as **not-paid/cancelled** if:
  - 90 minutes has passed and it’s cancelled
  - GET/ booking endpoint was called with `visit.payment` scope and it’s visit_payment_status is marked as **failed** or **cancelled**

## Video Consultations

#### How does it work?

Docplanner has recently introduced a brand new feature, allowing doctors to conduct visits remotely using our tool. It’s meant to allow doctor and patient to connect using our video communicator (based on an external streaming system). The process is fully handled on-site. In order to unlock the features for integrations, doctors will be gradually migrated to our new calendar interface, where the functionality can be activated.

The flow of the consultation is pretty simple and similar to any other video-call solutions. Both doctor and patient will be informed about the video call url using our standard means of communication (via email and SMS). For the patient - link to the meeting becomes available 1 hour before the visit.

Video consultations will be also available for our integrated partners. After completing the booking, we’ll be adding a dedicated link to the booking request. After clicking the link doctor will be redirected automatically (after logging in to the interface) to the meeting.

Once the link is provided - it won’t change. The url is automatically redirected to the right path - in case of reschedules or changes on Docplanner side, changes will be applied automatically without any other communication via API.

#### Changes in the API

The only process affected in the video consultations flow is the booking request. In the **slot-booked** notification, we’ll add a new field - `videocall_url` with the direct link to the visit. If the feature is activated on Docplanner side, the **slot-booked** request will look as follows:

The url can be also fetched from our GET /booking endpoint. The response will look like this:

```json
{
    "id": "2134124",
    "status": "booked",
    "start_at": "2018-04-16T14:00:00+01:00",
    "end_at": "2018-04-16T14:30:00+01:00",
    "duration": "30",
    "booked_by": "user", // or "doctor" or "integration"
    "canceled_by": "",
    "booked_at": "2018-03-16T12:40:49+01:00",
    "canceled_at": null,
    "patient": {
        "name": "Abraham",
        "surname": "Lincoln",
        "email": "example@example.com",
        "phone": "+48123123123",
        "birth_date": "1985-01-01",
        "nin": "894237492",
        "gender": "m" // or "f"
    },
    "presence": "present", // or "absent" or null
    "videocall_url": "http://url-to-video-call"
}
```

#### How to implement it?

From the external software perspective, the only goal should be allowing the doctor/clinic to easily get access to the video call room before the visit. Recommended way of handling the process is by adding a new button/field in the visit card as well as in the agenda view, allowing the doctor to enter the meeting easily. Additionally, if there’s such possibility - doctors can be reminded about the meeting before (separately to docplanner communication). Video Call visits can be also visually distinguished in the 3rd party software interface.