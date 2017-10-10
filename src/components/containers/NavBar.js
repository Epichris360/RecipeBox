import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../../actions'

class NavBar extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">ReactRecipe</Link>
                        </div>

                        <ul className="nav navbar-nav">
                            <li> <Link to="/new">New Recipe</Link> </li>                       
                        </ul>

                        <ul className="nav navbar-nav navbar-right">

                        </ul>

                    </div>
                </nav>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    }
}
const dispatchToProps = dispatch => {
    return{
        
    }
}
export default connect(mapStateToProps,dispatchToProps)(NavBar)