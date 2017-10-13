import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { v4 }               from 'uuid'
import actions              from '../../actions'
import { TurboClient }      from '../../utils'
import Dropzone             from 'react-dropzone'
import superagent           from 'superagent'

let Un = ['kg(s)','oz','lb(s)','cup(s)','gram(s)','liter(s)','quart(s)','unit(s)','package(s)','tb(s)','tsp(s)']
let timeUnits = ['min(s)','hour(s),']
class RecipeNew extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'',
            units:Un,
            timeUnits:timeUnits,
            description:'',
            ingredients:[{id:v4(), name:'', qty:'',unit:Un[0]}],
            directions:[{id:v4(),text:'',time:'',unit:timeUnits[0]}],
            imgLink:'https://lh3.googleusercontent.com/jPSyeJliGwHCqZ9jV6Cz8R3fU9nIjwciZkaZSTH8dW3ZmlRCv730DfDA-nnkWm1fWg75m4-akZ0u-N6OpcTRsKnHUA',
            imageUploaded: false
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
            description:this.state.description,
            imgLink: this.state.imgLink,
            ingredients: this.state.ingredients,
            directions: this.state.directions,
            user_id: this.props.user.id,
            username: this.props.user.username
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
    deleteElement(id, type){
        if(type == 'ingredient'){
            let ingredients = this.state.ingredients.filter( i => {return i.id != id} )
            this.setState({ingredients})
        }else{
            let directions = this.state.directions.filter( d => {return d.id != id} )
            this.setState({directions})
        }  

        
    }
    uploadFile(files){
		const file = files[0]
        this.setState({imageUploaded:false})
		TurboClient.uploadFile(file)
		.then(data => {
            this.setState({imgLink: data.result.url})
            this.setState({imageUploaded:true})
		})
		.catch(err => {
			console.log('upload ERROR: ' + err.message)
		})
	}
    render(){
        return(
            <div className="col-md-10 col-xs-10">
                <h1>Create A New Recipe</h1>
                <input type="text" 
                    className="form-control" 
                    placeholder="Recipes Name?"
                    onChange={ e => this.setState({title:e.target.value}) }
                />
                <div style={{padding:'5px'}}></div>
                <textarea 
                    className="form-control"
                    placeholder="Got a Description?"
                    onChange={ e => this.setState({description: e.target.value}) } 
                    cols="30" rows="3"
                    >
                </textarea>
                <div style={{padding:'5px'}}></div>
                <div>
                    <h3>Ingredients  &nbsp;                       
                    <button onClick={this.addInput.bind(this)} className="btn btn-default">
                        More Ingredients?
                    </button></h3>
                    {
                        this.state.ingredients.map((ing,i) => {
                            return(
                                <div key={i} style={{padding:'5px'}}>
                                    Name: <input type="text" onChange={ e => this.updateIngredients(e,ing.id,'name')}/>
                                    Qty: <input type="number" onChange={ e => this.updateIngredients(e,ing.id,'qty')}/>
                                    &nbsp;&nbsp;&nbsp;
                                    <select className="btn btn-default" onChange={e => this.updateIngredients(e,ing.id,'unit')}>
                                        {
                                            this.state.units.map((u,i) => {
                                                return(
                                                    <option key={i} value={`${u}`}>{u}</option>
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
                        this.state.directions.map( (d,i) => {
                            return(
                                <div key={i} style={{padding:'10px'}} >
                                    <textarea 
                                        className="form-control"
                                        placeholder="what to do?"
                                        onChange={ e => this.updateDirection(e.target.value,d.id,'text') } 
                                        cols="30" rows="3">
                                    </textarea>
                                    <div style={{padding:'3px'}}></div>
                                    <input type="number" className="form-control" placeholder="For How Long?" onChange={ e => this.updateDirection(e.target.value, d.id, 'time') }/>
                                    <select className="btn btn-default" onChange={e => this.updateDirection(e.target.value,d.id,'unit')}>
                                        {
                                            this.state.timeUnits.map((u,i) => {
                                                return(
                                                    <option key={i} value={u}>{u}</option>
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

                    <h3>Upload File</h3>
                    {
                        this.state.imageUploaded ? <h3 style={{color:'red'}}>Image Uploaded!</h3> : null
                    }
                    <Dropzone className="btn btn-primary" onDrop={this.uploadFile.bind(this)}>
                        <strong style={{color:'white'}}>Select File</strong>
                    </Dropzone>

                    <br/><br/>
                    <button className="btn btn-lg btn-success" onClick={ this.createRecipe.bind(this) }>
                        Submit!
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { user } = state
    return{
        user
    }
}

const dispatchToProps = dispatch => {
    return{
        newRecipe: params => dispatch(actions.newRecipe(params))
    }
}

export default connect(null,dispatchToProps)(RecipeNew)