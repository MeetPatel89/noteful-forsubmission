import React from 'react';
import PropTypes from 'prop-types'

export default class ErrorHandling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return {hasError:true};

  }
  render() {
    return (
      (this.state.hasError)
      ?
      (
        <div>
          <h2>Something wrong with the code. The correct content could not be rendered to the UI</h2>
        </div>
      )
    
      : this.props.children
    )
     
  }
}

ErrorHandling.propTypes = {
  children: PropTypes.array
}