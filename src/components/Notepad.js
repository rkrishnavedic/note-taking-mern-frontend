import React from 'react';
import {faArchive} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Notepad.css';

function Notepad(){
    return (
        <div className="note">
            <div className="note-head">
                <div className="note-head-date">
                    Last edited on Sep 11, 2020
                </div>
                <div className="note-head-action">
         
                        <FontAwesomeIcon className="action-btn" icon={faArchive}/>
                   
                </div>
            </div>
            <div className="note-body">
                <div className="note-body-head">
                    <input placeholder="Title"/>
                </div>
                <div className="note-body-content">
                    <textarea placeholder="Start Writing..."/>
                </div>
            </div>
        </div>
    )
}

export default Notepad;