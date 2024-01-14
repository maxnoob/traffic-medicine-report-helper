# "Living Case 1" Project: Documentation of the physical examination in traffic medicine
This is the repo for the "Living Case 1" project at the Bern University of Applied Sciences.

To run the project in development mode follow the instructions below:
# Project setup
```
npm install
```

# Concerning the Vue.js application

Change into the directory of the vue project itself
```
cd vue-project
```

To compiles and hot-reload the application for development use:
```
npm run serve
```
# Used tools during development

### ESLint for code correction suggestions
```
npm init @eslint/config
```
### Install Bootstrap/DownloadJS/pdf-lib
```
npm install bootstrap 
npm install downloadjs
npm install --save pdf-lib
```
### Code formatting with Prettier
From VS code marketplace get "Prettier - Code formatter".<br>
[pPrettier on vs code marketplace](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).<br>
While programming use keyboard shortcut: <kbd>alt</kbd> + <kbd>shift</kbd> + <kbd>F</kbd> to format the current file with prettier (doesn't change any logic or syntax, just the alignment of the text).


### Finally compile and minify the project for production
```
npm run build
```
To run the application locally go into the vue.config.js file and write:
```
module.exports = {
  publicPath: '',
}
```
Then run the application via /dist/index.html.
For unknown reasons, the spacing between the sections (cards) disappears, when running like that.

