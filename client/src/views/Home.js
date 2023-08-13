import React from 'react'
import UserLogin from '../components/UserLogin'
import UserRegister from '../components/UserRegister'

const Home = (props) => {
// ---------------------------------------------
// I) VARIABLES & HOOKS
// ---------------------------------------------



// ---------------------------------------------
// II) HANDLERS & AUX FUNCTIONS
// ---------------------------------------------



// ---------------------------------------------
// III) JSX
// ---------------------------------------------
    return (
        <div className='container d-flex justify-content-between'>
            <div className='container'>
                <UserRegister/>
            </div>
            <div className='container'>
                <UserLogin setUser={props.setUser} />
            </div>
        </div>
    )
}

export default Home