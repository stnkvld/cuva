<template>
  <section class="home">
    <div class="container">
      <h1 class="title">Бронирование отелей</h1>
      <HotelsPreview />
    </div>
  </section>
</template>

<script>
import HotelsPreview from '@/components/HotelsPreview.vue'

export default {
  name: 'Home',
  components: {
    HotelsPreview
  },
  data() {
    return {

    }
  }
}
</script>
