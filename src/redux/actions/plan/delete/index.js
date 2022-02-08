/* eslint-disable */

// Not using this thing any more

// import useJwt from '@src/auth/jwt/useJwt'
// import { handleFetchPlans } from '../../plans/fetch'

// export const deletePlanSuccess = data => {
//   return async dispatch => {
//     dispatch(handleFetchPlans())
//   }
// }

// export const handleDeletePlan = id => {
//   return async dispatch => {
//     try {
//       const response = await useJwt.deletePlan(id)
//       if (response && response.data) {
//         dispatch(deletePlanSuccess())
//       }
//     } catch (err) {
//       if (err.response && err.response.data) {
//         alert(err.response.data.msg)
//       }
//     }
//   }
// }
