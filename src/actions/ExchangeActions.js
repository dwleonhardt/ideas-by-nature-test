import {
  EXCHANGE_SEND,
  EXCHANGE_RECIEVE,
  CURRENCY_MODAL
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
