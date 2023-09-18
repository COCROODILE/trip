import myRequst from '../request'

export function getOrderList(type = 'all'){
  return myRequst.get({
    url: `/order/list?type=${type}`
  })
}