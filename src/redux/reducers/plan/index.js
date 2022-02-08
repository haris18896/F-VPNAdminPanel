import {
  ADD_PLAN_INITIATED,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAILED,
} from "../../actions/actionType/plan/add"
import {
  FETCH_PLAN_INITIATED,
  FETCH_PLAN_SUCCESS,
} from "../../actions/actionType/plan/fetch"
import {
  UPDATE_PLAN_FAILED,
  UPDATE_PLAN_INITIATED,
  UPDATE_PLAN_SUCCESS,
} from "../../actions/actionType/plan/update"
import {
  FETCH_PLANS_INITIATED,
  FETCH_PLANS_SUCCESS,
} from "../../actions/actionType/plans/fetch"

// **  Initial State
const initialState = {}

const planReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLANS_INITIATED:
      return {
        plansFetchingInProcess: true,
      }

    case FETCH_PLANS_SUCCESS:
      return {
        plansFetchingInProcess: false,
        plans: action.payload.plans,
      }

    case ADD_PLAN_INITIATED:
      return {
        addPlanInProcess: true,
      }

    case ADD_PLAN_SUCCESS:
      return {
        addPlanInProcess: false,
        success: action.payload.success,
      }
    case ADD_PLAN_FAILED:
      return {
        addPlanInProcess: false,
        error: action.payload,
      }

    case FETCH_PLAN_INITIATED:
      return {
        fetchPlanInProcess: true,
      }

    case FETCH_PLAN_SUCCESS:
      return {
        fetchPlanInProcess: false,
        plan: action.payload.plan,
      }
    case UPDATE_PLAN_INITIATED:
      return {
        updatePlanInProcess: true,
      }
    case UPDATE_PLAN_SUCCESS:
      return {
        updatePlanInProcess: false,
        plan: action.payload.plan,
        success: action.payload.success,
      }
    case UPDATE_PLAN_FAILED:
      return {
        updatePlanInProcess: false,
        error: action.payload,
      }

    case "RESET_PLAN_STATE":
      return {}
    default:
      return state
  }
}

export default planReducer
