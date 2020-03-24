class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, { path: "/" }) // 默认路由

    this.cbs
  }

  transitionTo(location, callback) {
    console.log(333, location)
    let route = this.router.match(location)

    if (
      location == this.current.path &&
      route.matched.length == this.current.matched.length
    ) {
      return
    }

    this.current = route
    this.cb && this.cb(route)
    callback && callback()
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
