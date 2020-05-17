import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types"

export default {
  //mutations作用就是修改state中状态
  //mutations中每个方法尽可能完成的事件比较单一一点
  [ADD_COUNTER](state,payload){
    payload.count += 1
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true;
    state.cartList.push(payload)
  }
}
