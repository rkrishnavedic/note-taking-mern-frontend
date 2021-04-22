import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { NotesContext } from '../context/context';
import { auth, firestore } from '../server/firebase';
import './NoteList.css';

function Notelist(props){
    const {title} = props;
    const {notesDispatch} = useContext(NotesContext);
    const history = useHistory();

    const [notes, setNotes] = useState([]);

    const match = useRouteMatch();

    useEffect(()=>{

        // console.log(match.url);
        getNotes();

        if(notes.length > 0){
            notesDispatch({type: 'GET_ALL_NOTES', payload: notes})
            history.push({
                pathname: `${match.url}/${notes[0].id}`,
                note: notes[0]
            })
        }

    }, [match.url])

    const getNotes = async () =>{
        let collectionName = 'notes';
        if(match.url === '/trash'){
            collectionName = 'trash'
        }

        await firestore.collection(`users/${auth.currentUser.uid}/${collectionName}`)
                                .orderBy('updatedAt')
                                .onSnapshot((snap)=>{
                                    let documents = []
                                    snap.forEach((doc)=>{
                                        documents.push({...doc.data(), id: doc.id})
                                    })
                                    //console.log(documents)
                                    setNotes(documents)
                                })

    }

    return (
        <div className="note-list">
            <div className="note-list-head">
                <div className="title">
                    <h1>{title}</h1>
                </div>
                <div className="sub-head">
                    <div className="note-count">
                        You have {notes.length} note(s)
                    </div>
                </div>
            </div>
            <div className="note-list-body">
                {notes.map((value)=>{ 

                    return(
                <NavLink to={
                    {pathname : `${match.url}/${value.id}`,
                    value
                    }
                } className="note-card">
                    <div className="note-card-head">
                        <div className="note-card-title">
                            {value.title}
                        </div>
                        <div className="note-card-desc">
                            {value.text}
                            <div className="note-card-date">
                            {value.updatedAt.seconds}
                        </div>
                        </div>
                        
                    </div>
                </NavLink>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default Notelist;