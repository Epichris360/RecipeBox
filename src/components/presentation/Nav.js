import React, { Component } from 'react'

export default (props) => {

	return (
		<div id="page-menu">
			<div id="page-menu-wrap">
				<div className="container clearfix" style={{width:98+'%'}}>
					<div style={{fontFamily:'Pathway Gothic One',fontSize:30,fontWeight:100}} className="menu-title">
						<a style={{color:'#fff'}} target="_blank" href="https://www.turbo360.co">Turbo</a>
					</div>

					<nav className="one-page-menu">
						<ul className="hidden-xs">
							<li><a target="_blank" href="https://www.turbo360.co"><div style={{paddingTop:3}}>Home</div></a></li>
							<li><a target="_blank" href="https://www.turbo360.co/docs"><div style={{paddingTop:3}}>Docs</div></a></li>
						</ul>
					</nav>

					<div id="page-submenu-trigger"><i className="icon-reorder"></i></div>
				</div>
			</div>
		</div>
	)
}