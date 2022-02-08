import { FETCH_STATS_INITIATED, FETCH_STATS_SUCCESS, FETCH_STATS_FAILED, REST_STATS } from '../../actions/actionType/Stats/index'

const initialState = {}

export const getStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS_INITIATED: {
      return {
        ...state,
        fetchStatsInProcess: true,
      }
    }

    case FETCH_STATS_SUCCESS: {
      return {
        ...state,
        fetchStatsInProcess: false,
        statsData: action.payload,
      }
    }

    case FETCH_STATS_FAILED: {
      return {
        ...state,
        fetchStatsInProcess: false,
        error: action.payload,
      }
    }

    case REST_STATS: {
      return {}
    }

    default:
      return state
  }
}
