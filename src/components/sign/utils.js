export const getSiteId = function (route) {
  const query = route.query
  const params = route.params
  return query['id'] || query['siteId'] || params['id'] || params['siteId']
}
