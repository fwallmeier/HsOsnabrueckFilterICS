// server.js
const express = require('express');
const axios = require('axios');
const ical = require('ical.js');
const crypto = require('crypto');

const app = express();

const cache = {}; // Cache für ICS-Daten
const CACHE_DURATION = 5 * 60 * 1000; // Cache-Dauer in Millisekunden (5 Minuten)

app.get('/filtered-calendar.ics', async (req, res) => {
    const { icsUrl, filter } = req.query;

    // Erzeuge einen eindeutigen Hash für die aktuelle Anfrage basierend auf ICS-URL und Filter
    const cacheKey = crypto.createHash('md5').update(icsUrl + filter).digest('hex');
    const currentTime = Date.now();

    // Überprüfe, ob gecachte Daten vorhanden und gültig sind
    if (cache[cacheKey] && (currentTime - cache[cacheKey].timestamp < CACHE_DURATION)) {
        console.log('Serving from cache');
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        res.send(cache[cacheKey].icsData);
        return;
    }

    try {
        // Überprüfen, ob die Datei gecacht ist und ob seit dem letzten Laden mehr als CACHE_DURATION Zeit vergangen ist
        if (!cache[cacheKey] || (currentTime - cache[cacheKey].lastDownload >= CACHE_DURATION)) {
            // ICS-Datei vom angegebenen URL herunterladen
            const response = await axios.get(icsUrl);
            const icsData = response.data;

            // Lösche alle gecachten Daten, da eine neue ICS-Datei geladen wird
            for (const key in cache) {
                delete cache[key];
            }

            // Aktualisiere den Cache-Eintrag mit den neuen ICS-Daten und dem aktuellen Zeitpunkt
            cache[cacheKey] = {
                icsData: icsData,
                lastDownload: currentTime,
                timestamp: currentTime // Wird für die Gültigkeitsprüfung verwendet
            };
        } else {
            console.log('Using cached file data without re-downloading');
        }

        const icsData = cache[cacheKey].icsData;

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

        // Daten im Cache aktualisieren
        cache[cacheKey].icsData = newICSData;
        cache[cacheKey].timestamp = currentTime;

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
