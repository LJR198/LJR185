import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
Vue.use(VueRouter)

const routes = [
    {path: '/',redirect: '/login'}, 
    {
      path: '/login',
      component: Login,
    },
    {path:"/home",component:Home},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 访问的白名单, 可以直接通行
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  // 访问的路径在白名单
  if(to.path === '/login') return next()
  let session=window.sessionStorage.getItem('name')
  if(!session) return next('/login')
  next()
  
})
export default router
