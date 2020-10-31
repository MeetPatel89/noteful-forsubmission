import React from "react";
import ApiContext from "../ApiContext";
import config from '../config';
import ValidateError from '../ValidateError';
import PropTypes from 'prop-types';
import '../AddFolder/AddFolder.css';
import ErrorBoundary from '../ErrorBoundary';


export default class AddFolder extends React.Component {
  

  constructor(props){
    super(props);
    this.state={
      folderName:{
        value: '',
        touched: false
      }
    }
  }

  static contextType = ApiContext;

  updateFolderName = foldername => {
    this.setState({
      folderName:{
        value: foldername, 
        touched: true
      }
    })
  }

  handleSubmitFolder = e => {
    e.preventDefault();
    let nameError=this.validateName();
    const foldername=this.state.folderName.value;
    if(nameError){
      this.setState({
        folderName:{
          value:foldername, 
          touched:true}
      })
      return
    }

    fetch(`${config.Local_Server_Endpoint}/folders/`, {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({'name': foldername})
    })
    .then(res=>res.json())
    .then(data=>{
      
      this.context.addFolder(data)
      this.props.history.push('/')
    })
    .catch(err=>console.log(err))
  }

  
  
  validateName(){
    const folderName = this.state.folderName.value.trim()
    if(folderName.length === 0){
      return 'Name is required';
    } else if(folderName.length < 3){
      return 'Name must be at least 3 characters long';
    }
  }


  render() {
    

    
    const nameError = this.validateName();
    return (

     
          <div>
        <h2>Add A New Folder</h2>

        <form className="add-folder" onSubmit={e=>this.handleSubmitFolder(e)}> 
          <label htmlFor="name" className="user">
          {this.state.folderName.touched && (
          <ValidateError message={nameError} />
          )}
          </label>
          
          <input 
            type="text" 
            className="folder-name"
            name="folder-name" 
            id="folder-name" 
            onChange={e => this.updateFolderName(e.target.value)}
            required/>
          
          <button 
            type="submit" 
            className="add-folder-button">
            Submit</button>
          
        </form>
      </div>
      
      
    );
  }
}


AddFolder.propTypes = {
  history: PropTypes.object
}

