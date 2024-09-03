import React from 'react';

const DownloadICSButton = () => {
    const handleDownload = () => {
        // ICS-Datei-Inhalt erstellen
        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Company//NONSGML Your Product//EN
BEGIN:VEVENT
UID:uid1@example.com
DTSTAMP:20230827T090000Z
DTSTART:20230827T100000Z
DTEND:20230827T110000Z
SUMMARY:Sample Event
DESCRIPTION:This is a sample event.
END:VEVENT
END:VCALENDAR`;

        // Erstellen eines Blob-Objekts
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);

        // Erstellen eines Anker-Elements und Auslösen des Downloads
        const a = document.createElement('a');
        a.href = url;
        a.download = 'event.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // URL freigeben
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={handleDownload}>
            Download ICS File
        </button>
    );
};

export default DownloadICSButton;
