import React from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import { Users } from '../containers'

/* The Users component is a sample container with corresponding reducer
 * and action creators for demonstration. Feel free to remove for your own project */


export default (props) => {

	const menu = [
		{name:'intro', link:'#intro'},
		{name:'creating projects', link:'#create'},
		{name:'adding components', link:'#components'},
		{name:'theme support', link:'#themes'},
		{name:'turbo backend', link:'#turbo'}
	]

	return (
		<div className="stretched side-header">
			<Nav />

			<div>
				<Sidebar items={menu} />

				<section id="intro" style={{marginTop:64}}>
					<div className="container" style={style.container}>
						<h1>Welcome to Turbo</h1>
						<hr />
						<p style={{fontSize:16}}>
							Turbo is a command-line utility for quickly scaffolding React/Redux projects with or without Node/Express server included.
						</p>
					</div>
				</section>

				<section id="create">
					<div className="container" style={style.container}>
						<h3 style={style.subheader}>Creating Projects</h3>
						<p style={style.paragraph}>
							Projects can be created with or without a Node/Express server. To 
							create a project only with React and Redux:
						</p>

						<pre>
							<code>
								$ turbo new MY_FIRST_PROJECT<br />
								$ cd MY_FIRST_PROJECT<br />
								$ npm install
							</code>
						</pre>

						<p style={style.paragraph}>
							To create a project with React and Redux AND Node/Express server:
						</p>
						<pre>
							<code>
								$ turbo new MY_FIRST_PROJECT --express<br />
								$ cd MY_FIRST_PROJECT<br />
								$ npm install
							</code>
						</pre>

						<p style={style.paragraph}>
							To add Node/Express to an existing project (from root directory):
						</p>
						<pre>
							<code>
								$ turbo server express
							</code>
						</pre>
					</div>
				</section>

				<section id="components">
					<div className="container" style={style.container}>
						<h3 style={style.subheader}>Adding Components</h3>
						<p style={style.paragraph}>
							To create a standard React component:
						</p>
						<pre>
							<code>
								$ turbo component COMPONENT_NAME
							</code>
						</pre>

						<p style={style.paragraph}>
							To create a standard Redux Reducer:
						</p>
						<pre>
							<code>
								$ turbo reducer REDUCER_NAME
							</code>
						</pre>

					</div>
				</section>

				<section id="themes">
					<div className="container" style={style.container}>
						<h3 style={style.subheader}>Theme Support</h3>
						<p style={style.paragraph}>
							Turbo supports a few html themes out of the box. To switch themes, from the root directory of a project:
						</p>
						<pre style={{marginBottom:4}}>
							<code>
								$ turbo theme editorial
							</code>
						</pre>
						<p style={style.paragraph}>
							where 'editorial' is the theme name. Currently, Turbo supports the following 
							themes: <a target="_blank" href="https://html5up.net/editorial">editorial</a>, <a target="_blank" href="https://html5up.net/prologue">prologue</a>, <a target="_blank" href="https://html5up.net/hyperspace">hyperspace</a>, stack. These themes are free and can 
							be found on <a target="_blank" href="https://html5up.net/">HTML5UP</a>.						
						</p>

					</div>
				</section>

				<section id="turbo" style={{marginTop:64}} className="bottommargin-lg">
					<div className="container" style={style.container}>
						<h1>Turbo Backend</h1>
						<hr />
						<p style={style.paragraph}>
							Turbo supports data persistence out of the box. If you do not want to write a full-scale 
							backend with database but want to store data, <a target="_blank" style={{color:'red'}} href="https://www.turbo360.co/">Turbo</a> is 
							a good solution. To add a backend, register a project on <a target="_blank" style={{color:'red'}} href="https://www.turbo360.co/">Turbo</a> then from the root directory:
						</p>
						<pre style={{marginBottom:24}}>
							<code>
								$ turbo app MY_TURBO_APP_ID
							</code>
						</pre>
						<p style={style.paragraph}>
							The section below is an illustration of data persistence using the Turbo backend. After 
							connecting your project, enter a username with password then press submit. Turbo also support 
							User authentication out of the box. After creating a user, enter the username and password in 
							the login area to authenticate. This login state will persist across sessions.
						</p>

						<Users />

						<br /><br />
						<p style={style.paragraph}>
							The code for the demonstration above can be found in the User.js component:
						</p>
						<pre>
							src /<br />
							-- components /<br />
							-- containers /<br />
							<span style={{marginLeft:24}}>Users.js</span>
						</pre>

					</div>
				</section>

				<section id="dashboard" style={{marginTop:64}} className="bottommargin-lg">
					<div className="container" style={style.container}>
						<h1>Turbo Dashboard</h1>
						<hr />
						<p style={style.paragraph}>
							All entities for your project can be managed on the <a target="_blank" style={{color:''}} href="https://www.turbo360.co/">Turbo Dashboard</a>. 
							To see your current entities, select your project from the dashboard then select 
							the 'ENTITIES' option from the sidebar.
						</p>
					</div>
				</section>

			</div>
		</div>
	)
}

const style = {
	container: {
		padding: '0px 64px 32px 260px'
	},
	subheader: {
		marginBottom: 12
	},
	paragraph: {
		fontSize:16,
		marginBottom:6
	}
}