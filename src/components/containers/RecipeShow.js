import React,{ Component } from 'react'
import { connect } from'react-redux'

class RecipeShow extends Component{
    constructor(props){
        super(props)
        this.state = {
            recipe:null,
            loading:true
        }
    }
    componentDidMount(){
        const recipe = this.props.recipes.filter(r => r.id == this.props.match.params.id)[0]
        console.log('recipe',recipe)
        this.setState({recipe})
        this.setState({loading:false})
    }
    render(){
        const { recipe } = this.state
        return(
            <div>
                {
                    this.state.loading ? 
                        <h1>Loading....</h1>:
                        <div>
                            <h1>{recipe.title}</h1>
                            <hr/>
                            <h3>Ingredients</h3>
                            <ol>
                                {
                                    recipe.ingredients.map( (ing, i) => {
                                        return(
                                            <li key={i}>{`  ${ing.name} | ${ing.qty} ${ing.unit}`}</li>
                                        )
                                    })
                                }
                            </ol>
                            <h3>Directions</h3>
                            <ol>
                                {
                                    recipe.directions.map( (d,i) => {
                                        return(
                                            <li key={i}>{`   ${d.text} | ${d.time} ${d.unit}`}</li>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                }
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

export default connect(mapStateToProps,null)(RecipeShow)