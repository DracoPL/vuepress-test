# Rate Limits

#### In order to prevent DOS/DDOS attacks and abuses of the API, we use **rate limitting**. 

Currently the rate limits are set on 2 levels:

- **Limitting the requests quota per hour**

- **Limiting WRITE (PUT, POST, DELETE) requests per minute**


In case of justified needs, the limits can be increased as they are set on client level. In order to disucss it, contact us at integrations@docplanner.com

If your limits reaches zero, subsequent requests will receive the `429 Too Many Requests` response code until the request reset time has been reached.

:::tip What if I don't get the parameters in headers?

No rate limiter specific headers in API responses means that the rate limitter has been disabled

:::

We inform you of the state of rate limiter using HTTP headers. 

- **X-RateLimit-Limit**

  Request limit for the current time span

- **X-RateLimit-Reset**

  Rate limiter reset date in in [ISO8601](http://en.wikipedia.org/wiki/ISO_8601) format

- **X-RateLimit-Used**

  Number of requests made in current time span

- **X-RateLimit-Remaining**

  Number of requests remaining in current time span

 We highly recommend an exponential backoff of your requests in case of reaching rate limits.