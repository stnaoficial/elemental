const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");
const path = require('path');
const chalk = require('chalk');

function listener(server)
{
    console.clear();
    console.log(chalk.bgHex("#5E5CE6").bold("\n                \n  Elemental.js  \n                \n"));
    console.log(`${ chalk.blueBright(`> Listening `) } ${ chalk.greenBright.underline(`http://localhost:${ server.options.port }`) }\n`);
    console.log(`${ chalk.blueBright(`> Comment `) } ✨ Welcome to Elemental! ✨ 🧑‍💻 👩‍💻\n`);
}

module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-source-map",
    devServer: {
        open: true,
        static: path.join(__dirname, "public"),
        compress: false,
        port: 8000,
        historyApiFallback: true,
        onListening: listener,
    }
})