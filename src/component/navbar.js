import React from 'react';
import { useState } from 'react/cjs/react.development';
import { removeHTMLTags } from '../utils/utils';
import useFirestore from './DB';
import '../App.css'

const Navbar=(props)=>{

    const {selectNote} = props;
    const [selectedId, setSelectedId] = useState();

    const {notes} = useFirestore('notes');

    return(
        <div className="navbar">
            All your notes are here
            {notes? 
            notes.map((_note, _index)=>{
                return(
                    <div className="navitem" onClick={()=>{selectNote(_note); setSelectedId(_index)}} key={_index}>
                        <div className="notetitle">{_note.title} <span className="edit">edit</span></div>
                        <div className="notedesc">{removeHTMLTags(_note.body)}</div>
                    </div>
                )
            })
            :
            <div>
                Nothing to display!
            </div>
                }
        </div>
    )

}

export default Navbar;