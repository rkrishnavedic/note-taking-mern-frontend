import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useState } from 'react/cjs/react.development';
import { auth, firestore } from '../server/firebase';
import debounce from '../utils/utils';
import '../App.css';

const Editor = (props)=>{
    const [note, setNote]=useState({
        text: props.selectedNote?.body,
        title: props.selectedNote?.title,
        id: props.selectedNote?.id
    })

    const updateBody = async (value)=>{
        await setNote({...note, text: value})

        //here DB upload will happen
        console.log('DB updated!');

        await firestore.collection(`users/${auth.currentUser.uid}/notes`)
                    .doc(note.id)
                    .set({body: value},{merge: true})
                    .then(()=>{
                        console.log('DB text Update Success!')
                    })

    }

    if(props.selectedNote === null){
        return (
            <div> Not selected Note</div>
        )
    }


    return (
        
        <div className="editor">
            {props.selectedNote &&
            <ReactQuill
            className="ql-editor"
            value={note.text}
            onChange={debounce(updateBody,1500)}
            />
            
            }
        </div>
        
    )
}

export default Editor;