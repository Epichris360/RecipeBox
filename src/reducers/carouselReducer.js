import constants from '../constants'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is a sample reducer or user management. If you remove 
	and use your own reducers, remember to update the store 
	file (../stores/index.js) with your reducers.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

var initialState = []

export default (state = initialState, action) => {
	//console.log('state',state,'action',action) 
	let newState = state
	switch (action.type) {
		case constants.ALL_CAROUSEL:
			console.log('action.data',action.data)
			return action.data
			
		case constants.NEW_CAROUSEL_IMG:
            newState.push(action.data)
			return newState
		
		case constants.DELETE_CAROUSEL:
			newState = state.filter( c => c.id != action.data.id )
			return newState

		default:
			return state
	}
} 