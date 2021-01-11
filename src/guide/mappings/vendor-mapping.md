# Vendor mapping



#### Mapping is the key element of the Integration as it determines if synchronization will be successful and flawless. Read this article to learn our tips on the mapping.

Before approaching the mapping process, you should study our [Resources](https://integrations.docplanner.com/guide/api-objects/resources.html) section with detailed explanation of all the contexts. 

The mapping process should be handled according to the below diagram:

<add mapping diagram>

The first step of the process is **retriving** and **storing** all the avaialble resources for a given API Client. The ones which needs to be mapped on partner side consist of:

- Facilities
- Doctors 
- Addresses (dictionary and address-specific)
- Services
- Insurances

In order to start the synchronization for each entity there should be a corresponding object in partner database. We strongly recommend creating an interace allowing to manage the mappings by the customers individually. The configurations tend to change quite often. See an example of mapping interface in the video below:

<add gif with GIPO or mapping interface> 

An important part of the process is also maintaining the most updated version of the resources as they can be changed from Docplanner interface level. The resources which can be affected consists of:

- Services
- Insurances

Especially services are critical in constant monitoring. Deletion of a service which is used for slots sync will result with unsuccessful update of calendar. In order to maintain the most recent services setup we encourage to run a periodic process, calling our [getAddressServices](https://integrations.docplanner.com/docs/#operation/getAddressServices) endpoint for each mapped resource. In order to do so, you need to call:

```http
https://www.{domain}/api/v3/integration/facilities/{facility_id}/doctors/{doctor_id}/addresses/{address_id}/services
```

In response the endpoint will return list of all available (non-deleted) address services:

```json
{
  "_items": [
    {
      "id": 101,
      "name": "USG",
      "is_default": true,
      "is_price_from": false,
      "price": 100,
      "description": "Description of service",
      "service_id": 1
    },
    {
      "id": 103,
      "name": "EEG",
      "is_default": true,
      "is_price_from": false,
      "price": null,
      "description": "Description of service",
      "service_id": 3
    }
  ]
}
```

All the address-services mapped on the partner side, which are not returned in the call **should be unmapped** as they may lead to issues while updating the calendars. 



::: details My system doesn't use addresses. What should I do?
In case of systems not using addresses resource we suggest mapping that resource to schedule if that applies. Otherwise address can be a concatenated value of clinic and resource (doctor) identifiers.
:::

