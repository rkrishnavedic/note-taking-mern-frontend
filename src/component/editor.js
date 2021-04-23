import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useState } from 'react/cjs/react.development';
import debounce from '../utils/utils';

const Editor = (props)=>{
    const [note, setNote]=useState({
        text: props.selectedNote.body,
        title: props.selectedNote.title,
        id: props.selectedNote.id
    })

    const updateBody = async (value)=>{
        await setNote({...note, text: value})

        //here DB upload will happen
        console.log('DB updated!');
    }



    return (
        <div>
            <ReactQuill
            value={note.text}
            onChange={debounce(updateBody,1500)}
            />
        </div>
    )
}

export default Editor;