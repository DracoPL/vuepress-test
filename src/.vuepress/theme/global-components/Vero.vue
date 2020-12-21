<template>
  <section class="py-5 vero">
    <div class="container">
      <h2>Contact us </h2>
      <p>Let your clients get the most of the automated experience and integrate your system with Docplanner. Learn more about benefits of having an integration in the below sections.</p>

      <div id="mc_embed_signup">
        <form
          id="mc-embedded-subscribe-form"
          action="https://app.getvero.com/forms/25fdde19801bc3f791969f40da9c3796"
          class="validate"
          method="post"
          name="mc-embedded-subscribe-form"
        >
          <div id="mc_embed_signup_scroll">
            <div
              id="mergeRow-gdpr"
              class="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group"
              :class="{ visible: nextStep }"
            >
              <div class="content__gdpr">
                <fieldset
                  class="mc_fieldset gdprRequired mc-field-group"
                  name="interestgroup_field"
                >
                  <label
                    class="checkbox subfield"
                    for="gdpr_52003"
                  ><input
                    id="gdpr_52003"
                    v-model="checkbox"
                    class="av-checkbox gdpr"
                    name="gdpr[52003]"
                    type="checkbox"
                    value="Y"
                  ><span>I would like ZnanyLekarz sp. z o.o. with registered office in Warsaw to send me a technological information newsletter.
                    I know that consent is voluntary and can be withdrawn at any time. I confirm that I have read the privacy policy.<br><br>
                    <strong>Privacy policy for the docplanner tech newsletter</strong><br>
                    The data controller of personal data processed in connection with the newsletter "docplannertech" is ZnanyLekarz
                    sp. z o.o. with registered office in Warsaw at 5/7 Kolejowa St., 01-217 Warsaw, KRS No. 0000347997. Contact with
                    data protection officer iod@znanylekarz.pl. Personal data is processed on the basis of consent (art.6.1 point a GDPR)
                    in order to send the newsletter. Consent is voluntary and can be withdrawn at any time. We inform that you have a right
                    to access your personal data, correct and delete them. We inform you about the right to lodge a complaint to the supervisory
                    authority. Personal data provided when subscribing to the newsletter may be disclosed to companies providing IT support
                    services, including those that support sending the newsletter. The data will be processed until the consent is withdrawn.
                  </span> </label>
                </fieldset>
              </div>
            </div>
            <div class="mc-field-group">
              <input
                id="mce-EMAIL"
                class="required email"
                :class="{ short: nextStep }"
                name="email"
                placeholder="Your email"
                type="email"
                value=""
                @keydown.enter.prevent
              >
              <input
                name="redirect_on_success"
                type="hidden"
                value="https://docplanner.tech/newsletter/thankyou"
              >
              <input
                name="redirect_on_fail"
                type="hidden"
                value="https://docplanner.tech/newsletter/error"
              >
              <button
                class="next"
                :class="{ hide: nextStep }"
                type="button"
                @click="nextClick"
              />
              <input
                id="mc-embedded-subscribe"
                class="btn btn-pink"
                :class="{ show: nextStep, active: checkbox }"
                name="subscribe"
                type="submit"
                value="I AGREE      "
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Vero',

  data: () => ({
    nextStep: false,
    checkbox: false,
  }),

  methods: {
    nextClick() {
      this.nextStep = true;
    },
  },
};
</script>

<style lang="scss">
    .vero {
        background-color: #fff;
        height:100%;
        .container{
            max-width: 900px;
            margin:0 auto;

            .indicates-required {
                display:none;
            }

            #mc_embed_signup_scroll {

                #mergeRow-gdpr{
                    opacity:0;
                    height:0;
                    transition:all .2s ease;
                    &.visible{
                        opacity:1;
                        height:auto;
                    }
                    .checkbox.subfield {
                        display:flex;

                        input {
                            margin-right:10px;
                            margin-top:5px;
                            height:13px;
                        }
                    }
                }

                .mc-field-group:nth-child(2) {
                    position:relative;
                    max-width: 510px;
                    margin: 0 auto;
                    margin-top:20px;
                    margin-bottom:20px;

                    @media (max-width:480px) {
                            margin: 20px -1rem 0 -1rem;
                        }

                    >.required.email {
                        width:100vw;
                        max-width: 510px;
                        height: 50px;
                        background-color:#F7F9FA;
                        font-size: 16px;
                        line-height: 24px;
                        letter-spacing: 0.133333px;
                        color: #87949B;
                        border: none;
                        box-shadow:none;
                        padding-left:20px;

                        @media (max-width:480px) {
                            max-width: 100%;
                        }

                        &.short {

                            @media (min-width:481px) {
                                max-width:370px;
                            }
                        }
                    }
                    .next {
                        background-color: transparent;
                        background-image: url('/arrow.svg');
                        background-repeat: no-repeat;
                        background-position:center;
                        background-size:50%;
                        width:50px;
                        height:50px;
                        border:none;
                        position:absolute;
                        top:0px;
                        right:0px;
                        transition: all .2s ease;
                        opacity:1;

                        &.hide {
                            width:0;
                            opacity:0;
                        }
                    }
                    #mc-embedded-subscribe {
                        position:absolute;
                        margin-left:10px;
                        height:50px;
                        opacity:0;
                        width:0;
                        transition: all .2s ease;
                        background-image: url('/img/arrow.svg');
                        background-repeat: no-repeat;
                        background-position: right 10px center;
                        background-size:25%;
                        padding-right:5px;
                        pointer-events: none;
                        -webkit-tap-highlight-color: rgba(0,0,0,0);
                        --blue: #007bff;
                        --white: #fff;
                        --gray: #6c757d;
                        --gray-dark: #343a40;
                        --indigo: #6610f2;
                        --purple: #6f42c1;
                        --red: #dc3545;
                        --orange: #fd7e14;
                        --yellow: #ffc107;
                        --green: #28a745;
                        --teal: #20c997;
                        --cyan: #17a2b8;
                        --primary: #007bff;
                        --secondary: #6c757d;
                        --pink: #fcceca;
                        --dark: #012c6d;
                        --success: #28a745;
                        --info: #17a2b8;
                        --warning: #ffc107;
                        --danger: #dc3545;
                        --light: #f8f9fa;
                        --breakpoint-xs: 0;
                        --breakpoint-sm: 576px;
                        --breakpoint-md: 768px;
                        --breakpoint-lg: 992px;
                        --breakpoint-xl: 1200px;
                        --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
                        --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
                        box-sizing: border-box;
                        font-family: inherit;
                        overflow: visible;
                        display: inline-block;
                        text-align: center;
                        vertical-align: middle;
                        user-select: none;
                        font-size: 1rem;
                        line-height: 1.5;
                        background-color: #fcceca;
                        border-color: #fcceca;
                        border-radius: 0;
                        color: #012c6d;
                        font-weight: 700;
                        cursor: pointer;
                        top: 0;

                        @media(max-width:480px) {
                            right: 0;
                        }

                        &.active {
                        pointer-events: all;

                        }

                        &.show {
                            opacity:1;
                            width:125px;
                            top: 0;
                        }
                    }
                }
            }
            >p{
                font-family: "Roboto", Helvetica, Arial, sans-serif;
                font-size: 16px;
                line-height: 24px;
                font-weight: 600;
                letter-spacing: 0.166667px;
                color: #333333;
                margin-top:40px;
                text-align:center;
                max-width:600px;
                margin: 40px auto;
            }
            h2 {
                font-style: normal;
                font-size: 42px;
                line-height: 49px;
                text-align: center;
                letter-spacing: 0.291667px;
                color: #333333;
            }
        }
    }
    // error
    #mc_embed_signup div.mce_inline_error {
        background-color: transparent!important;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: 0.166667px;
        color: #D67C7C!important;
        padding-left:20px!important;
    }
    #mce-success-response {
        background-color: transparent;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: 0.166667px;
        color: #002d6f;
        text-align:center;
        margin:20px auto;
        background-image: url(/check.svg);
        height: 130px;
        background-repeat: no-repeat;
        background-position: center;
    }

</style>
