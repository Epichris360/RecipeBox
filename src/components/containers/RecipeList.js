import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

class RecipeList extends Component{

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            loadingCarousel: true,
            images: []
        }
    }
    componentDidMount(){
        if(this.props.recipes.length == 0){
            this.props.allRecipes()
            .then(response => {
                this.setState({loading:false})
            })
            .catch(err => {
                console.log('error' + err.message)
            })
        }else{
            this.setState({loading:false})
        }

        if(this.props.carousel.length == 0){
            this.props.allCarousel()
            .then(response => {
                this.setState({loadingCarousel:false})
            })
            .catch(err => {
                console.log('error' + err.message)
            })
        }else{
            this.setState({loadingCarousel:false})
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
                {
                    this.state.loadingCarousel ? <h1>Loading.....</h1> :
                    <Slider {...settings}>
                        {
                            this.props.carousel.map( (c,i) => {
                                return(
                                    <div key={i}> <img src={ `${c.imgUrl}=s1200` }  alt=""/> </div>
                                )
                            })
                        }
                    </Slider> 
                }
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
                                                        <div key={i} className="col-md-4 col-xs-6">
                                                            <Link to={`/recipe/${r.id}`}>
                                                                <div className="panel" style={{ padding:'10px' }}>
                                                                    <img src={r.imgLink} />
                                                                    <div className="inner">
                                                                        <header>
                                                                            <h4>{r.title}</h4>
                                                                        </header>
                                                                        {r.description.substr(0,100)+'...'}
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
                <button onClick={ () => console.log('this.props.carousel',this.props.carousel) }>
                    this.props.carousel
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { recipes, carousel } = state
    return{
        recipes, carousel
    }
}

const dispatchToProps = dispatch => {
    return{
        allRecipes: () => dispatch(actions.allRecipes()),
        allCarousel: () => dispatch(actions.allCarousel())
    }
}

export default connect(mapStateToProps,dispatchToProps)(RecipeList)