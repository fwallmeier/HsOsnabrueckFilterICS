import React, { useState } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import ical from 'ical.js';
import './EventFilterPage.css'
import CalenderIframe from "./CalenderIframe";

function EventFilterPage() {
    const [icsLink, setIcsLink] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [filterLink, setFilterLink] = useState('');

    const handleLoadICS = async () => {
        try {
            const proxyURL = `https://corsproxy.io/?${icsLink}`;
            const response = await axios.get(proxyURL).catch((error) => {
                console.error('Error fetching ICS file:', error);
            });
            const icsData = response.data;
            console.log(icsData);

            const jcalData = ical.parse(icsData);
            const comp = new ical.Component(jcalData);
            const events = comp.getAllSubcomponents('vevent');

            // Extract event names and ensure uniqueness
            const eventNames = [...new Set(events.map(event => event.getFirstPropertyValue('summary')))];

            // Sort event names alphabetically
            const sortedEventNames = eventNames.sort((a, b) => a.localeCompare(b));

            // Update the state with the sorted event names
            setEvents(sortedEventNames);
        } catch (error) {
            console.error('Error fetching ICS file:', error);
        }
    };


    const handleCheckboxChange = (eventName) => {
        setSelectedEvents(prev =>
            prev.includes(eventName)
                ? prev.filter(e => e !== eventName)
                : [...prev, eventName]
        );
    };

    const handleGenerateFilterLink = () => {
        const jsonPayload = JSON.stringify({ events: selectedEvents });
        const encodedPayload = encodeURIComponent(jsonPayload);
        const newFilterLink = `https://semesterplan-193309336357.us-central1.run.app/filtered-calendar.ics?filter=${encodedPayload}&icsUrl=${icsLink}`;
        setFilterLink(newFilterLink);
    };

    return (
        <>
        <div className='createFilter'>
            <h1>Filter ICS Events</h1>
            <input
                type="text"
                placeholder="Enter ICS file link"
                value={icsLink}
                onChange={(e) => setIcsLink(e.target.value)}
            />
            <button onClick={handleLoadICS}>Load Events</button>

            <h2>Select Events to Keep</h2>
            <ul>
                {events.map((eventName, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedEvents.includes(eventName)}
                                onChange={() => handleCheckboxChange(eventName)}
                            />
                            {eventName}
                        </label>
                    </li>
                ))}
            </ul>

            <button onClick={handleGenerateFilterLink}>Generate Filter Link</button>

            {filterLink && (
                <div>
                    <h3>Filtered ICS Link</h3>
                    <Link to={filterLink} target="_blank" rel="noopener noreferrer"> Link To ICS file </Link>
                </div>


            )}


        </div>

            {filterLink && (
                <div className='calender'>
                <CalenderIframe srcUrl={filterLink}></CalenderIframe>
                </div>
            )}

        </>

    );
}

export default EventFilterPage;