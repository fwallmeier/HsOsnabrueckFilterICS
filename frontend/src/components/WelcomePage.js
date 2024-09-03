import React from 'react';
import {Link} from "react-router-dom";
import './Welcome.css'; // Die CSS-Datei für das Styling

function Welcome() {
    return (
        <>
        <div className="welcome-container">
            <h1>Welcome to the ICS File Filter Tool</h1>
            <p>Effortlessly Filter and Download Your Calendar Events.</p>
            <p>You can use for example: https://sked.lin.hs-osnabrueck.de/sked/jg/22SPS.ics</p>
            <Link className="get-started-btn" to="/filter">Get Started</Link>
            <br/>
            <br/>
            <p>Disclaimer: The information provided by this tool is for informational purposes only and does not guarantee accuracy or completeness.
                This tool is not provided, endorsed, or affiliated with HS-Osnabrück. Users should verify the information independently.</p>
        </div>
        </>
    );
}

export default Welcome;