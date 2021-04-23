import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { auth, firestore } from '../server/firebase';
import Editor from './editor';
import Sidebar from './sidebar';

const NoteApp=()=>{

    const [state, setState] = useState({
        selectedNoteIndex: null,
        selectedNote: null,
        notes: null
    })

    useEffect(()=>{

        firestore.collection(`users/${auth.currentUser.uid}/notes`)
        .onSnapshot(docRef =>{
            const _notes = docRef.docs.map(_doc=>{
                const data = _doc.data();
                data['id'] = _doc.id;
                return data;
            });
            console.log(_notes);
            setState({...state,notes: _notes});
        })

    })

    const selectNote=(note, index)=>{
        setState({...state, selectedNote: note, selectedNoteIndex: index});
}

    return (
        <div className="app-container">
        
            <Sidebar
            selectedNoteIndex={state.selectedNoteIndex}
            notes={state.notes}
           
            
            />
            {
            state.selectedNote &&
            <Editor selectedNote={state.selectedNote}
            selectedNoteIndex={state.selectedNoteIndex}
            notes={state.notes}
            />
            }
        </div>
    )
}

export default NoteApp;