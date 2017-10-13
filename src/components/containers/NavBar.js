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
                <br />
                <nav className="container navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand"><h1 style={{color:'#ff4486'}}>RecipeBox</h1></Link>
                        </div>

                        <ul className="nav navbar-nav">
                                               
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/new"><strong>New Recipe</strong></Link></li>
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