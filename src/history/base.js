class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, { path: "/" }) // 默认路由

    this.cbs
  }

  transitionTo(location, callback) {
    // console.log(333, location)
    let route = this.router.match(location)

    if (
      location == this.current.path &&
      route.matched.length == this.current.matched.length
    ) {
      return
    }

    callback && callback()
    // 调用钩子方法
    let queue = this.router.beforeEachs
    const iterator = (hook, next) => {
      hook(this.current, route, next)
    }
    runQueue(queue, iterator, () => {
      this.updateRoute(route)
    })
  }

  updateRoute(route) {
    this.current = route
    this.cb && this.cb(route)
  }

  setupListener() {
    window.addEventListener("hashchange", () => {
      this.transitionTo(window.location.hash.slice(1))
    })
  }

  listen(cb) {
    this.cb = cb
  }
}

function runQueue(queue, iterator, cb) {
  function step(index) {
    if (index == queue.length) return cb()
    let hook = queue[index]
    iterator(hook, () => step(index + 1))
  }
  step(0)
}

export function createRoute(record, location) {
  let res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return {
    ...location,
    matched: res
  }
}

export default History
