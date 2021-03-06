import constants from '../constants'
import { TurboClient } from '../utils'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	Here are a few sample actions for User managment.
	Feel free to remove and replace with your own actions
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

export default {

	fetchUsers: (params) => {
		return dispatch => {
			return dispatch(TurboClient.getRequest('user', params, constants.USERS_RECEIVED))
		}
	},

	addUser: (params) => {
		return dispatch => {
			return dispatch(TurboClient.postRequest('user', params, constants.USER_CREATED))
		}
	},

	// Unlike addUser, register() also maintains a session for login state. After calling 
	// TurboClient.createUser(), the new user is logged in as well:
	register: (params) => {
		return dispatch => {
			return dispatch(TurboClient.createUser(params, constants.USER_CREATED))
		}
	},

	loginUser: (credentials) => {
		return dispatch => {
			return dispatch(TurboClient.login(credentials, constants.CURRENT_USER_RECEIVED))
		}
	},

	currentUser: () => {
		return dispatch => {
			return dispatch(TurboClient.currentUser(constants.CURRENT_USER_RECEIVED))
		}
	},

	newRecipe:(params) => {
		return dispatch => {
			return dispatch(TurboClient.postRequest('recipe',params,constants.NEW_RECIPE))
		}
	},

	allRecipes:() => {
		return dispatch => {
			return dispatch(TurboClient.getRequest('recipe',null,constants.ALL_RECIPES))
		}
	},

	updateRecipe:(orig, params) => {
		return dispatch => {
			return dispatch(TurboClient.putRequest('recipe',orig,params,constants.UPDATE_RECIPE))
		}
	},
	
	newCarouselImg:(params) => {
		return dispatch => {
			return dispatch( TurboClient.postRequest('carousel',params, constants.NEW_CAROUSEL_IMG) )
		}
	},

	allCarousel:() => {
		return dispatch => {
			return dispatch( TurboClient.getRequest('carousel',null,constants.ALL_CAROUSEL) )
		}
	},

	deleteCarousel:(params) => {
		return dispatch => {
			return dispatch( TurboClient.deleteRequest('carousel', params, constants.DELETE_CAROUSEL) )
		}
	}
	
}
