import {
  SOMETHING_AMAZING
} from '../actions/types'

const INITIAL_STATE = {
  input: ''
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SOMETHING_AMAZING:
      return { ...state, input: action.payload }
    default:
      return state
  }
}
