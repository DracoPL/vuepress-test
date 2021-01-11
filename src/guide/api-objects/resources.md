# Resources



#### In the API we use several resources to identify entities in our server. You need to study them carefully as all of them are needed to create stable integration. All of the resources are related to object-specific identifiers. 

The identifiers are constant, however they can change overtime due to actions performed both via API and Docplanner interface (*i.e - doctors have certain services on a profile which indicate which type of visit patient can expect and what might be the price. Doctor might delete a service and add a new, identical one - with this action the identifier will change although logically no change is visible in the interface.)* 

:::tip Monitor resources state

In order to maintain stable communication you should monitor the state of the mapped resources

:::

Docplanner API is basing on usage of several resources available in the API. To ensure proper understanding of our domain, we encourage you to build a context map using our template (download it here). <add context map template> 

in this article you'll find all the resources available via API with both business- and technical-contexts.



## Facilities



#### The primary object available in the API is called a **facility.** It represents a clinic profile on our marketplace, therefore in order to get access to our API, customer needs to have a clinic profile. Facility has an unique identifier (**facility ID)** which needs to be queried in each API call.

After successful authorization (see how to do it [here](https://integrations.docplanner.com/guide/fundamentals/authorization.html) ) you'll get access to a defined set of facilities, connected to the API Client. They are assigned manually by Docplanner Team on a written disposition from the customer. 

:::warning API access is avaialble only for Docplanner customers

Currently our API doesn't support global access to all the resources on the marketplace. Partner can get access only to a limited set of resources after proper authorization from the clinic / customer.

:::

There’s no limit of facilities among one API client - thanks to one set of Client Credentials, you can access one facility, few facilities or a facility chain. Facility might have multiple addresses - this usecase is meant for chains of hospitals, clinics with multiple locations. The facility addresses are not visible in the API - all of them are represented by a single **facility ID**. The distinction between different location is made on the doctor's address level.

See doctor addresses section >> 

The purpose of facilities in Docplanner is to picture organizational structure of a medical entity - a hospital, clinic, office etc. A facility is aggregating doctors which are shown on the clinic profile. 

Click here to see our sample clinic profile >>

In order to retrive all the available facilities, use getFacilities endpoint - the technical documentation of the operation can be found in our API documentation [under this link](https://integrations.docplanner.com/docs/#operation/getFacilities).  





## Doctors



#### Doctors entity represents a specific professional working in a clinic. 

With **Facility_ID** parameter, you are able to get further details, needed to move on with the integration. Next step should be getting list of doctors working within the facility. There are 2 restrictions which might limit the number of results 

- Specialist needs to be our client with commercial profile. Non-paid professionals won't be returned in the API
- Specialist needs to be connected to a facility. If you expect to fetch more doctors than our API returned - check FAQ section for troubleshooting.

In order to retrive all the available facilities, use getFacilities endpoint - the technical documentation of the operation can be found in our API documentation [under this link](https://integrations.docplanner.com/docs/#operation/getFacilities).  



## Addresses



#### Address is a specific parameter which allows us to identify particular **doctor** in a specific **facility**, one can say that address parameter is a combination of this two objects.

Address is the most granulated entity in Docplanner API. A single doctor can have multiple addresses but each will have unique identifier - **address_id**. The main purpose of address_id is to determine specific locations of a facility. 

Let's use an example - to 

:::tip Mapping addresses to external objects

Addresses quite often are also mapped to specific **schedules** in the 3rd party software. 

:::

In Docplanner interface, addresses are displayed as separate locations on the doctor profile. 



<add picture of addresses tab on doc profile>



Addresses are very important in the mapping process as they aggregate all the items used for booking process including:

- Slots
- Services
- Insurances
- Bookings

Above resources are described in details in the following sections.



## Services



#### Services in Docplanner represents types of visits (activities) performed by a specialist while treating a patient. They are used both as a price list, as well as part of the slots configuration, determining what services can be chosen by patient during booking.

There are 2 types of services described in API Documentation - Item Services and Address Services. What do they stand for? Let’s start with most basic distinction:

- **Services** - they are our dictionary services - IDs are re-usable. In fact they are used for mapping second type of services:
- **Address Services** - they are unique objects which are related only with one, specific address - once you’ll try to use address_service_id in any other address, than the one they’re related to, API will throw an error. After creating Address Service, you can use it for configuring slots in calendar and in booking flow.

Below, find a walkthorugh explaining how to use them correctly in the integration process:

1. **Getting Services List** - in order to get full dictionary of available services you need to call our [getServices](https://integrations.docplanner.com/docs/#tag/Services) endpoint

```http
www.{domain}/api/v3/integration/services
```

In response, API will return full dictionary of all available services, i.e:

```json
{
  "_items": [
    {
      "id": "1",
      "name": "ablacja"
    },
    {
      "id": "3",
      "name": "ablacja serca"
    },
    {
      "id": "5",
      "name": "akupresura"
    },
    {
      "id": "7",
      "name": "akupunktura"
    }
  ]
}
```

IDs returned by Docplanner API (service_ids**) are unique** and can be mapped to ones in 3rd party software, however they cannot be directly used to add a service or slot to doctor profile.

:::tip Haven't found service matching one in your software?

If the list of returned services doesn't meet all of your needs and you believe, that for specific clinics there are services which may not be sufficient please contact us at integrations@docplanner.com - we'll guide you through the process of adding missing ones or recommend using existing ones.

:::

2. **Modifying specific service to doctor's address**

Once the dictionary is properly mapped and you're ready to use our standard identifiers, you can modify the services using our [addAddressService](https://integrations.docplanner.com/docs/#operation/getAddressServices) endpoint

```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/services
```

Required parameters are:

- Facility_id
- Doctor_id
- Address_id

Request body should be structured as follows:

```json
{
  "service_id": "3",
  "is_price_from": true,
  "price": 500
}
```

Used in the request parameters represents:

- service_id - which stands for already described item_service_id
- is_price_from
- price

In response to successful request, we’ll return it’s ID - we call it **address_service_id**. Below an example:

```json
Content-Type: application/vnd.docplanner+json; charset=UTF-8
Location: https://www.znanylekarz.pl/api/v3/integration/facilities/111/doctors/222/addresses/333/services/444
```

:::warning Address Services are valid only to a specific addressID

Address_service_id, returned in response is unique and related to the specific address. It needs to be stored by 3rd party, since it’ll be needed to further operations - adding and modifying slots, as well as handling bookings. **It cannot be re-used to any other doctor or address!**

:::

Once you successfully get address_service, you can conduct few more operations:

- **GET** address_services list - displaying current state of address services related with specific address
- **DELETE** address_service
- **PATCH** address_service - in order to modify `price` and `is_price_from` parameter



## Slots



#### Slots represent available time-spans where patients can book a visit to a desired specialist (doctor) with determined duration and service. 

In order to add available time slots to calendar you need to complete all the mapping steps  Adding them is a matter of calling endpoint with PUT method. It works to both add or replace slots for a specific date range. 

In order to add slots to a calendar, you need to add our [replaceSlots](https://integrations.docplanner.com/docs/#operation/replaceSlots) endpoint

```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/slots
```


Request body should contain following parameters:

- start - representing start time of the time span
- end
- address_service_id
- duration

and should be structured as follows:


```json
{
    "slots": [
        {
            "address_services": [
                {
                    "address_service_id": 12345,
                    "duration": 30
                }
            ],
            "end": "2020-11-10T15:00:00+0200",
            "start": "2020-11-10T07:00:00+0200"
        },
        {
            "address_services": [
                {
                    "address_service_id": 67890,
                    "duration": 20
                },
                {
                    "address_service_id": 45678,
                    "duration": 60
                }
            ],
            "end": "2020-11-14T19:00:00+0200",
            "start": "2020-11-14T16:00:00+0200"
        }
    ]
}
```



:::tip Add work periods, not single slots

In order to feed the calendar with slots, you don't need to add all the slots separately, you simple need to determine the workperiods and duration of a visit for each service. We'll calculate the split of slots on our end.

:::

Let’s analyse given example. By setting `start` and `end` parameters you specify the time range when the slots should appear as available for bookings - in given example, we’re notifying the application that on November 10th doctor is available for online booking between 7:00 and 15:00 and he accepts patients only for address_service_id = 12345. The daily schedule will be divided into 30 mins slots (thanks to `duration` parameter).

On November 14th however, the doctor is up to bookings between 16:00 and 19:00 and he is able to service both address_service_id = 67890 - he needs 20 minutes for each patient (again - duration) and address_service_id = 45678 - he needs 60 minutes for each patient. Docplanner/Doctoralia application will divide the whole schedule into 20 minutes slots . If patient will book 60-mins service, we’ll simply hide 3 such time slots.

:::tip Calculating slots

To find the most optimal configuration of slots we're using greatest common divisor.

:::

It’s important to understand, that specific `address_service_id` attached to slots accordingly determines what services will be available for booking. In Docplanner interface, on the first step of booking, we allow user to choose service from dropdown. 



## Calendar breaks

### In case of any events blocking doctor's availability during the day 

What if there’s need of creating a break during the day?

There’s a method for such usecase. We call it calendar_breaks. You can use it for any purpose. Adding calendar break results with hiding any available slots in specific address. It can be achieved by calling our endpoint using POST method.

```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/breaks
```

Body needs to contain following parameters:

- since - start of the break
- till - end of the break

```json
{
  "since": "2018-11-10T13:00:00+0200",
  "till": "2018-11-10T14:00:00+0200"
}
```

In the response header after successful operation, breakID will be returned. It needs to be stored in order to modify that parameter in the future. 

Once break is created, several operations can be performed:

- **GET** list of calendar breaks - narrowed down by `since` and `till` parameters

```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/breaks{?since,till}
```

- **GET** specific calendar break
- **DELETE** specific calendar break

both to the same endpoint:

```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/breaks/{break_id}
```



## Insurances

#### Insurances determine which of the insurance providers is cooperating with a given professional. Currently they are not connected with our booking flow.

:::warning Insurances are not supported in all the locales

Currently insurances flow isn't active in all of our locales. To specify it contact our local specialist or send an email to integrations@docplanner.com

:::

Insurances are managed in a similar way as services. In the first step you need to synchronize your dictionary by getting list of all available providers with our [getInsuranceProviders](https://integrations.docplanner.com/docs/#operation/getInsuranceProviders) endpoint by calling:

```http
https://www.{domain}/api/v3/integration/insurance-providers
```

Once the dicrionary is properly synchronized, you can GET, POST or DELETE insurances on the doctor profile by calling proper endpoints. For insurances **we don't use address-specific identifiers** so there's only a need of mapping the dictionary. 

In order to add an a new entry on the insurance providers list, you simply need to call our endpoint [addAddressInsuranceProvider](https://integrations.docplanner.com/docs/#operation/addAddressInsuranceProvider)

```http
https://www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/insurance-providers
```

with specified insurance_provider_id in the payload:

```json
{

  "insurance_provider_id": 3

}
```

Using the same methodology you can:

- GET the list of already existing insurance providers
- DELETE a specific insurance provider



The insurance providers are visualised in the Docplanner interfce as items of a specific address.

<add image of insurances on a doctor profile>



## Bookings

#### Bookings are obviously the key element of the process and stand for any reservation done by patient in a clinic or by Docplanner Marketplace.

Since the communication is dual - bookings can be added both from Docplanner and the 3rd party system. Let's start with the usecase of a booking, added in the partner system. 

##### Booking from the clinic system level

When booking is added, a request to Docplanner API should be triggered, using [bookSlot](https://integrations.docplanner.com/docs/#operation/bookSlot) endpoint. 

```http
https://www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/slots/{start}/book
```

The request body should contain following parameters:

```json
{
  "address_service_id": 123,
  "duration": 10,
  "is_returning": false,
  "patient": {
    "name": "Abraham",
    "surname": "Lincoln",
    "email": "example@example.com",
    "phone": 48123123123,
    "birth_date": "1985-01-01", (optional)
    "nin": 894237492, (optional)
    "gender": "m" (optional)
  }
}
```

Representing:

- Address_service_id - the service chosen by the patient (in case of not having the chosen service mapped, you can you deafult/standard/first from the list service)
- Duration - time needed for the visit
- Is_returning - whether or not the patient was clinic's patient before
- Name - patient's name
- Surname - patient's surname
- Email - patient's email
- Phone - patient's phone
- Birth_date - patient's birth date (if applies)
- NIN - national identification number of the patient 
- Gender (m or f) - gender of the patient

Bookings needs to be added to Docplanner API as soon as possible as their direct effect is blocking the slot and preventing patients from booking the visit via Docplanner interface.

Sending actual patient data is crucial in the communication as it's required for useage of Docplanner features utilized by the clinic. 

##### Booking from Docplanner

The flow from Docplanner/Doctoralia perspective is rather simple. In the booking flow thanks to the form user is submitting all information required to complete the process in 2 simple steps. At the end asynchronously slot-booked notification is dispatched either to PULL notifications queue or is being PUSHed to given endpoint. (see details in the [Callbacks](https://integrations.docplanner.com/guide/callbacks/push-vs-pull.html) section)

In `slot-booked` request, we’re provided very broad range of information. Below you’ll find a sample of the body:

```json
"name": "slot-booked",
"data": {
"facility": {
    "id": "226402",
    "name": "Test Hospital",
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
    "name": "John",
    "surname": "Doe",
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
    "name": "Test Hospital",
    "street": "Obrzezna",
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
    "start_at": "2020-11-18T16:00:00+01:00",
    "end_at": "2020-11-18T16:30:00+01:00",
    "duration": "30",
    "booked_by": "user", // or "doctor" or "integration"
    "canceled_by": "",
    "booked_at": "2018-11-14T14:38:19+02:00",
    "address_service": {
        "id": "243665",
        "name": "USG",
        "price": 50,
        "is_price_from": false
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
"created_at": "2020-11-14T14:38:32+02:00"
}
```

Apart from the obvious data, already analysed in previous paragraphs (Facility, Doctor, Address), you’ll receive:

- Detailed booking data - especially visit_booking_id is crucial, since it’s needed to modify the booking in case of such need
- Detailed patient data

Once you have `visit_booking_id` there are two operations possible - using endpoint:

```http
www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/bookings/{booking_id}
```

You can either perform **DELETE** operation which end up with cancellation or **POST** in order to update (or move) visit. Body should contain start parameter indicating new time of visit start and address_service_id

```json
{
  "address_service_id": 12345,
  "duration": 10
  "start": "2020-11-26T16:00:00+01:00"
}
```