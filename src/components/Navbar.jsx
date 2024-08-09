import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <Link to='/home' className="homelink">
                <div className="icon">
                    <h3>ROCK <br />PAPER <br />SCISSORS</h3>
                </div>
            </Link>
        </nav>
    );
}

export default Navbar;