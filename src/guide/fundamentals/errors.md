# Errors

<img :src="$withBase('/img/security.png')" text-align="left" size="40%">

In Docplanner we're using standard HTTP response codes to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error which has failed given the information provided (e.g., resource is no longer available, request doesn't contain all the required fields, etc.). Codes in the `5xx` and codes in the `5xx` range indicate a server-side error. 

::: tip Monitoring Docplanner Status

You can monitor the status of our services by subscribing to our status page, available [here](https://status.docplanner.com/)

:::

### HTTP Status Codes

Below, find the list of all the conventional HTTP status codes with line of coment:

| Status Code                           | Description                                                  |
| ------------------------------------- | ------------------------------------------------------------ |
| **200** - Success                     | Request has been successfully processed                      |
| **201** - Success (created)           | New resource has been successfully created                   |
| **204** - Success (No content)        | Request has been successfully processed <br />and returns no content |
| **400** - Bad request                 | Invalid syntax on a request                                  |
| **401** - Unauthorized                | Authorization has failed,                                    |
| **403** - Forbidden                   | No access to a given resource <br />or conducting forbidden action |
| **404** - Not found                   | Resource has not been found (might be deleted)               |
| **405** - Method not allowed          | Attempted method is not supported by requested endpoint      |
| **409** - Conflict                    | Request conflicts with current state of server i.e resource <br />is being duplicated |
| **429** - Too many requests           | Rate limit has been exceeded. Find out more here */link/*    |
| **500, 502, 503, 504** - Server error | Docplanner server is not operative at the moment <br />(should happen very rarely) |

Every response has specific Content-Type header:

```json
Content-Type: application/vnd.error+docplanner+json
```

### Custom error messages

In the real-time booking flow we allow making the booking functionality dependent of the response to a synchronous call during the process (read more here /link/).  

In our interface the system might display custom error message informing patient about the reason of failure on response to error code from `4XX` family and header `Content-Type: application/json` . Body of the response must contain specific `error_code` defined in a dictionary provided to Integrations Support (via email to integrations@docplanner.com).

```json
{
    "error_code": 1
}
```

