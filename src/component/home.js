import React from 'react';
import { useState } from 'react/cjs/react.development';
import debounce, { removeHTMLTags } from '../utils/utils';
import useFirestore from './DB';
import '../App.css';
import { auth, firestore, timestamp } from '../server/firebase';
import dropDownIcon from '../assets/expand-button.svg';
import ReactQuill from 'react-quill';

const Navbar=(props)=>{

    const [selectedNote, setSelectedNote] = useState();
    const [dropDown, setDropDown] = useState(false);

    const {notes} = useFirestore('notes');

    const handleNewNote=()=>{
        firestore.collection(`users/${auth.currentUser.uid}/notes`)
                .add({
                    'title': 'Untitled',
                    'body': '',
                    'updatedAt': timestamp(),
                })
    }

    const handleDropDown=()=>{
        setDropDown(!dropDown);
    }

    const handleDelete=(noteId)=>{
            setSelectedNote(null);
        
        firestore.collection(`users/${auth.currentUser.uid}/notes`)
                .doc(noteId)
                .delete()
                .then(()=>{
                    console.log('delete success!')
                })
    }

    const updateBody = (value)=>{

        setSelectedNote({...selectedNote, body: value})

        firestore.collection(`users/${auth.currentUser.uid}/notes`)
                    .doc(selectedNote.id)
                    .set({body: selectedNote.body},{merge: true})
                    

    }


    return(
        <>
        <div className="sidebar">
            <div className="logo">flash-note</div>
            <hr/>
            <div className="d-flex justify-content-between">
                <div className="avatar-text">y</div>
                <div className="user">{auth.currentUser.displayName}</div>
                <div> <img onClick={handleDropDown} alt='options' className="dropdown" src={dropDownIcon}/> </div>
            </div>
            <div className="d-flex justify-content-between">
                <div></div>
                <div></div>
            {dropDown && <div style={{textAlign:'center', fontSize:'11px'}} className="btn m-1 btn-outline-danger" onClick={props.handleLogout}>Logout</div>}
            </div>
            
            <hr/>
                <div onClick={handleNewNote} className="bg-success rounded-pill m-2 text-white" style={{textAlign:'center'}}>
                    Add New Note
                </div>
            
            <div style={{textAlign:'center'}}>All your notes are here</div>
            <hr/>
            {notes? 
            notes.map((_note)=>{
                const _datetime = new Date(_note.updatedAt?.seconds*1000);
                return(
                    <>
                    <div className={(selectedNote && selectedNote.id === _note.id)? "navitem-selected":"navitem"} onClick={()=>{setSelectedNote(_note)}} key={_note.id}>
                        <div className="d-flex justify-content-between notetitle">{_note.title} 
                            <div className="text-primary">edit</div>
                            <div onClick={()=>handleDelete(_note.id)} className="text-danger font-weight-bold"> X </div>
                        </div>
                        <div className="notedesc">{removeHTMLTags(_note.body).substring(0,25)+'...'}
                        <br/>
                        <span className="text-primary">last update: { _datetime.getHours()+':'+ _datetime.getMinutes()+ '\xa0\xa0\xa0' + _datetime.getDate() +'-'+_datetime.getMonth()+'-'+_datetime.getFullYear()}</span>
                        </div>
                        
                    </div>
                    </>
                )
            })
            :
            <div>
                Nothing to display!
            </div>
                }
        </div>
        {selectedNote && <div className="editor">
                                {selectedNote &&
                                <ReactQuill
                                className="ql-editor"
                                value={selectedNote.body}
                                onChange={debounce(updateBody,1500)}
                                />
                                
                                }
                            </div>}
        </>
    )

}

export default Navbar;