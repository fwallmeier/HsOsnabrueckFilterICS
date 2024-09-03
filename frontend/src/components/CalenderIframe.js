import React from 'react';

const CalendarIframe = ({ srcUrl }) => {
    const url = 'https://open-web-calendar.hosted.quelltext.eu/calendar.html?language=de&url=' + encodeURIComponent(srcUrl)
    return (
        <>
        <div>
            {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe id="open-web-calendar"
                    src = {url}
                    sandbox="allow-scripts allow-same-origin allow-top-navigation"
                    height="600px" width="100%"></iframe>
        </div>
        </>)
};

export default CalendarIframe;
