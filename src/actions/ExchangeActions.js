import {
  EXCHANGE_SEND,
  EXCHANGE_RECIEVE,
  CURRENCY_MODAL,
  PRICE_GRAPH
} from './types'

export const ExchangeSend = ( currency, qty ) => {
  return {
    type: EXCHANGE_SEND,
    payload: {
      currency: currency,
      qty: qty
    }
  }
}

export const ExchangeRecieve = ( currency, qty ) => {
  return {
    type: EXCHANGE_RECIEVE,
    payload: {
      currency: currency,
      qty: qty
    }
  }
}

export const CurrencyModal = (toggle, setting) => {
  return {
    type: CURRENCY_MODAL,
    payload: {
      toggle: toggle,
      setting: setting
    }
  }
}

export const PriceGraph = (data) => {
  return {
    type: PRICE_GRAPH,
    payload: {
      data: data
    }
  }
}
