import { getHotels } from '@/api';
import { getHotel } from '@/api';

export default {
    namespaced: true,

    state: {
        hotels: []
    },

    getters: {
        hotelsList: (state) => (page = 1, maxPage = 3) => {
            if (page <= 0) {
                page = 1;
            } else if (page > maxPage) {
                page = maxPage;
            }

            return state.hotels.slice(0, page * 10);
        },
        hotel: (state) => (id) => {
            return state.hotels.find(item => item.id === id);
        }
    },

    mutations: {
        SET_HOTELS(state, hotels) {
            state.hotels = hotels;
        }
    },

    actions: {
        async fetchHotels({ commit }) {
            try {
                const hotels = await getHotels();
                commit('SET_HOTELS', hotels);
                localStorage.setItem('hotels', JSON.stringify(hotels));
            } catch (error) {
                // Предполагается обработка ошибки и ее вывод в общие уведомления
                console.error(error);
            }
        },
        async fetchHotel(context, id) {
            try {
                const hotel = await getHotel(id);
                return hotel;
            } catch (error) {
                // Предполагается обработка ошибки и ее вывод в общие уведомления
                console.error(error);
            }
        }
    }
}
