import React, { useContext, useState } from 'react';
import './SideNavbar.css';
import {faAngleDown, faCodeBranch, faInfo, faPlus, faSearch, faStar, faStickyNote, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { NavLink, useHistory } from 'react-router-dom';
import { auth, firestore, timestamp } from '../server/firebase';
import { NotesContext } from '../context/context';


function Sidenavbar(props){

    const {notesDispatch} = useContext(NotesContext);

    const [dropDown, setDropDown] = useState(false);
    const history = useHistory();

    const {handleLogout} = props;

    const handleCreateNote=async ()=>{
        console.log('create note button');
        const newNote = {title:'Untitled', text:'', updatedAt: timestamp(), isArchive: false}
        const docRef = await firestore.collection(`users/${auth.currentUser.uid}/notes`)
                            .add(newNote);
        console.log(docRef)
        
                    console.log(docRef);
                    console.log(docRef.text);
                    notesDispatch({type:'CREATE_NOTE', payload: {...docRef.data, id: docRef.id}})
                    history.push({
                                    pathname:  `/all-notes/${docRef.id}`,
                                    note: docRef.data                              
                                })
                         
                   
    }

    const handleDropDown=()=>{
        setDropDown(!dropDown);
    }

    const handleLogoutClick=()=>{
        setDropDown(false);
        handleLogout();
    }


    return (
        <div className="sidenavbar">
            <div className="sidenavbar-top">

                <div className="sidenavbar-top-profile">
                    <div className="profile-icon">
                        {auth.currentUser.displayName[0].toUpperCase()}
                    </div>
                    <div className="profile-title">
                        {auth.currentUser.displayName}
                        <FontAwesomeIcon className="icon" onClick={handleDropDown} icon={faAngleDown}/>
                    </div>
                </div>

                {dropDown && <><div className="sidenavbar-top-profile">
                    <div className="dropdown" onClick={handleLogoutClick}>
                        Logout
                    </div>
                    
                    </div>
                    <hr/></>
                    }

                <div className="sidenavbar-top-search">
                    <div className="search-block">
                        <FontAwesomeIcon icon={faSearch}/>
                        <input placeholder="Search"/>
                    </div>
                </div>

                <div className="sidenavbar-top-create">
                    <div className="create-btn" onClick={handleCreateNote}>
                        <FontAwesomeIcon className="icon" icon={faPlus}/>
                        <div className="create-title">
                            New Note
                        </div>
                    </div>
                </div>

                <div className="sidenavbar-top-menu">
                    <ul>
                        <li>
                            <NavLink to="/all-notes">
                                <FontAwesomeIcon  className="icon" icon={faStickyNote}/>
                                All Notes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dumm2">
                                <FontAwesomeIcon  className="icon" icon={faStar}/>
                                Dummy2
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/trash">
                                <FontAwesomeIcon  className="icon" icon={faTrash}/>
                                Trash
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dumm5">
                                <FontAwesomeIcon  className="icon" icon={faStar}/>
                                Dummy5
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="sidenavbar-bottom">
                <div className="need-help">
                    <FontAwesomeIcon className="icon" icon={faInfo}/>
                    Need a little help?
                </div>
            </div>
        
        </div>
    )
}

export default Sidenavbar;