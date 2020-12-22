<template>
  <main
    class="home"
    :aria-labelledby="data.heroText !== null ? 'main-title' : null"
  >
    <header class="hero">
      <div>
      <h1 id="main-title">
        {{ data.heroText }}
      </h1>

      <p class="description">
        {{ data.tagline }}
      </p>



      </div>

      <div>
        <img
            v-if="data.heroImage"
            :src="$withBase(data.heroImage)"
            :alt="data.heroAlt || 'hero'"
        >
      </div>
    </header>

    <div
      v-if="data.features && data.features.length"
      class="features"
    >
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
        <dp-button
            v-if="feature.link" class="action"
        >
          <a :href="feature.link">Discover</a>
        </dp-button>

      </div>
    </div>


    <carousel />

    <vero />

    <div
      v-if="data.footer"
      class="footer"
    >
      <dp-logo-plain color="calm"/>
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import Vero from '../global-components/Vero.vue';
import {DpButton} from "@dp-ui-kit/vue";
import {DpLogoPlain} from '@dp-ui-kit/logos'
import Carousel from '../global-components/Carousel.vue';

export default {
  name: 'Home',

  components: {
    Vero,
    "dp-button": DpButton,
    DpLogoPlain,
    Carousel,
  },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color #3D83DF
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    padding 1.2rem 0
    margin-top 2.5rem
    margin-bottom 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
    .feature
      h2
        font-size 1.25rem
.dp-carousel
  padding-top: 5rem;
  padding-bottom: 5rem;


.home .hero
  display: flex !important
  justify-content: center
  align-items: center
  background-color: #012C6D
  margin-left: calc(50% - 50vw);
  width: 100vw;
  text-align: left;
  padding-top: 1rem;
  padding-bottom: 1rem;

.home .hero img
  max-width 450rem!important

#main-title
  color: white;
  font-weight 500
  font-size: 1

.description
  color: white !important;
  font-weight: 300;

.features
  align-items: baseline
  text-align: center;

#app > div.theme-container.no-sidebar > main > section
  background-color: #EEF4FD
  margin-left: calc(50% - 50vw);
  width: 100vw;
  padding-top: 1rem;
  padding-bottom: 1rem;

</style>
