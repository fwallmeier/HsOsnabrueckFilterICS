// server.js
const express = require('express');
const axios = require('axios');
const ical = require('ical.js');

const app = express();

app.get('/filtered-calendar.ics', async (req, res) => {
    const { icsUrl, filter } = req.query;

    try {
        // ICS-Datei vom angegebenen URL herunterladen
        const response = await axios.get(icsUrl);
        const icsData = response.data;

        // ICS-Daten parsen und filtern
        const jcalData = ical.parse(icsData);
        const comp = new ical.Component(jcalData);
        const events = comp.getAllSubcomponents('vevent');

        let filterData = {};
        if (filter) {
            filterData = JSON.parse(decodeURIComponent(filter));
        }

        const filteredEvents = events.filter(event => {
            const summary = event.getFirstPropertyValue('summary');
            return filterData['events'] && filterData['events'].includes(summary);
        });

        const newComp = new ical.Component(['vcalendar', [], []]);
        filteredEvents.forEach(event => newComp.addSubcomponent(event));
        const newICSData = newComp.toString();

        // Setzt den Content-Type auf text/calendar, um die Datei als ICS-Datei bereitzustellen
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        res.send(newICSData);

    } catch (error) {
        console.error('Error processing ICS file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
