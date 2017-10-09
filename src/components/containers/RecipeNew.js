import React, { Component } from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
let Un = ['kg','oz','lbs','cups','grams','liters','quarts']
class RecipeNew extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            units:Un,
            ingredients:[{id:v4(), name:'', qty:'',unit:Un[0]}]
        }
    }
    addInput(){
        const { ingredients} = this.state
        ingredients.push({id:v4(), name:'', qty:'',unit:this.state.units[0]})
        this.setState(ingredients)
    }
    updateIngredients(e,id,which){
        let ingredients = this.state.ingredients.map((ing) => {
            return(
                ing.id === id ? this.updateIng(ing,which,e.target.value) : ing 
            )
        })
    }
    updateIng(ing,which,val){
        ing[which] = val
        return ing
    }
    createRecipe(){
        let recipe = {
            title:this.state.title,
            ingredients:this.state.ingredients
        }
        console.log('recipe',recipe)
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
                        Another Ingredient
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
                    <br/><br/>
                    <button className="btn btn-success" onClick={ this.createRecipe.bind(this) }>
                        Submit!
                    </button>
                </div>
            </div>
        )
    }
}

export default RecipeNew