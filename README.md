This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment];

### How to Start Application

Client App

   1.) Open file-System folder in VSCode.
   
   2.) Run npm install to install all the dependencies.

   3.) Run client-server - `npm start`.

### Features:

1. The web app mounts to the root route i.e. “/” This would list all subdirectories to root.
2. The app will also display the “current path” in the navbar
3. Double-clicking directory should update the “current path” as well as change the view with all the files & folders present inside this new directory.
4. There will be an Up button which will lead you one step above in the directory structure.
5. On right click of a file/folder, secondary menu popups with 3 options

● Open - navigate into the folder, open info popup

● Get Info - Opens info popup for both file & folder.

● Delete - remove file/folder from the system

6. Each folder would have a Create/Add button, which would trigger a popup to create a new file/folder with associated meta fields - name(with the extension for files), creator, size and date.

7. Search Implementation Added(local Search in the current Directory).

