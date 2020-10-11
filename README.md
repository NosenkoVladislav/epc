## Back-end

`server` directory

### run `npm install`
to install all dependencies from `package.json`.

### change `config.js`
to set your mongoDB configurations.

### run `node server.js`
Runs JSON-server like a express server. <br />
Open [http://localhost:3000/users](http://localhost:3000/users) to see users data.

## Front-end

`ecp-app` directory:

### run `npm install`
to install all dependencies from `package.json`.

### run `npm start`
to run the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### run `npm run build`

to build the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### run `serve -s build`
to run the built app locally from build.