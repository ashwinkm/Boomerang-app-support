# Boomerang Project Recovery Guide

This guide explains how to retrieve and export Boomerang projects using the browser's developer tools.


## Steps to Export a Project

1. **Open Developer Console**
   - Open the Boomerang extension or navigate to the PWA app
   - Press `F12` to open Developer Tools
   - Select the "Console" tab

2. **List All Projects**
   - Copy and paste the code from [get-projects.js](./get-projects.js) into the console to see all your projects.

   - This will display a list of all your projects with their corresponding `dbId`s
   - Note down the `dbId` of the project you want to export

3. **Export the Project**
   - Copy and paste the code from [export-project.js](./export-project.js) into the console
   - Replace `ws-your-db-id` with your actual project's `dbId`:
   ```javascript
   exportProject('ws-your-db-id').then(data => {
       console.log('Export completed:', data);
   });
   ```
   - The script will download your project as a JSON file

## Verifying the Export

To verify that the exported JSON file works correctly:

1. Open the Boomerang PWA app (https://boomerangapi.com) in an incognito window
2. Import the downloaded JSON file
3. Verify that your project data appears correctly

## Troubleshooting

If you encounter any issues:
- Make sure you're using the correct `dbId`
- Contact support@boomerangapi.com with the screenshot of the error. We will update the script to handle the error.


