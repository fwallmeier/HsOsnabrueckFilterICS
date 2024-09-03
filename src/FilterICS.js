import { useState, useEffect } from 'react';
import axios from 'axios';
import ical from 'ical.js';
import { useLocation } from 'react-router-dom';

function FilterICS() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const filter = queryParams.get('filter');
    const icsUrl = queryParams.get('icsUrl');

    let filterData = {};
    if (filter) {
        try {
            filterData = JSON.parse(decodeURIComponent(filter));
        } catch (e) {
            console.error('Invalid JSON payload:', e);
        }
    }

    const [filteredICS, setFilteredICS] = useState(null);

    const downloadICSFile = async () => {
        try {
            const proxyURL = `https://corsproxy.io/?${icsUrl}`; // Ensure this URL is correctly set for your case
            const response = await axios.get(proxyURL);
            const icsData = response.data;

            const jcalData = ical.parse(icsData);
            const comp = new ical.Component(jcalData);
            const events = comp.getAllSubcomponents('vevent');

            const filteredEvents = events.filter(event => {
                const summary = event.getFirstPropertyValue('summary');
                return filterData['events'] && filterData['events'].includes(summary);
            });

            const newComp = new ical.Component(['vcalendar', [], []]);
            filteredEvents.forEach(event => newComp.addSubcomponent(event));

            const newICSData = newComp.toString();
            setFilteredICS(newICSData);
        } catch (error) {
            console.error('Error fetching ICS file:', error);
        }
    };

    useEffect(() => {
        downloadICSFile();
    }, [icsUrl, filter]);

    useEffect(() => {
        if (filteredICS) {
            // Create a Blob URL for the ICS data
            const file = new Blob([filteredICS], { type: 'text/calendar;charset=utf-8' });
            const fileURL = URL.createObjectURL(file);

            // Redirect to the Blob URL
            window.location.href = fileURL;
        }
    }, [filteredICS]);

    return <p>Processing...</p>;
}

export default FilterICS;
