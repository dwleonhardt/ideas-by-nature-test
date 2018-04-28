import {
  EXCHANGE_SEND,
  EXCHANGE_RECIEVE,
  CURRENCY_MODAL,
  PRICE_GRAPH
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
    qty: 'Recieve'
  },
  graph: {
    data: {}
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
    case PRICE_GRAPH:
      return { ...state, graph: action.payload }
    default:
      return state
  }
}
