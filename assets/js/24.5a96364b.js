(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{448:function(e,t,a){"use strict";a.r(t);var s=a(69),i=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"real-time-requests"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#real-time-requests"}},[e._v("#")]),e._v(" Real-time requests")]),e._v(" "),a("p",[e._v("By deafult, every API Client is configured to use asynchronous flow. We simply notify 3rd party about events that happened in Docplanner/Doctoralia marketplace. We expect that every request will be accepted (with 2XX status code) - if it fails, we simply retry to send the communicate again.")]),e._v(" "),a("h4",{attrs:{id:"what-does-it-mean-in-practice"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-does-it-mean-in-practice"}},[e._v("#")]),e._v(" What does it mean in practice?")]),e._v(" "),a("p",[e._v("Let’s analyze booking. If real-time booking is disabled, when user books we doesn’t wait for the response from 3rd party system. If the slot appears as available we don’t have additional layer of checking if it’s still valid. So if a user books - we’ll send booking request (slot-booked) and display success screen to the user. It’ll happen even if the response to the request will result with 4XX or 5XX status code. We’ll retry sending the communicate 3 times - after minute, 5 minutes and 15 minutes.")]),e._v(" "),a("p",[e._v("In practice - it’s not a problem. Usually situations when asynchronous flow causes trouble is when race-condition happens. If the clinic books a slot in the very same moment as Docplanner/Doctoralia user. It’s a super-rare edge case and doesn’t affect communication at all.")]),e._v(" "),a("h4",{attrs:{id:"risk-of-race-condition"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#risk-of-race-condition"}},[e._v("#")]),e._v(" Risk of race condition")]),e._v(" "),a("p",[e._v("What if there’s a higher risk of race condition (huge clinic, lots of bookings)?")]),e._v(" "),a("p",[e._v("Don’t worry - we have it covered. In justified cases we have real-time booking flow that is applicable per API Client (so doesn’t need to be software-specific setting). In real-time flow we add additional check with one more request sent to 3rd party endpoint at the end of booking flow.")]),e._v(" "),a("p",[e._v("On the image below we’re described the flow:")]),e._v(" "),a("add",{attrs:{graph:"",of:"","real-time":"",communication:""}})],1)}),[],!1,null,null,null);t.default=i.exports}}]);