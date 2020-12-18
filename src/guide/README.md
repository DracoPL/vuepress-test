## Intro

<img :src="$withBase('/img/launch.png')" style="width:40%; float: right; margin-left: 50px;"> **Integrating with Docplanner API is dedicated to all the providers of the medical softwares for clinics. It allows creating an ongoing syncronization of available slots on doctor's profiles as well synchronizing bookings, in order to build an top-notch automated experience for the customers.**

This guide is meant to explain in details full business context of the integration as well as all the objects and different contexts used in the API. 

The fastest way to use our API is installing our **client libraries** currently there are 2 of the available:

- SDK for PHP
- SDK for .NET

If you want to create the integration from scratch, apart from reading this guide, check out our API Documentation */add link to API docs/*.


## API Type

In Docplanner we're using **RESTful API**. You you want to find out more about this technology - [click here](https://en.wikipedia.org/wiki/Representational_state_transfer) 

In accordance to RESTful guidelines, we use standard HTTP methods. Each has a special meaning:

| Verb   | Description                                 |
| ------ | :------------------------------------------ |
| GET    | Retrieve resources                          |
| POST   | Creates resources or execute custom actions |
| PUT    | Replace resources                           |
| PATCH  | Partial update of resources                 |
| DELETE | Delete resources                            |

