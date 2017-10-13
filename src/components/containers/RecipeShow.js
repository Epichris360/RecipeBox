import React,{ Component } from 'react'
import { connect }         from'react-redux'
import turbo               from 'turbo360'
import pkg                 from '../../../package.json'
import actions             from '../../actions'
const APP_ID = pkg.app || ''

class RecipeShow extends Component{
    constructor(props){
        super(props)
        this.state = {
            recipe:null,
            loading:true,
            comments:[],
            comment:''
        }
    }
    componentDidMount(){
        const recipe = this.props.recipes.filter(r => r.id == this.props.match.params.id)[0]
        console.log('recipe',recipe)
        this.setState({recipe})
        this.setState({loading:false})

        turbo({site_id:APP_ID}).fetch('comments', { recipe_id: recipe.id })
        .then(data => {
            this.setState({comments:[ ...data ]})
            return
        })
        .catch(err => {
            console.log('err',err)
        })
        window.scrollTo(0, 0)
    }
    submitCommment(){
        if(this.state.comment != ''){
            turbo({site_id:APP_ID}).create('comments', { text:this.state.comment, recipe_id:this.state.recipe.id })
            .then(data => {
                let {comments} = this.state
                comments.push(data)
                this.setState({comments})
                return
            })
            .catch(err => {
                console.log('err',err)
            })
            this.setState({comment:''})
        }
    }
    render(){
        const { recipe } = this.state
        return(
            <div>
                {
                    this.state.loading ? 
                        <h1>Loading....</h1>:
                        <div>
                            <div className="panel">
                                <img src={recipe.imgLink} style={{padding:'10px', display:'inline-block', verticalAlign: 'middle' }} />
                                <div style={{padding:'20px', display:'inline-block', verticalAlign: 'middle'}}>
                                    <h2>{recipe.title}</h2>
                                    {recipe.description}
                                </div>
                            </div>
                            <h3>Ingredients</h3>
                            <div className="panel">
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
                                            <div key={i} className="panel" style={{padding:'5px'}}>
                                                <li>{`${i+1} - ${d.text} | ${d.time} ${d.unit}`}</li>
                                            </div>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                }

                <div className="panel">
                    <h1 className="text-center" style={{padding:'10px'}}>Commments Section! </h1>
                </div>

                <div className="panel">
                    <div style={{padding:'10px'}}>
                        <textarea 
                            className="form-control"
                            placeholder="Do You Have A Comment???!"
                            cols="30" rows="3"
                            onChange={ e => this.setState({comment: e.target.value}) }
                            value={this.state.comment}
                        >
                        </textarea>
                        <button 
                            className="pull-right btn btn-primary"
                            onClick={ () => this.submitCommment() }
                        ><strong style={{color:'white'}}>Submit!</strong></button>
                        <br/>
                    </div>
                </div>
                {
                    this.state.comments.map((c,i) => {
                        return(
                            <div className="panel" key={i} >
                                <div style={{ padding: '10px' }}>
                                    {c.text}
                                    <br/>
                                    <strong>Insert UserName</strong>
                                </div>
                            </div>
                        )
                    })
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