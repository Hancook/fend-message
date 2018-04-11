import types from './types'

let getters = {}
export default getters

getters[types.getters.answers] = state => {
  return state.answers
}





