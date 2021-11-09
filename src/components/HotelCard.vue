<template>
    <article class="hotel-card">
        <!--
            В идеале Picture нужно вынести в отдельный компонент,
            но в данном случае оставил внутри данного, чтобы
            сэкономить время.

            Также стоит добавить более наглядный lazyloading
            изображений, т.е. добавить некий плэйсхолдер, пока
            изображение загружается
        -->
        <picture class="hotel-card__picture">
            <source
                srcset="@/assets/images/hotel.webp, @/assets/images/hotel@2x.webp 2x"
                type="image/webp"
            />
            <img
                class="hotel-card__image"
                src="@/assets/images/hotel.jpg"
                srcset="@/assets/images/hotel@2x.jpg 2x"
                alt="Небольшой отель с бассейном"
                width="300"
                height="180"
                loading="lazy"
            />
        </picture>
        <h3 class="hotel-card__title">
            {{ hotel.title }}
        </h3>
        <p class="hotel-card__description">
            {{ hotel.body }}
        </p>
    </article>
</template>

<script>
export default {
    name: 'HotelCard',
    props: {
        hotel: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
    .hotel-card {
        display: block;

        &__image {
            display: block;
            width: 300px;
            height: 180px;
            object-fit: cover;
            margin-bottom: 10px;
            border-radius: 6px;
        }

        &__title {
            font-size: 20px;
            line-height: 1.35;
            margin: 0;
            margin-bottom: 10px;
        }

        &__description {
            font-size: 12px;
            line-height: 1.55;
            margin: 0;
        }
    }
</style>
