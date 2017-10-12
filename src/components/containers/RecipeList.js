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
    

    render(){
        var settings = { dots: true, infinite: true, speed: 1, autoplay:true, slidesToShow: 1, slidesToScroll: 1 };
        return(
            <div>
                <h1>Recipe List!</h1>
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
                                <ul>
                                    {
                                        this.props.recipes.map( (r,i) => {
                                            //console.log('r',r.id)
                                            return(
                                                <div key={i} >
                                                    <div className="col-md-3 col-xs-3">
                                                        <Link to={`/recipe/${r.id}`}>
                                                            <section className="box feature">
                                                                <img src={r.imgLink} />
                                                                <div className="inner">
                                                                    <header>
                                                                        <h2>{r.title}</h2>
                                                                    </header>
                                                                    {r.description}
                                                                </div>
                                                            </section>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
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