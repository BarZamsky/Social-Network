import React from "react"
import {NavLink} from "react-router-dom";

import '../../../App.css'

const navigationBar = () => (
    <div className="toolbar">
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
            </ul>
        </nav>
    </div>
);


export default navigationBar