import hyRequest from '../request'

export function getDetailInfo(houseId) {
  return hyRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}
