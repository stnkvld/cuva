<template>
  <section class="home">
    <div class="container">
      <HotelCard :info="{ title: 'Test Title', body: 'Test Description' }" />
    </div>
  </section>
</template>

<script>
import HotelCard from '@/components/HotelCard.vue'

export default {
  name: 'Home',
  components: {
    HotelCard
  },
  data() {
    return {

    }
  }
}
</script>
