import { getHotelsInfo } from '@/api';

export default {
    namespaced: true,

    state: {
        items: []
    },

    getters: {
        itemsForPreview: (state) => (page = 1) => {
            if (page <= 0) {
                page = 1;
            } else if (page > 3) {
                page = 3;
            }

            return state.items.slice(0, page * 10);
        },
        item: (state) => (id) => {
            return state.items.find(item => item.id === id);
        }
    },

    mutations: {
        SET_ITEMS(state, items) {
            state.items = items;
        }
    },

    actions: {
        async fetchItems({ commit }) {
            try {
                const hotels = await getHotelsInfo();
                commit('SET_ITEMS', hotels);
                localStorage.setItem('hotels', JSON.stringify(hotels));
            } catch (error) {
                // Предполагается обработка ошибки и ее вывод в общие уведомления
                console.error(error);
            }
        }
    }
}
