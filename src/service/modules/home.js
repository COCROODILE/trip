import myRequest from '../request'

export function getHomeHotSuggest(){
  return myRequest.get({
    url:'/home/hotSuggests'
  })
}

export function getHomeCategories(){
  return myRequest.get({
    url:'/home/categories'
  })
}

export function getHomeHouseList(page){
  return myRequest.get({
    url:'/home/houselist',
    params:{
      page
    }
  })
}