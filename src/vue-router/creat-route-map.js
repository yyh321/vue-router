let createRouteMap = (routes, oldPathList, oldPathMap) => {
  let pathList = oldPathList || []
  let pathMap = oldPathMap || Object.create(null)

  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap)
  })

  return {
    pathList,
    pathMap
  }
}

function addRouteRecord(route, pathList, pathMap, parent) {
  let path = parent ? parent.path + "/" + route.path : route.path
  let record = {
    path,
    component: route.component,
    parent
  }
  if (!pathMap[path]) {
    pathList.push(path)
    pathMap[path] = record
  }

  if (route.children) {
    route.children.forEach(route => {
      addRouteRecord(route, pathList, pathMap, record)
    })
  }
}

export default createRouteMap
