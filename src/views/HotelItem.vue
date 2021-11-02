<template>
    <section class="hotel">
        <BookingForm class="hotel__booking-form" />
    </section>
</template>

<script>
import BookingForm from '@/components/BookingForm';

export default {
    name: 'Hotel',
    components: {
        BookingForm
    },
    data() {
        return {
            info: {}
        }
    }
}
</script>

<style lang="scss" scoped>
.hotel__booking-form {
    max-width: 600px;
    margin: 0 auto;
}
</style>
