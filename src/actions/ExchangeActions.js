import {
  EXCHANGE_SEND,
  EXCHANGE_RECIEVE
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
