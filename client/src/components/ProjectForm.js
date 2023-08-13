import React, {useState} from 'react'
import {useNavigate,Link} from "react-router-dom";
import axios from 'axios'
import _ from "lodash";
import { baseURL } from "../config";

const ProjectForm = (props) => {
// ---------------------------------------------
// I) VARIABLES & HOOKS
// ---------------------------------------------
const { formType } = props;
const navigate = useNavigate();
const [title,setTitle]=useState("");
const [date,setDate]=useState("");
const [status,setStatus]=useState("backlog");
const [errorMessages, setErrorMessages] = useState({});
// ---------------------------------------------
// II) HANDLERS & AUX FUNCTIONS
// ---------------------------------------------
const handleSubmit=(e)=>{
    e.preventDefault();
    if (formType === "add") {
        addProject();
    }
}


const addProject=()=>{    
    axios.post(`${baseURL}/api/projects/`,{
        title,
        date,
        status
    }, {withCredentials: true})
        .then((response)=>{
            navigate('/');
        })
        .catch((error) => {
                console.error(error);
                updateErrorMessages(error);
            });
}


const updateErrorMessages = (err) => {
    let errors = err.response.data.error;
    let errorMesagesToUpdate = _.mapValues(errors, (error) => {
        return error;
    });
    setErrorMessages(errorMesagesToUpdate);
};

// ---------------------------------------------
// III) JSX
// ---------------------------------------------
    return (
        <div>
            <h1 className='text-center'>project Manager</h1>
            <Link
                className="mx-1 my-3 btn btn-link btn-sm py-0"
                to={`/`}
            >
                Home
            </Link>
            <form className="container text-center" onSubmit={ handleSubmit }>
                <div className="input-group mb-3 d-flex flex-column align-content-center">
                    <div className="m-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Full Name</span>
                        <input type="text" name='title' value={title} onChange={  (e) => setTitle(e.target.value) } className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        {_.has(errorMessages, "title") && (
                        <div className="text-danger small">{errorMessages.title}</div>)}
                    </div>
                    <div className="m-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Date</span>
                        <input type="text" name='date' value={date} onChange={  (e) => setDate(e.target.value) } className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        {_.has(errorMessages, "date") && (
                        <div className="text-danger small">{errorMessages.date}</div>)}
                    </div>
                    <div className="d-flex justify-content-between m-3">
                        <button type="submit" className="btn btn-primary">Plan Project</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProjectForm