import React, { Component } from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
import actions from '../../actions'

let Un = ['kg(s)','oz','lb(s)','cup(s)','gram(s)','liter(s)','quart(s)','unit(s)','package(s)','tb(s)','tsp(s)']
let timeUnits = ['min(s)','hour(s),']
class RecipeNew extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            units:Un,
            timeUnits:timeUnits,
            ingredients:[{id:v4(), name:'', qty:'',unit:Un[0]}],
            directions:[{id:v4(),text:'',time:'',unit:timeUnits[0]}]
        }
    }
    addInput(){
        const { ingredients} = this.state
        ingredients.push({id:v4(), name:'', qty:'',unit:this.state.units[0]})
        this.setState({ingredients})
    }
    updateIngredients(e,id,which){
        let ingredients = this.state.ingredients.map((ing) => {
            return(
                ing.id === id ? this.updateIng(ing,which,e.target.value) : ing 
            )
        })
        this.setState({ingredients})
    }
    updateIng(ing,which,val){
        ing[which] = val
        return ing
    }
    createRecipe(){
        let recipe = {
            title: this.state.title,
            ingredients: this.state.ingredients,
            directions: this.state.directions
        }
        this.props.newRecipe(recipe)
        .then(data => {
            console.log('data!', data)
            this.props.history.push('/')
        })
        .catch(err => {
            throw err
        })
        //console.log('recipe',recipe)
    }
    updateDirection(val,id,which){
        //console.log(`val: ${val}; id: ${id}; which: ${which}`)
        let directions = this.state.directions.map((dir) => {
            return(
                dir.id === id ? this.updateDir(dir,which,val) : dir 
            )
        })
        this.setState({directions})
    }
    updateDir(dir,which,val){
        dir[which] = val
        return dir
    }
    addDirection(){
        const { directions} = this.state
        directions.push({id:v4(),text:'',time:'',unit:this.state.timeUnits[0]})
        this.setState({directions})
        
    }
    render(){
        return(
            <div className="col-md-10 col-xs-12">
                <h1>Create A New Recipe</h1>
                <hr/>
                <input type="text" 
                    className="form-control" 
                    placeholder="Recipes Name?"
                    onChange={ e => this.setState({title:e.target.value}) }
                />
                <div>
                    <h3>Ingredients                        
                    <button onClick={this.addInput.bind(this)} className="btn btn-default">
                        More Ingredients?
                    </button></h3>
                    {
                        this.state.ingredients.map((ing,i) => {
                            return(
                                <div key={i}>
                                    Name: <input type="text" onChange={ e => this.updateIngredients(e,ing.id,'name')}/>
                                    Qty: <input type="number" onChange={ e => this.updateIngredients(e,ing.id,'qty')}/>
                                    <select onChange={e => this.updateIngredients(e,ing.id,'unit')}>
                                        {
                                            this.state.units.map((u,i) => {
                                                return(
                                                    <option key={i} value="{u}">{u}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <br/><br/>
                                </div>
                            )
                        })
                    }
                    <br/>
                    <h3>Directions
                    <button onClick={ () => this.addDirection() } className="btn btn-default">
                        More Directions?
                    </button></h3>
                    {
                        this.state.directions.map( (d,i) => {
                            return(
                                <div key={i}>
                                    <textarea 
                                        className="form-control"
                                        placeholder="what to do?"
                                        onChange={ e => this.updateDirection(e.target.value,d.id,'text') } 
                                        cols="30" rows="3">
                                    </textarea> <br/>
                                    <input type="number" className="form-control" placeholder="For How Long?" onChange={ e => this.updateDirection(e.target.value, d.id, 'time') }/>
                                    <select onChange={e => this.updateDirection(e.target.value,d.id,'unit')}>
                                        {
                                            this.state.timeUnits.map((u,i) => {
                                                return(
                                                    <option key={i} value="{u}">{u}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <br/><br/>
                                </div>
                            )
                        })
                    }

                    <br/><br/>
                    <button className="btn btn-success" onClick={ this.createRecipe.bind(this) }>
                        Submit!
                    </button>
                    <button className="btn btn-default" onClick={ () => console.log(this.state) }>
                        this.state
                    </button>
                </div>
            </div>
        )
    }
}

const dispatchToProps = dispatch => {
    return{
        newRecipe: params => dispatch(actions.newRecipe(params))
    }
}

export default connect(null,dispatchToProps)(RecipeNew)