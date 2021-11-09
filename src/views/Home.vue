<template>
  <section class="home">
    <div class="container">
      <h1 class="title">Бронирование отелей</h1>
      <HotelsList
        v-if="hotels"
        :hotels="hotels"
        :page.sync="page"
      />
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
import HotelsList from '@/components/HotelsList.vue'

export default {
  name: 'Home',
  components: {
    HotelsList
  },
  data () {
    return {
      page: 1
    }
  },
  computed: {
    hotels() {
        return this.$store.getters['hotels/hotelsList'](this.page);
    }
  },
  created() {
    const lsHotels = localStorage.getItem('hotels');

    if (lsHotels) {
        this.setHotels(JSON.parse(lsHotels));
    } else {
        this.$store.dispatch('hotels/fetchHotels')
    }
  },
  methods: {
    ...mapMutations({
      setHotels: 'hotels/SET_HOTELS'
    })
  }
}
</script>
