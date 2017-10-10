import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Link }             from 'react-router-dom'

class RecipeList extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading: true
        }
    }
    componentDidMount(){
        if(this.props.recipes.length == 0){
            this.props.allRecipes()
            .then(response => {
                this.setState({loading:false})
            })
            .catch(err => {
                console.log('error'+err.message)
            })
        }else{
            this.setState({loading:false})
        }
    }
    

    render(){
        return(
            <div>
                <h1>Recipe List!</h1>
                {
                    this.state.loading ?
                        <h1>Loading.....</h1> :
                        <div>
                                <ul>
                                    {
                                        this.props.recipes.map( (r,i) => {
                                            console.log('r',r.id)
                                            return(
                                                <div key={i}>
                                                    <Link to={`/recipe/${r.id}`}>{r.title}</Link>
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                        </div>
                }
                <button onClick={ () => console.log(this.props.recipes) }>
                    this.props.recipes
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { recipes } = state
    return{
        recipes
    }
}

const dispatchToProps = dispatch => {
    return{
        allRecipes: () => dispatch(actions.allRecipes())
    }
}

export default connect(mapStateToProps,dispatchToProps)(RecipeList)