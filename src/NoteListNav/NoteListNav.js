import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css';
import ErrorBoundary from '../ErrorBoundary';
import PropTypes from 'prop-types';


export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    
    const { folders=[], notes=[] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <ErrorBoundary>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
              </ErrorBoundary>
              
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <ErrorBoundary>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
          </ErrorBoundary>
          
            
        </div>
      </div>
    )
  }
}

NoteListNav.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
}