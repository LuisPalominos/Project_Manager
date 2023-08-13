import React from 'react'
import axios from 'axios';
import { baseURL } from '../config';

const DeleteButton = (props) => {
// ---------------------------------------------
// I) VARIABLES & HOOKS
// ---------------------------------------------

const { project,removeFromDom } = props;
// ---------------------------------------------
// II) HANDLERS & AUX FUNCTIONS
// ---------------------------------------------
const handleOnClick = (e) => {

    if (project) {
        deleteProject(project._id);
    }
};

const deleteProject = (id) => {
    axios.delete(`${baseURL}/api/projects/${id}`, {withCredentials: true})
        .then((response)=>{
            if(project){
                removeFromDom(id);
            }   
        })
        .catch((error) => {
                console.error(error);
            });
}


// ---------------------------------------------
// III) JSX
// ---------------------------------------------
    return (
        <div className="d-flex align-content-center justify-content-center flex-wrap">
            <button type="button" className="mx-1 btn btn-danger btn-sm py-0" onClick={(e)=>{handleOnClick()}}>Remove project</button>
        </div>
    )
}

export default DeleteButton