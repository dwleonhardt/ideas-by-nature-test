import {
  EXCHANGE_SEND,
  EXCHANGE_RECIEVE,
  CURRENCY_MODAL
} from '../actions/types'

const INITIAL_STATE = {
  modal: {
    toggle: false
  },
  send: {
    currency: 'BTC',
    qty: 0
  },
  recieve: {
    currency: 'ETH',
    qty: 0
  }
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case EXCHANGE_SEND:
      return { ...state, send: action.payload }
    case EXCHANGE_RECIEVE:
      return { ...state, recieve: action.payload }
    case CURRENCY_MODAL:
      return { ...state, modal: action.payload }
    default:
      return state
  }
}
