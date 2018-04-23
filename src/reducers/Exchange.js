import {
  EXCHANGE_SEND
} from '../actions/types'

const INITIAL_STATE = {
  input: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case EXCHANGE_SEND:
      return { ...state, send: action.payload }
    default:
      return state
  }
}
