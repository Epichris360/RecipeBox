import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import actions from '../../actions'

class NavBar extends Component{
    constructor(props){
        super(props)
    }
    logout(){
        this.props.logout()
        this.props.history.push('/')
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

                        {
                            this.props.user.id != ''  ? 
                                <ul className="nav navbar-nav navbar-right">
                                    <li><Link to="/new"><strong>New Recipe</strong></Link></li>
                                    <li><Link to="" >Logout</Link></li>
                                    {
                                        this.props.user.role == 'admin'? 
                                        <li><Link to="/admin">Admin Panel</Link></li> : null
                                    }
                                    <li><a>{`Hey there ${this.props.user.username}`}</a></li>
                                </ul> : 
                                <ul className="nav navbar-nav navbar-right">
                                    <li> <Link to="/SignIn">SignIn</Link> </li>
                                    <li><Link to="/SignUp">Signup</Link></li>
                                    <li><Link to="/admin">Admin Panel</Link></li>
                                </ul>
                        }

                    </div>
                </nav>

            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state
    return {
        user
    }
}
const dispatchToProps = dispatch => {
    return{
        logout: () => dispatch(actions.logoutUser())
    }
}
export default connect(mapStateToProps,dispatchToProps)(NavBar)