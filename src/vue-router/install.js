import RouterView from "./components/router-view"
import RouterLink from "./components/router-link"
let install = Vue => {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, "_route", this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._routerRoot._route
    }
  })

  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._routerRoot._router
    }
  })

  Vue.component("RouterView", RouterView)
  Vue.component("RouterLink", RouterLink)
}

export default install
