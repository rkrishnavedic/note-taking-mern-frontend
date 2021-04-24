import React from 'react';
import { useState } from 'react/cjs/react.development';
import { removeHTMLTags } from '../utils/utils';
import useFirestore from './DB';
import '../App.css';
import Popup from './popup';

const Navbar=(props)=>{

    const {selectNote} = props;
    const [selectedId, setSelectedId] = useState();
    const [changeTitle, setChangeTitle] = useState({
        titleChangeId: null,
        titleChangeValue: null,
    })

    const {notes} = useFirestore('notes');

    const handleTitleChange=(id, title)=>{
        console.log(id, title);
        setChangeTitle({
            titleChangeId: id,
            titleChangeValue: title,
        })
        console.log(changeTitle)
    }

    return(
        <>
        <div className="navbar">
            All your notes are here
            {notes? 
            notes.map((_note, _index)=>{
                return(
                    <div className="navitem" onClick={()=>{selectNote(_note); setSelectedId(_index)}} key={_index}>
                        <div className="notetitle">{_note.title} <span onClick={()=>handleTitleChange(_note.id, _note.title)} className="text-primary">edit</span></div>
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
        {changeTitle.titleChangeId && <Popup changeTitle={changeTitle} setChangeTitle={setChangeTitle}/>}
        </>
    )

}

export default Navbar;