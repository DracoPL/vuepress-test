# SDK for PHP

## Repository

You can find SDK code in our public repository in [here](https://github.com/DocPlanner/integrations-api-sdk-php).

## Installation
### Composer

To install the via [Composer](http://getcomposer.org/), run `composer require docplanner/integrations-api-sdk-php`.

### Manual Installation

Download the files from repository and include `autoload.php`:

```php
    require_once('/path/to/DocPlanner/Client/vendor/autoload.php');
```

## Authorization

To get access to API you need to make request to `https://www.{domain}/oauth/v2/token` for access token using your client credentials (`client_id` and `client_secret`).
Then it could be injected to `Configuration` which is used to instantiate API clients.
Whole authorization process is based on OAuth2 protocol with `grant_type = client_credentials` and `scope = integration`.
Obtained token is valid for the next 24h, so it is good practice to cache it for that period of time.

This can be done using our SDK:
###Example
```php
//Get OAuth2 access token
$authorization = new DocPlanner\Client\Authorization('https://www.{domain}/oauth/v2/token');
$accessToken = $authorization->getAccessToken('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET');

// Configure access token for authorization 
$config = DocPlanner\Client\Configuration::getDefaultConfiguration()->setAccessToken($accessToken);

$apiInstance = new DocPlanner\Client\Api\AddressesApi(null, $config);
```


## Getting Started

Please follow the installation procedure and then run the following:

```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');
//Get OAuth2 access token
$authorization = new DocPlanner\Client\Authorization('https://www.{domain}/oauth/v2/token');
$accessToken = $authorization->getAccessToken('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET');

// Configure access token for authorization 
$config = DocPlanner\Client\Configuration::getDefaultConfiguration();
$config->setAccessToken($accessToken);
$config->setHost('https://www.{domain}/api/v3/integration');

$apiInstance = new DocPlanner\Client\Api\DoctorsApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$facility_id = 56; // int | ID of the Facility
$with = array(\DocPlanner\Client\Model\DoctorsScopes::SPECIALIZATIONS); // string[] | 

try {
    $result = $apiInstance->getDoctors($facility_id, $with);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DoctorsApi->getDoctors: ', $e->getMessage(), PHP_EOL;
}

// Configure access token for authorization 
$config = DocPlanner\Client\Configuration::getDefaultConfiguration()->setAccessToken($accessToken);

$apiInstance = new DocPlanner\Client\Api\AddressesApi(
    // If you want use custom http client, pass your client which implements `GuzzleHttp\ClientInterface`.
    // This is optional, `GuzzleHttp\Client` will be used as default.
    new GuzzleHttp\Client(),
    $config
);
$facility_id = 56; // int | ID of the Facility
$doctor_id = 56; // int | ID of a doctor in a facility

try {
    $result = $apiInstance->getAddresses($facility_id, $doctor_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AddressesApi->getAddresses: ', $e->getMessage(), PHP_EOL;
}
?>
```

