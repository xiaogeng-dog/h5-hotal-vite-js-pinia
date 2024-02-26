import request from '../request'

export function getHomeHotSuggests() {
  return request.get({
    url: '/home/hotSuggests'
  })
}

export function getHomeCategories() {
  return request.get({
    url: '/home/categories'
  })
}

export function getHomeHouseList(page) {
  return request.get({
    url: '/home/houselist',
    params: {
      page
    }
  })
}
