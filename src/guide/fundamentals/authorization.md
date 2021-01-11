# Authorization



#### For authorization purposes we’re using industry standard - [**OAuth2 Protocol**](https://oauth.net/2/). To authorize you need set of **Client Credentials**. If you want to find out how to get Sandbox credentials - go here /add quick link to kickstart section/



::: warning Keep your credentials secure!
Be sure to keep your API keys secure! Do not share your secret API keys or token in publicly accessible areas such as GitHub, client-side code.
:::



### Obtaining the token

In order to obtain **bearer token** you need to call our endpoint (list of local domains can be found here) */add quick link to proper guide section/*:

```bash
https://www.{domain}/oauth/v2/token
```

In order to get the token you need to specify proper `grant_type` and `scope` - in case of regular integraitons the values shoud be set as `client_credentials` and `integration` accordingly. See below autorization request example below:

```bash
curl -u {client_id}:{client_secret} https://www.{domain}/oauth/v2/token -d 'grant_type=client_credentials&scope=integration'
```

with an example response:

```json
{
    "access_token": "03807cb390319329bdf6c777d4dfae9c0d3b3c35",
    "expires_in": 3600,
    "token_type": "bearer",
    "scope": null
}
```

Bearer token needs to be refreshed **every 24 hours**. 

All the requests **needs to contain authorization token** in headers. Operations without the token won't be accepted All the requests must be also made over **HTTPS**. 

```bash
Authorization: Bearer {access_token}
```

Calls made over plain HTTP will be considered insecure and will be redirected to HTTPS path with redirect status code (3XX) in response. 

::: details Do I need to use different token for each request?

**Absolutely not**, tokens are valid for 24 hours since creation. You should use the same token for all the operations in that timespan.

:::

