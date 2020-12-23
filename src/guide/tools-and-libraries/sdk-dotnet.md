# SDK for .NET

## 1. Introduction

Our SDK is created in .NET Standard 2.0, so we are supporting .NET Framework 4.6.1+ and .NET Core 2.0+

More information and documentation you can find in our [Integrations Hub](https://docplanner.github.io/integrations-hub-front-app/)

## 1.1. Requirements

This package doesn't have special requirements. Within package we bundle `Newtonsoft.Json 12.0.0+` and `System.ComponentModel.Annotations 5.0.0+`

## 2. Setup

### 2.1. Getting package

Package can be found in Docplanner [public repository](https://dev.azure.com/docplanner/Public packages/_packaging?_a=package&feed=integrations%40Local&package=Integrations.Api.Sdk&protocolType=NuGet).

You need to add new package source `https://pkgs.dev.azure.com/docplanner/c4fa307b-7faf-45b9-a23f-faace862ad8f/_packaging/integrations%40Local/nuget/v3/index.json` in NuGet config. 

After that look for package `Integrations.Api.Sdk` in package manager.

### 2.2. Authentication

We use OAuth 2.0 protocol for endpoints authentication.

You need to get token from endpoint `https://www.{domain}/oauth/v2/token` with specific grand type and scope using your `client_id` and `client_secret` for basic authorization.

```c#
var values = new List<KeyValuePair<string, string>>
{
    new KeyValuePair<string, string>("grant_type", "client_credentials"),
    new KeyValuePair<string, string>("scope", "integration")
};
requestMessage.Headers.Add("Authorization", $"Basic {client_id}:{client_secret}");
```

You must use token in `Authorization` header to access API endpoints.

```c#
httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "your_token");
```

More information about authentication you can find [here](http://docplanner.github.io/integrations-api-docs/openapi/#section/Authentication).

## 3. Using Client

### 3.1. Client naming

Client are named according to tags in [api docs](docplanner.github.io/integrations-api-docs/openapi/). 

So if we have `Services` tag then client will be named `ServicesClient`.

### 3.2. Using Client

As seen in example we call `FacilitiesClient` to get list of facilities. We create `HttpClient` with base URI `https://www.{domain}/api/v3/integration`.

```c#
var httpClient = new HttpClient()
{
	BaseAddress = new Uri("https://www.{domain}/api/v3/integration")
};
httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", await GetToken()); //get token
var apiTest = new FacilitiesClient(httpClient);
var result = await apiTest.FacilitiesGetAsync();
```
