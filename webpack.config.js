///////////////////////////////////
// Imports
///////////////////////////////////
const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


///////////////////////////////////
// Initial setup
///////////////////////////////////
const config = {};
const thisPath = __dirname;


///////////////////////////////////
// Target
///////////////////////////////////
config.target = "web";


///////////////////////////////////
// Resolution
///////////////////////////////////
config.resolve = {};
config.resolve.extensions = [
    ".js",
    ".es6"
];


///////////////////////////////////
// Entries
///////////////////////////////////
config.entry = {};
config.entry["cooky"] = path.resolve(thisPath, "src/cooky.js");


///////////////////////////////////
// Output
///////////////////////////////////
config.output = {
    path: path.resolve(thisPath, "dist"),
    filename: "cooky.js"
};


///////////////////////////////////
// Modules
///////////////////////////////////
const extensions = config.resolve.extensions;
const extensionsRegexPart = extensions
.map(e => e.replace(".", "\."))
.join("|");

config.module = {};
config.module.rules = [];
config.module.rules.push({
    test: new RegExp(`(${extensionsRegexPart})$`),
    exclude: /(node_modules|bower_components)/g,
    use: [
        "babel-loader"
    ]
});


///////////////////////////////////
// Plugins
///////////////////////////////////
config.plugins = [];
config.plugins.push(new UglifyJsPlugin({
    sourceMap: false
}));


///////////////////////////////////
// Export
///////////////////////////////////
module.exports = config;