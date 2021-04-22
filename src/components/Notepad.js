import React, { useEffect, useState } from 'react';
import {faArchive} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Notepad.css';
import {useLocation} from 'react-router-dom';

function Notepad(){

    const location = useLocation();

    const [noteDesc, setNoteDesc] = useState({
        title: 'Untitled',
        text:'',
        updatedAt:null,
        isArchive: false
    });

    useEffect(()=>{

        console.log(location)

        // setNoteDesc({
        //     title: location.note.title,
        //     text: location.note.text,
        //     updatedAt: location.note.updatedAt.seconds,
        //     isArchive: location.note.isArchive
        // })

    }, [location.note])

    return (
        <div className="note">
            <div className="note-head">
                <div className="note-head-date">
                    Last edited on {noteDesc.updatedAt}
                </div>
                <div className="note-head-action">
         
                        <FontAwesomeIcon className="action-btn" icon={faArchive}/>
                   
                </div>
            </div>
            <div className="note-body">
                <div className="note-body-head">
                    <input value={noteDesc.title} placeholder="Title"/>
                </div>
                <div className="note-body-content">
                    <textarea value={noteDesc.text} placeholder="Start Writing..."/>
                </div>
            </div>
        </div>
    )
}

export default Notepad;