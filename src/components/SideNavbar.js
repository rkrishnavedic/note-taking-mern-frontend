import React from 'react';
import './SideNavbar.css';
import {faAngleDown, faInfo, faPlus, faSearch, faStar, faStickyNote, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { auth } from '../server/firebase';


function Sidenavbar(props){

    const {handleLogout} = props;

    const handleCreateNote=(event)=>{
        console.log(event.target.className);
    }


    return (
        <div className="sidenavbar">
            <div className="sidenavbar-top">

                <div className="sidenavbar-top-profile">
                    <div className="profile-icon">
                        {auth.currentUser.displayName[0].toUpperCase()}
                    </div>
                    <div onClick={handleLogout} className="profile-title">
                        {auth.currentUser.displayName}
                        <FontAwesomeIcon className="icon" icon={faAngleDown}/>
                    </div>
                </div>

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
                        <li >
                            <NavLink to="/dumm1">
                                <FontAwesomeIcon  className="icon" icon={faStar}/>
                                Dummy
                            </NavLink>
                        </li>
                        
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