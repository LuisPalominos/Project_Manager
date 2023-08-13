import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { baseURL } from "../config";


const UserLogin = (props) => {
// ---------------------------------------------
// I) VARIABLES & HOOKS
// ---------------------------------------------
const [data, setData] = useState({});
const [errors, setErrors] = useState({});
const navigate = useNavigate();


// ---------------------------------------------
// II) HANDLERS & AUX FUNCTIONS
// ---------------------------------------------
const loginUser = (e) => {
    e.preventDefault();
    axios.post(`${baseURL}/api/users/login`,data)
        .then((response) => {
            setData({});
            setErrors({});
            props.setUser(response.data.user);
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
            <h1 className='text-center border p-3 bg-dark-subtle'>Login</h1>
            <form className="container text-center" onSubmit={ loginUser }>
                <div className="input-group mb-3 d-flex flex-column align-content-center">
                    <div className="m-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label  className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input type="email" name='email' value={data["email"]} onChange={  changeHandler } className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                        <div className="form-text text-danger fw-bold">{errors["email"]}</div>
                    </div>
                    <div className="m-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Password</span>
                        <input type="password" name='password' value={data["password"]} onChange={  changeHandler } className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        <div className="form-text text-danger fw-bold">{errors["password"]}</div>
                    </div>
                    <div className="d-flex justify-content-between m-3">
                        <button type="submit" className="btn btn-primary">login</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserLogin