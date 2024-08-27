import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ical from 'ical.js';
import { useLocation } from 'react-router-dom';

function FilterICS() {
    const location = useLocation();

    // URL-Parameter parsen
    const queryParams = new URLSearchParams(location.search);

    // JSON Payload extrahieren
    const filter = queryParams.get('filter');
    const icsUrl = queryParams.get('icsUrl');

    // JSON Payload parsen (falls vorhanden)
    let filterData = {};
    if (filter) {
        try {
            filterData = JSON.parse(decodeURIComponent(filter));
        } catch (e) {
            console.error('Invalid JSON payload:', e);
        }
    }

    // Debug: Anzeigen des gefilterten Events und der ICS-URL
    console.log('Filter:', filterData['events']);
    console.log('ICS URL:', icsUrl);

    const [filteredICS, setFilteredICS] = useState(null);

    const downloadICSFile = async () => {
        try {
            // Schritt 1: ICS-Datei vom Server herunterladen
            const proxyURL = `https://corsproxy.io/?${icsUrl}`;
            const response = await axios.get(proxyURL);
            const icsData = response.data;

            // Schritt 2: ICS-Datei parsen
            const jcalData = ical.parse(icsData);
            const comp = new ical.Component(jcalData);
            const events = comp.getAllSubcomponents('vevent');

            // Schritt 3: Filter basierend auf dem HTTP Header (hier simuliert)
            const filteredEvents = events.filter(event => {
                const summary = event.getFirstPropertyValue('summary');
                return filterData['events'].includes(summary); // Filterkriterium
            });

            // Schritt 4: Neue ICS-Datei erstellen
            const newComp = new ical.Component(['vcalendar', [], []]);
            for (let i = 0; i < filteredEvents.length; i++) {
                newComp.addSubcomponent(filteredEvents[i]);
            }
            const newICSData = newComp.toString();
            // Gefilterte ICS-Datei setzen
            setFilteredICS(newICSData);
        } catch (error) {
            console.error('Error fetching ICS file:', error);
        }
    };

    useEffect(() => {
        downloadICSFile();
    }, []); // Der leere Abhängigkeits-Array sorgt dafür, dass der Effekt nur einmal beim Laden der Komponente ausgeführt wird

    useEffect(() => {
        if (filteredICS) {
            // Ein unsichtbares <a>-Element erstellen
            const element = document.createElement('a');
            const file = new Blob([filteredICS], { type: 'text/calendar;charset=utf-8' });
            element.href = URL.createObjectURL(file);
            element.download = "filtered_calendar.ics";
            document.body.appendChild(element); // Das <a>-Element anhängen
            element.click(); // Den Download programmatisch anstoßen
            document.body.removeChild(element); // Das <a>-Element entfernen
        }
    }, [filteredICS]);

    return (
        <div>
            {filteredICS && (
                <a
                    href={`data:text/calendar;charset=utf-8,${encodeURIComponent(filteredICS)}`}
                    download="filtered_calendar.ics"
                >
                    Download Filtered ICS File
                </a>
            )}
        </div>
    );
}

export default FilterICS;