# eReader Complete
 ereader site + server + DB

1. Import Database if not yet done
    a. Assuming connection is already setup
    b. Make a new schema named new_ereader_schema
    c. Go to administrator tab under SCHEMAS
    d. Click Data Import
    e. Select "Import From Dump Project Folder"
    f. click "Load Folder Contents"
    g. Go to Import Progress Tab
    h. Click Start Import

2. Set up server connection
    a. Open app.js
    b. Modify connection details in var con

3. Start server
    a. Open cmd in folder of app.js
    b. type and enter "npm run dev"
    c. leave it open

4. Configure connection settings of pages (assuming they are not properly configured)
    a. Find all "const response" and edit the IP to your local IP, safest is 127.0.0.1 but if that doesn't work edit to your own IPv4 address (Need to add a global IP variable later)

5. Start the site
    a. Open cmd in folder of app.js
    b. type and enter "npm run dev"
    c. Open link given in a chrome based browser (Chrome or Opera, mic functions don't work if not in chrome-based browser)