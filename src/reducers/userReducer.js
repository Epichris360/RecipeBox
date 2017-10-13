import constants from '../constants'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is a sample reducer or user management. If you remove 
	and use your own reducers, remember to update the store 
	file (../stores/index.js) with your reducers.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
const initialState = {
	role:'normal',
	id:''
}
export default (state = initialState, action) => {

	switch (action.type) {

		case constants.CURRENT_USER_RECEIVED:
			return action.data

		case constants.USER_CREATED:
			return action.data
		case constants.LOGOUT_USER:
			console.log('user logged out?',action.data)
			return {}

		default:
			return state
	}
}