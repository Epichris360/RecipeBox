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
                            <div className="box feature">
                                <img src={recipe.imgLink} style={{padding:'10px'}} />
                                    <div className="pull-right" >
                                        <div style={{padding:'20px'}}>
                                            <h2>{recipe.title}</h2>
                                            {recipe.description}
                                        </div>
                                    </div>
                            </div>
                            <br/>
                            <h3>Ingredients</h3>
                            <div className="box feature">
                                <ul style={{padding:'20px'}}>
                                    {
                                        recipe.ingredients.map( (ing, i) => {
                                            return(
                                                <li key={i}>{`${i+1}- ${ing.name}  ${ing.qty} ${ing.unit}`}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <h3>Directions</h3>
                            <ol>
                                {
                                    recipe.directions.map( (d,i) => {
                                        return(
                                            <div key={i} className="box feature" style={{padding:'5px'}}>
                                                <li>{`${i+1} - ${d.text} | ${d.time} ${d.unit}`}</li>
                                            </div>
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