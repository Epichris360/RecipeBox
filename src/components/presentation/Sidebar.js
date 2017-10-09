import React, { Component } from 'react'

export default (props) => {

	const menu = props.items.map((item, i) => {
		return (
			<li key={i}>
				<a href={item.link}>
					<div style={{color:'#fff'}}>{item.name}</div>
				</a>
			</li>
		)
	})

	return (
		<header id="header" className="no-sticky hidden-xs sidebar" style={{paddingTop:96,background:'#333'}}>
			<div id="header-wrap">
				<div className="container clearfix">
					<div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

					<nav id="primary-menu">
						<ul>{menu}</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}

