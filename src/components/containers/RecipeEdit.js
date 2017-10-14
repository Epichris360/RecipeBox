import React, { Component } from 'react'
import { connect }          from'react-redux'
import actions              from '../../actions'

let Un = ['kg(s)','oz','lb(s)','cup(s)','gram(s)','liter(s)','quart(s)','unit(s)','package(s)','tb(s)','tsp(s)']
let timeUnits = ['min(s)','hour(s),']
class RecipeEdit extends Component{
    constructor(props){
        super(props)
        this.state = {
            recipe:null,
            loading:true,
            recipeOrg:null, // original recipe
            units:Un,
            timeUnits:timeUnits
        }
    }
    componentDidMount(){
        const recipe = this.props.recipes.filter(r => r.id == this.props.match.params.id)[0]
        this.setState({recipe})
        this.setState({recipeOrg: recipe})
        this.setState({loading:false})
    }
    updateRecipe(){
        console.log('hi there')
        this.props.updateRecipe(recipeOrg, recipe)
        .then(data => {
            this.props.history.push('/')
        })
        .catch(err => { 
            throw err
        })
    }
    updateValue(val, which){
        let { recipe } = this.state
        recipe[which] = val
        this.setState({recipe})
    }
    updateIngredients(val,id ,which){
        let ingredients = this.state.recipe.ingredients.map((ing) => {
            return(
                ing.id == id ? this.updateIngDir(ing, which, val) : ing
            )
        })
        let { recipe } = this.state
        recipe['ingredients'] = ingredients
        this.setState({recipe})
    }
    updateDirection(val,id,which){
        let directions = this.state.recipe.ingredients.map( (dir) => {
            return(
                dir.id == id ? this.updateIngDir(ing, which, val) : dir
            )
        })
        let { recipe } = this.state
        recipe['directions'] = directions
        this.setState({recipe})
    }
    updateIngDir(resouce,which,val){
        resource[which] = val
        return resource
    }
    deleteElement(id, type){
        if(type == 'ingredient'){
            let ingredients = this.state.ingredients.filter( i => {return i.id != id} )
            this.setState({ingredients})
        }else{
            let directions = this.state.directions.filter( d => {return d.id != id} )
            this.setState({directions})
        }   
    }
    addInput(){
        let { recipe} = this.state
        recipe.ingredients.push({id:v4(), name:'', qty:'',unit:this.state.units[0]})
        this.setState({recipe})
    }
    addDirection(){
        let { recipe } = this.state
        recipe.directions.push({id:v4(),text:'',time:'',unit:this.state.timeUnits[0]})
        this.setState({recipe})
        
    }
    render(){
        console.log('this.props.recipe', this.state.recipe)
        return(
            <div>
                {
                    this.state.loading ? null :
                    <div className="col-md-10 col-xs-10">
                        <h1>Edit the Recipe</h1>
                        <input type="text" 
                            className="form-control" 
                            placeholder="Recipes Name?"
                            onChange={ e =>  this.updateValue(e.target.value, 'title') }
                            value={this.state.recipe.title}
                        />
                        <div style={{padding:'5px'}}></div>
                        <textarea 
                            className="form-control"
                            placeholder="Got a Description?"
                            onChange={ e => this.updateValue(e.target.value, 'description') } 
                            cols="30" rows="3"
                            value={this.state.recipe.description}
                        >
                        </textarea>
                        <div style={{padding:'5px'}}></div>
                        <div>
                            <h3>Ingredients  &nbsp;                       
                            <button onClick={this.addInput.bind(this)} className="btn btn-default">
                                More Ingredients?
                            </button></h3>
                            {
                                this.state.recipe.ingredients.map((ing,i) => {
                                    return(
                                        <div key={i} style={{padding:'5px'}}>
                                            Name: <input type="text" onChange={ e => this.updateIngredients(e,ing.id,'name')} value={ing.name}/>
                                            Qty: <input type="number" onChange={ e => this.updateIngredients(e,ing.id,'qty')} value={ing.qty}/>
                                            &nbsp;&nbsp;&nbsp;
                                            <select className="btn btn-default" onChange={e => this.updateIngredients(e,ing.id,'unit')} value={ing.unit}>
                                                {
                                                    
                                                    this.state.units.map((u,i) => {
                                                        return(
                                                            <option key={i} value={`${u}`}  >{u}</option>
                                                        )
                                                    })
                                                }
                                            </select>&nbsp;
                                            <button onClick={ () => this.deleteElement(ing.id,'ingredient') } className="btn btn-danger">X</button>
                                            <br/>
                                        </div>
                                    )
                                })
                            }
                            <div style={{padding:'5px'}}></div>
                            <h3>Directions &nbsp;
                            <button onClick={ () => this.addDirection() } className="btn btn-default">
                                More Directions?
                            </button></h3>
                            {
                                this.state.recipe.directions.map( (d,i) => {
                                    return(
                                        <div key={i} style={{padding:'10px'}} >
                                            <textarea 
                                                className="form-control"
                                                placeholder="what to do?"
                                                onChange={ e => this.updateDirection(e.target.value,d.id,'text') } 
                                                cols="30" rows="3"
                                                value={d.text}
                                            >
                                            </textarea>
                                            <div style={{padding:'3px'}}></div>
                                            <input type="number" 
                                                className="form-control" 
                                                placeholder="For How Long?" 
                                                onChange={ e => this.updateDirection(e.target.value, d.id, 'time') }
                                                value={d.time}
                                            />
                                            <select className="btn btn-default" onChange={e => this.updateDirection(e.target.value,d.id,'unit')} value={d.unit}>
                                                {
                                                    this.state.timeUnits.map((u,i) => {
                                                        return(
                                                            <option key={i} value={`${u}`} >{u}</option>
                                                        )
                                                    })
                                                }
                                            </select>&nbsp;
                                            <button onClick={ () => this.deleteElement(d.id,'direction') } className="btn btn-danger">X</button>
                                            <br/>
                                        </div>
                                    )
                                })
                            }
        
                            <br/><br/>
                            <button className="btn btn-lg btn-success" onClick={ this.updateRecipe.bind(this) }>
                                Submit!
                            </button>
                        </div>
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

const dispatchToProps = dispatch => {
    return{
        updateRecipe: (orig,params) => dispatch(actions.updateRecipe(orig,params))
    }
}

export default connect(mapStateToProps, dispatchToProps)(RecipeEdit)