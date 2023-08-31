import myRequest from '../request'

export function getSearchConditions(){
  return myRequest.get({
    url:'/search/top'
  })
}