import constants from '../constants'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is a sample reducer or user management. If you remove 
	and use your own reducers, remember to update the store 
	file (../stores/index.js) with your reducers.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

var initialState = []

export default (state = initialState, action) => {
	let newState = state

	switch (action.type) {
		case constants.ALL_RECIPES:
			return [...action.data]
			
        case constants.NEW_RECIPE:
            newState.push(action.data)
            return newState

		case constants.UPDATE_RECIPE:
			return state.map(
				r => recipe(r,action)
			)

		default:
			return state
	}
} 

const recipe = ( state = {}, action ) =>{

    switch (action.type) {

        case constants.UPDATE_RECIPE:
            return ( state.id == action.data.id ) ?
				action.data : state
				
        default:
            return state
    }
}