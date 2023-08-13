import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

import { baseURL } from "../config";
import DeleteButton from "./DeleteButton";
const ProjectsList = (props) => {
// ---------------------------------------------
// I) VARIABLES & HOOKS
// ---------------------------------------------
const[lista,setLista]=useState([]);
const navigate = useNavigate();

// ---------------------------------------------
// II) HANDLERS & AUX FUNCTIONS
// ---------------------------------------------
useEffect(()=>{
    axios.get(`${baseURL}/api/projects/`, {withCredentials: true})
        .then((response)=>{
            const sortedData = _.orderBy(response.data.data, ['date'], ['asc']);
            setLista(sortedData);
        })
        .catch((error) => {
                console.error(error);
        });
},[]);

const updateProject = (id, newStatus) => {
    axios.patch(`${baseURL}/api/projects/${id}`, {
        status: newStatus,
    }, {withCredentials: true})
        .then((response) => {
            console.log(response.data);
            const updatedLista = lista.map((item) => {
                if (item._id === id) {
                    return {
                        ...item,
                        status: newStatus,
                    };
                }
                return item;
            });
            setLista(updatedLista);
        })
        .catch((error) => {
            console.error(error);
        });
};

const removeFromDom = projectId => {
    setLista(lista.filter(project => project._id !== projectId));
}

const handleClick=()=>{
    navigate('/projects/new');
};

// ---------------------------------------------
// III) JSX
// ---------------------------------------------
    return (
        <div className="container d-flex flex-column">
            <div className=" d-flex">
                <div className="col-4  border">
                    <h1 className="border bg-primary-subtle mb-3 py-3">Backlog</h1>
                    <div className="container h-75 overflow-y-scroll">
                        {lista &&
                            lista.map((item, idx) =>
                                item.status === 'backlog' ? (
                                    <div className="container border my-3 py-3" key={idx}>
                                        <h3>{item.title}</h3>
                                        <p>{new Date(item.date).toLocaleDateString()}</p>
                                        <button
                                            type="button"
                                                className="mx-1 btn btn-outline-primary btn-sm py-0"
                                                onClick={() => updateProject(item._id, 'progress')}
                                        >
                                            start project
                                        </button>
                                    </div>
                                ) : null
                            )}
                    </div>
                </div>
                <div className="col-4 border">
                    <h1 className="border bg-warning-subtle mb-3 py-3">In Progress</h1>
                    <div className="container h-75 overflow-y-scroll">
                        {lista &&
                            lista.map((item, idx) =>
                                item.status === 'progress' ? (
                                    <div className="container border my-3 py-3" key={idx}>
                                        <h3>{item.title}</h3>
                                        <p>{new Date(item.date).toLocaleDateString()}</p>
                                        <button
                                            type="button"
                                            className="mx-1 btn btn-outline-success btn-sm py-0"
                                            onClick={() => updateProject(item._id, 'completed')}
                                        >
                                            move to completed
                                        </button>
                                    </div>
                                ) : null
                            )}
                    </div>
                </div>
                <div className="col-4 border">
                    <h1 className="border bg-success-subtle mb-3 py-3">Completed</h1>
                    <div className="container h-75 overflow-y-scroll">
                        {lista &&
                            lista.map((item, idx) =>
                                item.status === 'completed' ? (
                                    <div className="container border my-3 py-3" key={idx}>
                                        <h3>{item.title}</h3>
                                        <p>{new Date(item.date).toLocaleDateString()}</p>
                                        <DeleteButton removeFromDom={removeFromDom} project={item}/>
                                    </div>
                                ) : null
                            )}
                    </div>
                </div>
            </div>
            <div className='conatiner border d-flex py-3'>
                <button type="button" className="btn btn-info" onClick={handleClick}>Add New Project</button>
            </div>
        </div>
    )
}

export default ProjectsList