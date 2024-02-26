import request from '../request'

export function getDetailInfo(houseId) {
  return request.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}
