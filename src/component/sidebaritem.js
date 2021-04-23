import React from 'react';
import { removeHTMLTags } from '../utils/utils';

const SidebarItem=(props)=>{

    const {_index, _note, selectedNoteIndex} = props;

    const selectNote=(__note, __index)=>{
        props.selectNote(__note, __index);
    }

    const deleteNote=(note)=>{
        // if(window.confirm(`Are you sure you want to delet: ${note.title}`)){
        //     props.deleteNote(note);
        // }
        props.deleteNote(note);
    }

    return (
        <div key = {_index}>
            <div className="list">

                <div className="select Note" onClick={selectNote(_note, _index)}>
                    {_note.title}
                    {removeHTMLTags(_note.body.substring(0, 30))+'...'}
                </div>
                <button onClick={deleteNote(_note)}>Delete</button>
            </div>
        </div>
    )
}

export default SidebarItem;