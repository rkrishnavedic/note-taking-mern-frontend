const NoteReducer = (state, action)=>{
    let draftNotes = [...state];
    switch(action.type){
        case 'GET_ALL_NOTES':
            return action.payload;
        case 'CREATE_NOTE':
            draftNotes.unshift(action.payload);
            return draftNotes;
        case 'UPDATE_NOTE':
            let index = state.findIndex(item=>item.id === action.id);
            draftNotes[index] = {...draftNotes[index], ...action.payload};
            return draftNotes;
        case 'ARCHIVE_NOTE' || 'DELETE_NOTE':
            return draftNotes.filter(item=> item.id!==action.id);
        default:
            return state;
    }
}

export default NoteReducer;