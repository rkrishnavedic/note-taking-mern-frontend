import React from 'react';
import './NoteList.css';

function Notelist(props){
    const {title} = props;

    return (
        <div className="note-list">
            <div className="note-list-head">
                <div className="title">
                    <h1>{title}</h1>
                </div>
                <div className="sub-head">
                    <div className="note-count">
                        2 notes
                    </div>
                </div>
            </div>
            <div className="note-list-body">
                <div className="note-card">
                    <div className="note-card-head">
                        <div className="note-card-title">
                            Note one
                        </div>
                        <div className="note-card-desc">
                            description here
                            <div className="note-card-date">
                            12/12/12
                        </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notelist;