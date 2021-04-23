import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import '../App.css'
import { auth, firestore } from '../server/firebase';

const Notelist = ({collectionName})=>{

    const [notes, setNotes] = useState([]);

    useEffect(()=>{

        firestore.collection(`users/${auth.currentUser.uid}/${collectionName}`)
        .onSnapshot(docRef =>{
            const _notes = docRef.docs.map(_doc=>{
                const data = _doc.data();
                data['id'] = _doc.id;
                return data;
            });
            console.log(_notes);
            setNotes(_notes);
        })

    }, [collectionName])

    return {notes}

}

export default Notelist;