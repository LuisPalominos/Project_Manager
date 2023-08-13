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
        <div className='container'>
            <h1 className='text-center'>Project Manager</h1>
            <div className='d-flex justify-content-end me-5 pe-5'>
                <Link
                    className="mx-1 my-3 btn btn-link btn-sm py-0"
                    to={`/`}
                >
                    back To Dashboard
                </Link>
            </div>
                <form className="container border border-black border-3 text-center" onSubmit={ handleSubmit }>
                    <div className="input-group mb-3 d-flex flex-column align-content-center">
                        <div className="m-3 row g-3 align-items-center">
                            <div className="col-auto">
                                <label  className="col-form-label">Project</label>
                            </div>
                            <div className="col-auto">
                                <input type="text" name='title' value={title} onChange={  (e) => setTitle(e.target.value) } className="form-control border border-black" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                            </div>
                            {_.has(errorMessages, "title") && (
                            <div className="text-danger small">{errorMessages.title}</div>)}
                        </div>
                        <div className="m-3 row g-3 align-items-center">
                            <div className="col-auto">
                                <label  className="col-form-label">Date</label>
                            </div>
                            <div className="col-auto">
                        <input type="text" name='date' placeholder='YY/MM/DD' value={date} onChange={  (e) => setDate(e.target.value) } className="form-control border border-black" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                            </div>
                            {_.has(errorMessages, "date") && (
                            <div className="text-danger small">{errorMessages.date}</div>)}
                        </div>
                        <button type="submit" className="btn btn-info rounded border-3 border-dark my-3">Plan Project</button>
                    </div>
                </form>
        </div>
    )
}

export default ProjectForm