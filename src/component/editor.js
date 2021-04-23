import React from 'react';
import ReactQuill from 'react-quill';
import { useState } from 'react/cjs/react.development';
import debounce from '../utils/utils';

const Editor = ()=>{
    const [note, setNote]=useState({
        id: '',
        title: '',
        text: '',
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