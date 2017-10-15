//admin panel for uploading images go here. done after that? next TurboBurger
import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'
import { TurboClient }      from '../../utils'
import Dropzone             from 'react-dropzone'
import superagent           from 'superagent'
import Slider               from 'react-slick'

class Admin extends Component{
    constructor(props){
        super(props)
        this.state = {
            imageUploaded:false,
            images:[],
            image:null
        }
    }
    uploadFiles(files){
        console.log('start!')
        this.setState({imageUploaded:false})
        files.map( (file) => {
            this.upload(file)
        })
        console.log('end!')
        if( this.state.images.length == files.length ){
            this.setState({imageUploaded:true})
        }  
        
    }
    upload(file){
        let result = {}
		TurboClient.uploadFile(file)
		.then(data => {
            let { images } = this.state
            images.push(data.result.url)
            console.log('data',data)
            this.newImgFunc(data)
            return data
        })
		.catch(err => {
			console.log('upload ERROR: ' + err.message)
        })
    }
    newImgFunc(data){
        console.log('newImgFunc',data)
        this.props.newCarouselImg({ imgUrl: data.result.url })
        .then(d => {
            console.log('data data',d)
            return d
        })
        .catch(err => {
            throw err
        })
    }
    deleteCarousel(c){
        this.props.deleteCarousel(c)
        .then(data => {
            //console.log('deleteCarousel',data)
        })
        .catch(err => {
            throw err
        })
    }
    render(){
        const settings = { dots: true, infinite: true, speed: 1, autoplay:true, slidesToShow: 1, slidesToScroll: 1 }

        return(
            <div>
                Admin Panel
                <Slider {...settings}>
                    {
                        this.props.carousel.map( (c,i) => {
                            return(
                                <div key={i}> 
                                    <img src={ `${c.imgUrl}=s300` }  alt=""/> 
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={ () => this.deleteCarousel(c) } 
                                    >Remove?</button>
                                </div>
                            )
                        })
                    }
                </Slider> 

                <br/>
                <h1>Upload Images for the carousel</h1>
                {
                    this.state.imageUploaded ? <h3 style={{color:'red'}}>Image Uploaded!</h3> : null
                }
                <Dropzone className="btn btn-primary" onDrop={this.uploadFiles.bind(this)}>
                    <strong style={{color:'white'}}>Select File</strong>
                </Dropzone>

            </div>
        )
    }
}

const mapStateToProps = state => {
    const { carousel } = state
    return{
        carousel
    }
}

const dispatchToProps = dispatch => {
    return{
        newCarouselImg: params => dispatch(actions.newCarouselImg(params)),
        deleteCarousel: params => dispatch(actions.deleteCarousel(params))
    }
}

export default connect(mapStateToProps, dispatchToProps)(Admin)