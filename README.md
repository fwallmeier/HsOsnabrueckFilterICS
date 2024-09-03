# Filter SemPlan

This repository allows ics files to be filtered. Only the original link of the ICS file is required.
The tool was created for the HS Osnabrück as there is no official tool available

# Usage

The frontend is accessible via https://fwallmeier.github.io/HsOsnabrueckFilterICS/ 

It guides you through the creation of a special URL that contains all the information required for filtering in its parameters
You can also view the current filter. Open-Web-Calender is used for this

The Filtering of the ICS file takes Place a simple node.js server. 

The Node-Js server is provided as a container in the Google Cloud.

# Run the Project Locally

in the folders frontend and NodeServer run "npm install". Afterward you can run "npm start" to Start the front end component and 
"docker build -t nodeJSServer ." to build the dockercontainer

(The url of the used docker container needs to be stored in the frontend)


