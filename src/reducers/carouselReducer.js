import constants from '../constants'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is a sample reducer or user management. If you remove 
	and use your own reducers, remember to update the store 
	file (../stores/index.js) with your reducers.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

var initialState = []

export default (state = initialState, action) => {
	console.log('state',state,'action',action) 
	switch (action.type) {
		case constants.ALL_CAROUSEL:
			console.log('action.data',action.data)
			return action.data
			
		case constants.NEW_CAROUSEL_IMG:
			let newState = state
            newState.push(action.data)
            return newState

		default:
			return state
	}
} 