import Vue from "vue"
// import VueRouter from 'vue-router'
import VueRouter from "../vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About,
    children: [
      {
        path: "a",
        component: {
          render(h) {
            return <h1>this is an about/a</h1>
          }
        }
      },
      {
        path: "b",
        component: {
          render(h) {
            return <h1>this is an about/b</h1>
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((from, to, next) => {
//   setTimeout(() => {
//     console.log(1000)
//     next()
//   }, 1000)
// })
// router.beforeEach((from, to, next) => {
//   setTimeout(() => {
//     console.log(2000)
//     next()
//   }, 1000)
// })
export default router
