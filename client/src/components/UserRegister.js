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
const checkPasswords = () => {
    const { password, password2 } = data;
    if (password === password2) {
        let tmp = { ...errors };
        delete tmp["password2"]
        setErrors(tmp);
        return true;
    } else {
        setErrors({
            ...errors,
            password2: "Las passwords no coinciden"
        });
        return false;
    }
}

const registerUser = (e) => {
    e.preventDefault();
    if (!checkPasswords())
    return
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
        <div className="conatiner border border-black border-3 m-3">
            <h1 className='text-center border border-black border-3 p-3 bg-dark-subtle'>Register</h1>
            <form className="container text-center" onSubmit={ registerUser }>
                <div className="input-group mb-3 d-flex flex-column align-content-center">
                    <div className="m-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label  className="col-form-label">User Name</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" name='userName' value={data["userName"]} onChange={ changeHandler } className="form-control border border-black" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                        <div className="form-text text-danger fw-bold">{errors["userName"]}</div>
                    </div>
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
                    <div className="m-3 row g-3 align-items-center">
                        <div className="col-auto">
                            <label  className="col-form-label">Confirm Password</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" name='password2' value={data["password2"]} onChange={  changeHandler } className="form-control border border-black" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                        <div className="form-text text-danger fw-bold">{errors["password2"]}</div>
                    </div>
                    <button type="submit" className="btn btn-info rounded border-3 border-dark">register</button>
                </div>
            </form>
        </div>
    )
}

export default UserRegister