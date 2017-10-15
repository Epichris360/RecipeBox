//admin panel for uploading images go here. done after that? next TurboBurger
import React, { Component } from 'react'
import { connect }          from 'react-redux'
import actions              from '../../actions'
import { TurboClient }      from '../../utils'
import Dropzone             from 'react-dropzone'
import superagent           from 'superagent'

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
        })
		.catch(err => {
			console.log('upload ERROR: ' + err.message)
        })
        console.log('images',this.state.images)
    }
    newImgFunc(data){
        console.log('newImgFunc',data)
        this.props.newImg({ imgUrl: data.result.url })
        .then(data => {
            console.log('data data',data)
        })
        .catch(err => {
            throw err
        })
    }
    render(){
        return(
            <div>
                Admin Panel

                <br/>
                <h1>Upload Images for the carousel</h1>
                {
                    this.state.imageUploaded ? <h3 style={{color:'red'}}>Image Uploaded!</h3> : null
                }
                <Dropzone className="btn btn-primary" onDrop={this.uploadFiles.bind(this)}>
                    <strong style={{color:'white'}}>Select File</strong>
                </Dropzone>
                <br/>
                <button onClick={ () => console.log('state',this.state) }>
                    this.state
                </button>
            </div>
        )
    }
}

const dispatchToProps = dispatch => {
    return{
        newImg: params => dispatch(actions.newImg(params))
    }
}

export default connect(null, dispatchToProps)(Admin)