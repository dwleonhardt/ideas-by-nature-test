import {
  EXCHANGE_SEND,
  EXCHANGE_RECIEVE,
  CURRENCY_MODAL
} from '../actions/types'

const INITIAL_STATE = {
  currencyModal: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case EXCHANGE_SEND:
      return { ...state, send: action.payload }
    case EXCHANGE_RECIEVE:
      return { ...state, recieve: action.payload }
    case CURRENCY_MODAL:
      return { ...state, recieve: action.payload }
    default:
      return state
  }
}
