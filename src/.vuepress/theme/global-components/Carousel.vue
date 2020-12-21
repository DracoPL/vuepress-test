<template>
  <div class="partners">
    <h2>{{ dataf.partnersTitle }}</h2>
    <h4>{{ dataf.partnersTagline }}</h4>
    <dp-carousel
        :loop="true"
        :responsive="responsiveOptions"
    >
      <dp-carousel-item
          v-for="(partners, index) in dataf.partners"
          :key="index"
          class="partners"
      >
        <div class="carousel-item-mock d-flex justify-content-center align-items-center m-0">
          <div>
            <img
                class="fit-picture"
                :src="partners.image"
            >
          </div>
        </div>
      </dp-carousel-item>
    </dp-carousel>
  </div>
</template>

<script>
import DpCarousel from '@dp-ui-kit/vue/components/carousel/DpCarousel.vue';
import DpCarouselItem from '@dp-ui-kit/vue/components/carousel/DpCarouselItem.vue';
import '@dp-ui-kit/scss/src/bootstrap/variables.scss';

export default {
  components: {
    DpCarouselItem,
    DpCarousel
  },

  computed: {
    dataf () {
      return this.$page.frontmatter
    },
  },

  data() {
    return {
      responsiveOptions: {
        350: {
          items: 1,
        },
        720: {
          items: 3,
        },
        980: {
          items: 5,
        },
      },
    };
  },
}
</script>

<style lang="scss">

div.carousel-item-mock {
  align-items: baseline;
  text-align: center !important;
  flex-direction: column;
  align-content: center;
  display: flex;

}

div.carousel-item-mock img{
  max-width: 150px;
  max-height: 50px;
  margin-top: auto;
}
.dp-carouse{
  padding-top: 2.5rem !important;
}
.tns-nav{
  justify-content: center !important;
}
.tns-inner{
  padding-left: 1.5rem;
}
div.partners{
  align-content: center !important;
  text-align: center !important;
}
div.partners h2{
  border: 0;
  color: #012C6D;
}
div.partners h4{
  color: #495057;
}

</style>
