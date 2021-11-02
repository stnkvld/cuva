import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/hotels',
    name: 'hotels',
    component: () => import('@/views/Hotels.vue'),
    children: [
      {
        path: ':id',
        name: 'hotels.item',
        component: () => import('@/views/HotelItem.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
