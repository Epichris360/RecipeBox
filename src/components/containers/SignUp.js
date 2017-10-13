import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class SignUp extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstName:'',
            lastName:'',
            username:'',
            password:'',
            email:'',
            error: false,
            errorMessage:'',
            passwordConfirm:''
        }
    }
    newUser(){
        const { firstName, lastName, username, 
                password, email, passwordConfirm } = this.state
        if(password !== passwordConfirm){
            this.setState({ error: true })
            this.setState({ errorMessage: 'Passwords Don\'t Match!' })
            return
        }
        const params = { firstName, lastName, username, password, email, role:'normal' }
        this.props.signUp(params)
        .then(response => {
            this.setState({error: false})
            this.setState({errorMessage: ''})
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({error: false})
            this.setState({errorMessage: 'Please Check Your Info!'})
            return
        })
    }
    render(){
        return(
            <div className="row">
                {
                    this.state.error ? 
                    <div className="alert alert-danger">
                        <strong>Danger!</strong> {this.state.errorMessage}
                    </div> : null
                }
                <div className="col-md-8">
                    <h1 className="topmargin-sm nobottommargin">Sign Up!</h1>
                    <hr/>
                    <input className="form-control"  
                        type="text" 
                        placeholder="User Name" 
                        onChange={ e => this.setState({username: e.target.value}) }
                        required
                    /> <br/>
                    <input className="form-control"  
                        type="text" 
                        placeholder="First Name" 
                        onChange={ e => this.setState({firstName: e.target.value}) }
                        required
                    /> <br/>
                    <input className="form-control"  
                        type="text" 
                        placeholder="Last Name" 
                        onChange={ e => this.setState({lastName: e.target.value}) }
                        required
                    /> <br/>
                    <input className="form-control"  
                        type="text" 
                        placeholder="Email" 
                        onChange={ e => this.setState({email: e.target.value}) }
                        required
                    />
                    <br />
                    <input className="form-control"  
                        type="password" 
                        placeholder="Password"
                        onChange={ e => this.setState({password: e.target.value}) } 
                        required
                    /> <br/>
                    <input className="form-control"  
                        type="password" 
                        placeholder="Password Confirm" 
                        onChange={ e => this.setState({passwordConfirm: e.target.value}) }
                        required
                    />
                    <br />
                    <button 
                        className="btn btn-lg btn-success"
                        onClick={ this.newUser.bind(this) }
                    >Log In!</button>
                </div>
            </div>
        )
    }
}

const dispatchToProps = dispatch => {
    return{
        signUp: params => dispatch(actions.addUser(params))
    }
}

export default connect(null, dispatchToProps)(SignUp)