import React from 'react';
import { useState } from 'react/cjs/react.development';
import debounce, { removeHTMLTags } from '../utils/utils';
import useFirestore from './DB';
import '../App.css';
import { auth, firestore, timestamp } from '../server/firebase';
import dropDownIcon from '../assets/expand-button.svg';
import ReactQuill from 'react-quill';

const Navbar=(props)=>{

    const [edit_note, setEdit_note] = useState();
    const [edit_title, setEdit_title] = useState();

    const [selectedNoteId, setselectedNoteId] = useState();
    const [dropDown, setDropDown] = useState(false);
    const [triggerDB, setTriggerDB] = useState(false);

    const {notes} = useFirestore(triggerDB);
   

    const handleNewNote=()=>{
        firestore.collection(`users/${auth.currentUser.uid}/notes`)
                .add({
                    'title': 'Untitled',
                    'body': '',
                    'updatedAt': timestamp(),
                }).then(
                    (docRef)=>{
                        setselectedNoteId(docRef.id)
                        setEdit_note('')
                        setEdit_title('Untitled')
                    }
                )
    }

    const handleDropDown=()=>{
        setDropDown(!dropDown);
    }

    const handleDelete=(noteId, index)=>{
        
        firestore.collection(`users/${auth.currentUser.uid}/notes`)
                .doc(noteId)
                .delete()
                .then(()=>{
                    //console.log('delete success!')
                    if(noteId === selectedNoteId){
                        setselectedNoteId(null);setEdit_note(null);setEdit_title(null);
                        }
                }).catch(err=>{
                    console.log(err);
                })
            
        
    }

    const updateBody = (value, id)=>{
        updatedb('body',value, id);
        setTriggerDB(!triggerDB);
    }

    const updateTitle = (value, id)=>{
        updatedb('title', value, id);
        //console.log('here')
    }

    const updatedb=(field, value, id)=>{
        //console.log('updating db');
        if(field==='title'){
        firestore.collection(`users/${auth.currentUser.uid}/notes`)
                    .doc(id)
                    .set({title: value},{merge: true})
                    
        }
        else{
                firestore.collection(`users/${auth.currentUser.uid}/notes`)
                .doc(id)
                .set({body: value},{merge: true})
                
        }
    }


    return(
        <>
        <div className="sidebar">
            <div className="logo">flash-note</div>
            <hr/>
            <div className="d-flex justify-content-between">
                <div className="avatar-text">{auth.currentUser.displayName[0]}</div>
                <div className="user">{auth.currentUser.displayName}</div>
                <div> <img onClick={handleDropDown} alt='options' className="dropdown" src={dropDownIcon}/> </div>
            </div>
            <div className="d-flex justify-content-between">
                <div></div>
                <div></div>
            {dropDown && <div style={{textAlign:'center', fontSize:'11px'}} className="btn m-1 btn-outline-danger" onClick={props.handleLogout}>Logout</div>}
            </div>
            
            <hr/>
                <div style={{cursor:'default', textAlign:'center'}} onClick={handleNewNote} className="bg-success rounded-pill m-2 text-white">
                    Add New Note
                </div>
            
            <div style={{textAlign:'center'}}>All your notes are here</div>
            <hr/>
            {notes? 
            notes.map((_note, _index)=>{
                const _datetime = new Date(_note.updatedAt?.seconds*1000);
                return(
                    <>
                    <div style={{float:'right', cursor:'default'}} onClick={()=>handleDelete(_note.id, _index)} className="text-danger m-1 font-weight-bold"> X </div>
                    <div style={{cursor:'default'}} className={(selectedNoteId!==null && selectedNoteId === _note.id)? "navitem-selected":"navitem"} onClick={()=>{setselectedNoteId(_note.id); setEdit_note(_note.body);setEdit_title(_note.title);}} key={_note.id}>
                        <div className="d-flex justify-content-between notetitle">{_note.title} 
                            
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
        {notes.map((_note,_index)=>{
                    
                    return( <>
                                <div className="editor">
                                {selectedNoteId===_note.id &&

                                <div className="m-2 p-2">
                                <input style={{textAlign:'left'}} className="m-2 p-2" value={edit_title} onChange={(e)=>{setEdit_title(e.target.value);updateTitle(e.target.value, _note.id);}} />
                                            
                                <ReactQuill
                                key={_index}
                                modules={
                                    {
                                        toolbar:[
                                            [{ 'font': [] }],
                                            [{ header: [1, 2, false] }],
                                            ['bold', 'italic', 'underline','strike'],
                                            [{ 'script': 'sub'}, { 'script': 'super' }],
                                            ['link',{ 'align': [] }],
                                            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                                            
                                            

                                            ['image', 'code-block'],
                                        ]
                                    }
                                }
                                className="p-2"
                                value={edit_note}
                                onChange={(val)=>{setEdit_note(val);debounce(updateBody(val,_note.id),1500);}}
                                />
                                </div>
                                }
                            </div>
                            </>)
                        })
}
        </>
    )

}

export default Navbar;