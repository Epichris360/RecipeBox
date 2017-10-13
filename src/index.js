import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
//import Intro from './components/presentation/Intro'
import { RecipeNew, RecipeList, NavBar, RecipeShow,
		 SignIn, SignUp } from './components/containers'

import { Switch, BrowserRouter as Router, Route  } from 'react-router-dom'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is the entry point of the React app wit Redux
	already implemented. The Intro component is the 
	visual content and most likely, you will want 
	to remove it and replace with your own visual content.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

const app = (
	<Provider store={store.configure(null)}>
		<Router>
			<div >
				<div >
					<NavBar />
					<div className="container">
						<Switch>
							<Route exact path='/' component={RecipeList} />
							<Route path="/new" component={RecipeNew} />
							<Route path="/recipe/:id" component={RecipeShow}/>
							<Route path="/signin" component={SignIn} />
							<Route path="/signup" component={SignUp} />
						</Switch>
					</div>
				</div> 
			</div>
		</Router>
	</Provider>
)


ReactDOM.render(app, document.getElementById('root'))