import React from 'react';
import { useState } from 'react/cjs/react.development';
import Editor from './editor';
import Notelist from './notelist';
import Sidebar from './sidebar';

const NoteApp=()=>{

    const [state, setState] = useState({
        selectedNoteIndex: null,
        selectedNote: null,
        notes: null
    })

    const selectNote=(note, index)=>{
        setState({...state, selectedNote: note, selectedNoteIndex: index});
}

    return (
        <div className="app-container">
            <Notelist collectionName="notes"/>
        
            <Sidebar
            selectedNoteIndex={state.selectedNoteIndex}
            notes={state.notes}
            newNote={newNote}
            selectNote={selectNote}
            deleteNote={deleteNote}
            />
            
            <Editor/>

        </div>
    )
}

export default NoteApp;