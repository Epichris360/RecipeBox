import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

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
    recipeArraySplit(){
        const X = 3
        let newarr = []
        this.props.recipes.reduce((ar, it, i) => { 
            const ix = Math.floor(i/X); 

            if(!ar[ix]) {
                ar[ix] = [];
            }

            ar[ix].push(it);

            return ar;
        }, newarr)
        return newarr
    }

    render(){
        const settings = { dots: true, infinite: true, speed: 1, autoplay:true, slidesToShow: 1, slidesToScroll: 1 };
        const recipeSplit = this.recipeArraySplit()
        return(
            <div>
                <Slider {...settings}>
                    <div> <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?dpr=1&auto=compress,format&fit=crop&w=1200&h=&q=80&cs=tinysrgb&crop=" alt=""/> </div>
                    <div> <img src="https://images.unsplash.com/photo-1495214783159-3503fd1b572d?dpr=1&auto=compress,format&fit=crop&w=1200&h=&q=80&cs=tinysrgb&crop=" alt=""/> </div>
                    <div> <img src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?dpr=1&auto=compress,format&fit=crop&w=1200&h=&q=80&cs=tinysrgb&crop=" alt=""/> </div>
                    <div> <img src="https://images.unsplash.com/photo-1495214783159-3503fd1b572d?dpr=1&auto=compress,format&fit=crop&w=1200&h=&q=80&cs=tinysrgb&crop=" alt=""/> </div>
                </Slider>
                <br/>
                {
                    this.state.loading ?
                        <h1>Loading.....</h1> :
                        <div>
                            <br/>
                            {
                                recipeSplit.map( (row,i) => {
                                    return(
                                        <div key={i} className="row">
                                            {
                                                row.map((r,i) => {
                                                    return(
                                                        <div key={i} className="col-md-4 col-xs-4">
                                                            <Link to={`/recipe/${r.id}`}>
                                                                <div className="box feature" style={{ padding:'10px' }}>
                                                                    <img src={r.imgLink} />
                                                                    <div className="inner">
                                                                        <header>
                                                                            <h2>{r.title}</h2>
                                                                        </header>
                                                                        {r.description}
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }                                
                                        </div>
                                    )
                                })
                            }

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
        allRecipes: () => dispatch(actions.allRecipes())
    }
}

export default connect(mapStateToProps,dispatchToProps)(RecipeList)