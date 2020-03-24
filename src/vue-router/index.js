import install from "./install"
import creatMatcher from "./create-matcher"
import HashHistory from "../history/hash"
class VueRouter {
  constructor(options) {
    // 创建匹配器,匹配器包含addRoutes和match两个方法，分别用来添加动态添加路由和根据location返回一个匹配的组件
    this.matcher = creatMatcher(options.routes || [])
    // 创建路由,并且将router传到路由里面
    this.history = new HashHistory(this)

    this.beforeEachs = []
  }

  init(app) {
    const history = this.history
    const setupHashListener = () => {
      history.setupListener()
    }
    history.transitionTo(history.getCurrentLocation(), setupHashListener)

    history.listen(route => {
      app._route = route
    })
  }

  push(location) {
    this.history.transitionTo(location, () => {
      window.location.hash = location
    })
  }

  match(location) {
    return this.matcher.match(location)
  }

  beforeEach(cb) {
    this.beforeEachs.push(cb)
  }
}

VueRouter.install = install

export default VueRouter
