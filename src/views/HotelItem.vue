<template>
    <section class="hotel">
        <div class="container hotel__wrapper">
            <router-link class="link link--accent hotel__back" :to="{ name: 'home' }">
                На главную
            </router-link>
            <picture class="hotel__picture">
                <source
                    srcset="@/assets/images/hotel-big.webp, @/assets/images/hotel-big@2x.webp 2x"
                    type="image/webp"
                />
                <img
                    class="hotel__image"
                    src="@/assets/images/hotel-big.jpg"
                    srcset="@/assets/images/hotel-big@2x.jpg 2x"
                    alt="Небольшой отель с бассейном"
                    width="600"
                    height="320"
                />
            </picture>
            <div class="hotel__content">
                <h1 class="title hotel__title">{{ info.title }}</h1>
                <p class="hotel__description">
                    {{ info.body }}
                </p>
            </div>

            <transition name="fade">
                <BookingForm
                    v-if="showForm"
                    class="hotel__booking-form"
                    @submit="onFormSubmit"
                    key="form"
                />
                <div
                    v-else
                    class="hotel__booking-success"
                    key="success"
                >
                    <p>
                        Спасибо! Ваша бронь подтверждена.
                    </p>
                    <dl class="hotel__booking-list">
                        <dt class="hotel__booking-term">Адрес</dt>
                        <dd class="hotel__booking-desc">
                            {{ bookingData.address }}
                        </dd>
                        <dt class="hotel__booking-term">Имя</dt>
                        <dd class="hotel__booking-desc">
                            {{ bookingData.name }}
                        </dd>
                        <dt class="hotel__booking-term">Номер телефона</dt>
                        <dd class="hotel__booking-desc">
                            {{ bookingData.phone }}
                        </dd>
                    </dl>
                </div>
            </transition>
        </div>
    </section>
</template>

<script>
import { getHotelInfo } from '@/api';

import BookingForm from '@/components/BookingForm';

export default {
    name: 'Hotel',
    components: {
        BookingForm
    },
    data() {
        return {
            showForm: true,
            info: {},
            bookingData: {}
        }
    },
    async created() {
        const id = this.$route.params.id;
        const info = this.$store.getters['hotels/item'](id);

        // По заданию не совсем ясно как треюбуется получать данные,
        // поэтому решил использовать вариант проверки наличия данных
        // в хранилище и, если они отсутствуют, то сделать отдельный запрос
        // на получение данных отеля, чтобы не стягивать все 100 записей
        this.info = info
            ? Object.assign({}, info)
            : await getHotelInfo(id);
    },
    methods: {
        onFormSubmit(evt) {
            this.showForm = false;
            this.bookingData = evt;
        }
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.hotel {
    &__back {
        font-size: 18px;
        margin-bottom: 20px;
    }

    &__image {
        width: 100%;
        max-width: 600px;
        height: 200px;
        border-radius: 16px;
        margin-bottom: 20px;
    }

    &__title {
        margin: 0;
        margin-bottom: 12px;
    }

    &__description {
        font-size: 18px;
        line-height: 1.5;
        margin: 0;
        margin-bottom: 60px;
    }

    &__booking-success {
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        color: $color-success;
        margin: 0;
    }

    &__booking-list {
        display: grid;
        color: $color-basic-text;
        grid-template-columns: 1fr 1fr;
    }

    &__booking-term {
        font-weight: 600;
        text-align: left;
    }

    &__booking-desc {
        text-align: right;
    }
}

@media all and (min-width: 1024px) {
    .hotel {
        &__wrapper {
            display: grid;
            grid-template-columns: 600px 1fr;
            column-gap: 40px;
            row-gap: 60px;
        }

        &__back {
            grid-column: 1 / 3;
            grid-row: 1 / 1;
        }

        &__picture {
            grid-column: 1 / 2;
            grid-row: 2 / 4;
        }

        &__image {
            height: 320px;
            margin: 0;
        }

        &__booking-form,
        &__booking-success {
            grid-column: 1 / 3;
            max-width: 600px;
            margin: 0 auto;
        }
    }
}
</style>
