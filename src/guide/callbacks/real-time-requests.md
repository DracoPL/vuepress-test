# Real-time requests



By deafult, every API Client is configured to use asynchronous flow. We simply notify 3rd party about events that happened in Docplanner/Doctoralia marketplace. We expect that every request will be accepted (with 2XX status code) - if it fails, we simply retry to send the communicate again.

#### What does it mean in practice?

Let’s analyze booking. If real-time booking is disabled, when user books we doesn’t wait for the response from 3rd party system. If the slot appears as available we don’t have additional layer of checking if it’s still valid. So if a user books - we’ll send booking request (slot-booked) and display success screen to the user. It’ll happen even if the response to the request will result with 4XX or 5XX status code. We’ll retry sending the communicate 3 times - after minute, 5 minutes and 15 minutes.

In practice - it’s not a problem. Usually situations when asynchronous flow causes trouble is when race-condition happens. If the clinic books a slot in the very same moment as Docplanner/Doctoralia user. It’s a super-rare edge case and doesn’t affect communication at all.

#### Risk of race condition

What if there’s a higher risk of race condition (huge clinic, lots of bookings)?

Don’t worry - we have it covered. In justified cases we have real-time booking flow that is applicable per API Client (so doesn’t need to be software-specific setting). In real-time flow we add additional check with one more request sent to 3rd party endpoint at the end of booking flow.

On the image below we’re described the flow:

<add graph of real-time communication>