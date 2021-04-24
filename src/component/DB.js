import {useState, useEffect} from 'react';
import { auth, firestore } from '../server/firebase';

const useFirestore = (collectionName)=>{
    const [notes, setNotes] = useState([]);


useEffect(()=>{

    firestore.collection(`users/${auth.currentUser.uid}/notes`)
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

return {notes};

}

export default useFirestore;