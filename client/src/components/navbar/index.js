import React from 'react'
import './navbar.sass'
import logo from '../../assets/img/logo.svg'
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {logoutUser} from "../../reducers/userReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <img src={logo} alt="Logo tut dolshno bitb "/>
                <div className="navbar__logo__text">
                    <h1>StrikeFile</h1>
                    <p>Best cloud for your files</p>
                </div>
            </div>

            <div className="navbar__buttons">
                {!isAuth && <Link to={"/login"} className="login">Log in</Link>}
                {!isAuth && <Link to={"/register"} className="register">Register</Link>}
                {isAuth && <div onClick={() => dispatch(logoutUser())} className="register">Logout</div>}
            </div>
        </div>
    );
};

export default Navbar;