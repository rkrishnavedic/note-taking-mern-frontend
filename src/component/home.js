import React from 'react';
import { useState } from 'react/cjs/react.development';
import Editor from './editor';
import Navbar from './navbar';

const Home=()=>{

    const [selectedNote, setSelectedNote] = useState();

    const selectNote=(note)=>{
        setSelectedNote(note);
    }

    return (
        <div>
            <Navbar selectNote={selectNote}/>
            {selectedNote && <Editor selectedNote={selectedNote} />}
        </div>
    )
}

export default Home;