(window.webpackJsonp=window.webpackJsonp||[]).push([[5,9],{365:function(e,t,a){},366:function(e,t,a){"use strict";a(365)},368:function(e,t,a){},389:function(e,t,a){"use strict";a.r(t);var n={name:"Vero",data:function(){return{nextStep:!1,checkbox:!1}},methods:{nextClick:function(){this.nextStep=!0}}},s=(a(366),a(69)),i=Object(s.a)(n,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"py-5 vero"},[a("div",{staticClass:"container"},[a("h2",[e._v("Contact us ")]),e._v(" "),a("p",[e._v("Let your clients get the most of the automated experience and integrate your system with Docplanner. Learn more about benefits of having an integration in the below sections.")]),e._v(" "),a("div",{attrs:{id:"mc_embed_signup"}},[a("form",{staticClass:"validate",attrs:{id:"mc-embedded-subscribe-form",action:"https://app.getvero.com/forms/bad5af44d8c1701b8ae9b13bed893796",method:"post",name:"mc-embedded-subscribe-form"}},[a("div",{attrs:{id:"mc_embed_signup_scroll"}},[a("div",{staticClass:"mergeRow gdpr-mergeRow content__gdprBlock mc-field-group",class:{visible:e.nextStep},attrs:{id:"mergeRow-gdpr"}},[a("div",{staticClass:"content__gdpr"},[a("fieldset",{staticClass:"mc_fieldset gdprRequired mc-field-group",attrs:{name:"interestgroup_field"}},[a("label",{staticClass:"checkbox subfield",attrs:{for:"gdpr_52003"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkbox,expression:"checkbox"}],staticClass:"av-checkbox gdpr",attrs:{id:"gdpr_52003",name:"gdpr[52003]",type:"checkbox",value:"Y"},domProps:{checked:Array.isArray(e.checkbox)?e._i(e.checkbox,"Y")>-1:e.checkbox},on:{change:function(t){var a=e.checkbox,n=t.target,s=!!n.checked;if(Array.isArray(a)){var i=e._i(a,"Y");n.checked?i<0&&(e.checkbox=a.concat(["Y"])):i>-1&&(e.checkbox=a.slice(0,i).concat(a.slice(i+1)))}else e.checkbox=s}}}),e._m(0)])])])]),e._v(" "),a("div",{staticClass:"mc-field-group"},[a("input",{staticClass:"required email",class:{short:e.nextStep},attrs:{id:"mce-EMAIL",name:"email",placeholder:"Your email",type:"email",value:""},on:{keydown:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;t.preventDefault()}}}),e._v(" "),a("input",{attrs:{name:"redirect_on_success",type:"hidden",value:"https://docplanner.tech/newsletter/thankyou"}}),e._v(" "),a("input",{attrs:{name:"redirect_on_fail",type:"hidden",value:"https://docplanner.tech/newsletter/error"}}),e._v(" "),a("button",{staticClass:"next",class:{hide:e.nextStep},attrs:{type:"button"},on:{click:e.nextClick}}),e._v(" "),a("input",{staticClass:"btn btn-pink",class:{show:e.nextStep,active:e.checkbox},attrs:{id:"mc-embedded-subscribe",name:"subscribe",type:"submit",value:"I AGREE      "}})])])])])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("span",[this._v("I would like ZnanyLekarz sp. z o.o. with registered office in Warsaw to send me an email regarding integration.\n                  I know that consent is voluntary and can be withdrawn at any time. I confirm that I have read the privacy policy."),t("br"),t("br"),this._v(" "),t("strong",[this._v("Privacy policy for the docplanner tech newsletter")]),t("br"),this._v('\n                  The data controller of personal data processed in connection with the newsletter "docplannertech" is ZnanyLekarz\n                  sp. z o.o. with registered office in Warsaw at 5/7 Kolejowa St., 01-217 Warsaw, KRS No. 0000347997. Contact with\n                  data protection officer iod@znanylekarz.pl. Personal data is processed on the basis of consent (art.6.1 point a GDPR)\n                  in order to send the newsletter. Consent is voluntary and can be withdrawn at any time. We inform that you have a right\n                  to access your personal data, correct and delete them. We inform you about the right to lodge a complaint to the supervisory\n                  authority. Personal data provided when subscribing to the newsletter may be disclosed to companies providing IT support\n                  services, including those that support sending the newsletter. The data will be processed until the consent is withdrawn.\n                ')])}],!1,null,null,null);t.default=i.exports},394:function(e,t,a){"use strict";a(368)},421:function(e,t,a){"use strict";a(4);var n=a(389),s=a(431),i=a(430);var r={name:"Home",components:{Vero:n.default,"dp-button":s.a,DpLogoPlain:i.a},data:function(){return{carousel:null}},mounted:function(){var e=this;Promise.all([a.e(0),a.e(1),a.e(2)]).then(a.bind(null,435)).then((function(t){e.carousel=t.default}))},computed:{data:function(){return this.$page.frontmatter},actionLink:function(){return{link:this.data.actionLink,text:this.data.actionText}}}},o=(a(394),a(69)),c=Object(o.a)(r,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("main",{staticClass:"home",attrs:{"aria-labelledby":null!==e.data.heroText?"main-title":null}},[a("header",{staticClass:"hero"},[a("div",[a("h1",{attrs:{id:"main-title"}},[e._v("\n        "+e._s(e.data.heroText)+"\n      ")]),e._v(" "),a("p",{staticClass:"description"},[e._v("\n        "+e._s(e.data.tagline)+"\n      ")])]),e._v(" "),a("div",[e.data.heroImage?a("img",{attrs:{src:e.$withBase(e.data.heroImage),alt:e.data.heroAlt||"hero"}}):e._e()])]),e._v(" "),e.data.features&&e.data.features.length?a("div",{staticClass:"features"},e._l(e.data.features,(function(t,n){return a("div",{key:n,staticClass:"feature"},[a("h2",[e._v(e._s(t.title))]),e._v(" "),a("p",[e._v(e._s(t.details))]),e._v(" "),t.link?a("dp-button",{staticClass:"action"},[a("a",{attrs:{href:t.link}},[e._v("Discover")])]):e._e()],1)})),0):e._e(),e._v(" "),e.carousel?a(e.carousel,{tag:"component"}):e._e(),e._v(" "),a("vero"),e._v(" "),e.data.footer?a("div",{staticClass:"footer"},[a("dp-logo-plain",{attrs:{color:"calm"}}),e._v("\n    "+e._s(e.data.footer)+"\n  ")],1):e._e()],1)}),[],!1,null,null,null);t.a=c.exports}}]);