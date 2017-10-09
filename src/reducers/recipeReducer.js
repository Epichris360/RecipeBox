import constants from '../constants'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is a sample reducer or user management. If you remove 
	and use your own reducers, remember to update the store 
	file (../stores/index.js) with your reducers.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

var initialState = [
]

export default (state = initialState, action) => {
	let newState = state

	switch (action.type) {

        case constants.NEW_RECIPE:
            newState.push(action.data)
            return newState

		default:
			return state
	}
}