import React from 'react';
import { useState } from 'react/cjs/react.development';
import SidebarItem from './sidebaritem';

const Sidebar = (props)=>{

    const {notes, selectedNoteIndex} = props;

    const [state, setState] = useState({
        addingNote: false,
        title: null
    })

    const handleCreateNote=()=>{
        console.log('new create');
        setState({...state, addingNote: !state.addingNote});
    }

    const handleCreateNoteSubmit=()=>{
        console.log(state);
       
    }

    const selectNote=()=>{
        props.selectNote(note, index);
    }

    const deleteNote=()=>{
        console.log('select note');
    }


    return (
        <div>
            <button onClick={handleCreateNote}>{state.addingNote? "Cancel":"New Note"}</button>

            {
                state.addingNote &&  
                <div>
                    <input type="text" placeholder="Enter note title" onChange = {(e)=> {setState({...state, title: e.target.value})}}/>
                    <button onClick={handleCreateNoteSubmit}>Submit Note</button>
                </div>
            }

           
                {notes?
                     <ol>{
                    notes.map((_note, _index)=>{
                        return (
                            <li key={_index}>
                                <SidebarItem _note={_note} _index={_index} selectedNoteIndex={selectedNoteIndex} selectNote={selectNote} deleteNote={deleteNote}/>
                                <hr/>
                            </li>
                        )
                    })}
                     </ol>
                    :
                    <div>Add a note!</div>
                }


        </div>
    )

}

export default Sidebar;