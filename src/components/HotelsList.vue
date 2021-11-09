<template>
    <div
        class="hotels-list"
    >
        <transition-group
            class="hotels-list__list"
            name="list"
            tag="ul"
        >
            <li
                v-for="(hotelItem, hotelIdx) in hotels"
                :key="`h-${hotelIdx}`"
                class="hotels-list__item"
            >
                <router-link
                    class="hotels-list__link"
                    :to="{ name: 'hotels.item', params: { id: hotelItem.id } }"
                >
                    <HotelCard
                        class="hotels-list__card"
                        :hotel="hotelItem"
                    />
                </router-link>
            </li>
        </transition-group>
        <button
            v-show="hotels.length > 0 && page < 3"
            class="button button--accent"
            type="button"
            @click="showMore"
        >
            Показать еще
        </button>
    </div>
</template>

<script>
import HotelCard from '@/components/HotelCard.vue'

export default {
    name: 'Home',
    components: {
        HotelCard
    },
    props: {
        hotels: {
            type: Array,
            required: true
        },
        page: {
            type: Number,
            default: 3
        }
    },
    methods: {
        showMore() {
            this.page++;
            this.$emit('update:page', this.page);
        }
    }
};
</script>

<style lang="scss" scoped>
.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.hotels-list {
    text-align: center;

    &__link {
        color: inherit;
        text-decoration: none;
    }

    &__list {
        text-align: left;
        list-style: none;
        margin: 0;
        padding: 0;
        margin-bottom: 40px;
    }

    &__item:not(:last-child) {
        margin-bottom: 20px;
    }
}

@media all and (min-width: 768px) {
    .hotels-list {
        &__list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 20px;
            row-gap: 20px;
        }
    }
}

@media all and (min-width: 1024px) {
    .hotels-list {
        &__list {
            grid-template-columns: repeat(3, 1fr);
        }
    }
}
</style>
