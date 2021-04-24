import React from 'react';

const Popup=(props)=>{

    console.log(props);

    const handleClose=(e)=>{
        props.setChangeTitle({
        titleChangeId: null,
        titleChangeValue: null,
        })
    }

    const handleSaveChanges=(e)=>{
        console.log('make changes');
        handleClose();
    }

    return(
        <div className="background-centered">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                Jow
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose} data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
            </div>
            </div>
        </div>
       </div>
    )
}

export default Popup;