import {
  EXCHANGE_SEND,
  EXCHANGE_RECIEVE,
  CURRENCY_MODAL
} from './types'

export const ExchangeSend = send => {
  return {
    type: EXCHANGE_SEND,
    payload: send
  }
}

export const ExchangeRecieve = recieve => {
  return {
    type: EXCHANGE_RECIEVE,
    payload: recieve
  }
}

export const CurrencyModal = toggle => {
  return {
    type: CURRENCY_MODAL,
    payload: toggle
  }
}
