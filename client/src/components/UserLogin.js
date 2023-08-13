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
    axios.post(`${baseURL}/api/users/login`,data,{withCredentials: true})
        .then((response) => {
            setData({});
            setErrors({});
            props.setUser(response.data.user);
            navigate("/");
        })
        .catch((error) => {
            console.error(error);
            setErrors(error.response.data.error);
            console.log(error.response.data.error);
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
        <div className="conatiner border border-black border-3 m-3">
            <h1 className='text-center border border-black border-3 p-3 bg-dark-subtle'>Login</h1>
            <form className="container text-center" onSubmit={ loginUser }>
                <div className="input-group mb-3 d-flex flex-column align-content-center">
                    <div className="m-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label  className="col-form-label">Email</label>
                        </div>
                        <div className="col-auto">
                            <input type="email" name='email' value={data["email"]} onChange={  changeHandler } className="form-control border border-black" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                        <div className="form-text text-danger fw-bold">{errors["email"]}</div>
                    </div>
                    <div className="m-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label  className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                        <input type="password" name='password' value={data["password"]} onChange={  changeHandler } className="form-control border border-black" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                        <div className="form-text text-danger fw-bold">{errors["password"]}</div>
                    </div>
                    <button type="submit" className="btn btn-info my-3 rounded border-3 border-dark">login</button>
                </div>
            </form>
        </div>
    )
}

export default UserLogin


// cuando se trato de usar validaores en el login se cae el servidor y hay que hacer nodemon nuevamente