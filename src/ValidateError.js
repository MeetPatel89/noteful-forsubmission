import React from 'react';
import PropTypes from 'prop-types';

export default function ValidationError(props){
    console.log(props)
    return (props.message) ? <div>{props.message}</div> :
        
            
        
    
    <></>
}

ValidationError.propTypes = {
    message: PropTypes.string
}