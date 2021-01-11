# Extensions

#### Many objects allow you to request additional information as an expanded response.  Rather than requiring you to hit the API repeatedly, we allow related data to be returned and loaded alongside the original resource on demand, which improves performance.

One or more resources can be included by using our standard `with` parameter. The `with` query parameter will take a list of one or more resources related to the primary resource and return those resources as well.

In the **API documentation**, under each section, you can find list of all available extensions. In the response samples you can also preview the examples of responses returned with each query parameter included. See more details in below video.

*/ Add GIF with API documentation and changing endpoints /*

Let's use an example, while requesting list of all the available facilities for a given API Client, after successful authorization, you can request them by calling our `GET /facilities` endpoint. So the request will look as follows:

```json
GET https://www.{domain}/api/v3/integration/facilities/{facility_id}
```

In response Docplanner will return list of facilities:

```json
{
"id": 1,
"name": "Sample hospital"
}
```

In that endpoint you can additionally request list of all the doctors, available in this clinic just by calling:

```json
GET https://www.{domain}/api/v3/integration/facilities/{facility_id}?with=facility.doctors
```

to get additionally collection of doctors with their identifiers

```json
{
  "id": 1,
  "name": "Sample hospital",
  "doctors": {
    "_items": [
      {
        "id": 123,
        "name": "Sample",
        "surname": "Doctor 123"
      },
      {
        "id": 234,
        "name": "Sample",
        "surname": "Doctor 234"
      }
    ]
  }
}
```

::: details Can I use multiple extensions in a single request?
**Yes**, you can add as many query parameters as you need, they should be connected with an `&` 
:::

