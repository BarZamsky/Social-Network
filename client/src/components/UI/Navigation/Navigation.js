import React from "react"
import {NavLink} from "react-router-dom";
import Logo from "../Logo"

import '../../../App.scss'

const navigationBar = () => (
    <div className="toolbar">
        <Logo />
        <nav>
            <ul className="navigation">
                <li className="item">
                    <NavLink
                        to="/home"
                        activeClassName="selectedLink"
                        strict>
                        Home
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        to="/network"
                        activeClassName="selectedLink"
                        strict>
                        My Network
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        to="/me"
                        activeClassName="selectedLink"
                        strict>
                        Me
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink
                        to="/logout"
                        activeClassName="selectedLink"
                        strict>
                        Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
);


export default navigationBar