import React from 'react';
import {Link} from "react-router-dom";
import './Welcome.css'; // Die CSS-Datei für das Styling

function Welcome() {
    return (
        <>
        <div className="welcome-container">
            <img src={`${process.env.PUBLIC_URL}/Logo.svg`} alt="Hochschule Osnabrück Logo" className="hs-logo" />
            <h1>Welcome to the ICS File Filter Tool</h1>
            <p>Effortlessly Filter and Download Your Calendar Events.</p>
            <p>You can use for example: https://sked.lin.hs-osnabrueck.de/sked/jg/22SPS.ics</p>
            <Link className="get-started-btn" to="/filter">Get Started</Link>
        </div>
        </>
    );
}

export default Welcome;