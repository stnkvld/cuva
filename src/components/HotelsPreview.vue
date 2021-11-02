<template>
    <div
        class="hotels-preview"
    >
        <transition-group
            class="hotels-preview__list"
            name="list"
            tag="ul"
        >
            <li
                v-for="(hotelItem, hotelIdx) in hotels"
                :key="`h-${hotelIdx}`"
                class="hotels-preview__item"
            >
                <HotelCard
                    class="hotels-preview__card"
                    :info="hotelItem"
                />
            </li>
        </transition-group>
        <button
            v-show="hotels.length > 0 && page < 3"
            class="button button--accent"
            type="button"
            @click="page++"
        >
            Показать еще
        </button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

import HotelCard from '@/components/HotelCard.vue'

export default {
    name: 'Home',
    components: {
        HotelCard
    },
    data() {
        return {
            page: 1
        }
    },
    computed: {
        hotels() {
            return this.$store.getters['hotels/itemsForPreview'](this.page);
        }
    },
    methods: {
        ...mapMutations({
            setHotels: 'hotels/SET_ITEMS'
        })
    },
    created() {
        const lsHotels = localStorage.getItem('hotels');

        if (lsHotels) {
            this.setHotels(JSON.parse(lsHotels));
        } else {
            this.$store.dispatch('hotels/fetchItems')
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

.hotels-preview {
    text-align: center;

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
    .hotels-preview {
        &__list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 20px;
            row-gap: 20px;
        }
    }
}

@media all and (min-width: 1024px) {
    .hotels-preview {
        &__list {
            grid-template-columns: repeat(3, 1fr);
        }
    }
}
</style>
