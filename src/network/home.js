import {request} from "./request";

//轮播图以及推荐数据
export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  })
}

//流行、新款、精选的数据
export function getHomeGoods(type,page) {
  return request({
    url: "/home/data",
    params: {
      type,
      page
    }
  })
}
