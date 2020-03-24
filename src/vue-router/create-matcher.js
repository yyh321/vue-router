import createRouteMap from "./creat-route-map"
import { createRoute } from "../history/base"
export default function creatMatcher(routes) {
  let { pathList, pathMap } = createRouteMap(routes) // 创建路由映射

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  function match(location) {
    let record = pathMap[location]
    return createRoute(record, { path: location })
  }

  return {
    addRoutes,
    match
  }
}
