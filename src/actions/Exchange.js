import {
  EXCHANGE_SEND
} from './types'

export const SendExchange = send => {
  return {
    type: EXCHANGE_SEND,
    payload: send
  }
}
