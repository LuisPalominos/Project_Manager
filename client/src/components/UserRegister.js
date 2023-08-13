import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";



const UserRegister = () => {
// ---------------------------------------------
// I) VARIABLES & HOOKS
// ---------------------------------------------
const [data, setData] = useState({});
const navigate = useNavigate();
const [errors, setErrors] = useState({});


// ---------------------------------------------
// II) HANDLERS & AUX FUNCTIONS
// ---------------------------------------------
const registerUser = (e) => {
    e.preventDefault();
    axios.post(`${baseURL}/api/users/register`,data,{withCredentials: true})
        .then((response) => {
            setData({});
            setErrors({});
            navigate("/");
        })
        .catch((error) => {
            console.error(error);
            setErrors(error.response.data.error)
        })
}

const changeHandler = (e) => {
    let new_data = {
        ...data,
        [e.target.name]: e.target.value
    };
    setData(new_data)
}

// ---------------------------------------------
// III) JSX
// ---------------------------------------------
    return (
        <div className="conatiner border m-3">
            <h1 className='text-center border p-3 bg-dark-subtle'>Register</h1>
            <form className="container text-center" onSubmit={ registerUser }>
                <div className="input-group mb-3 d-flex flex-column align-content-center">
                    <div className="m-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">User Name</span>
                        <input type="text" name='userName' value={data["userName"]} onChange={ changeHandler } className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        <div className="form-text text-danger fw-bold">{errors["userName"]}</div>
                    </div>
                    <div className="m-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                        <input type="email" name='email' value={data["email"]} onChange={  changeHandler } className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        <div className="form-text text-danger fw-bold">{errors["email"]}</div>
                    </div>
                    <div className="m-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                        <input type="password" name='password' value={data["password"]} onChange={  changeHandler } className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        <div className="form-text text-danger fw-bold">{errors["password"]}</div>
                    </div>
                    <div className="d-flex justify-content-between m-3">
                        <button type="submit" className="btn btn-primary">register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserRegister