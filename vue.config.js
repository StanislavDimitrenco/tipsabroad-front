const {resolve} = require("path");

module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
            },
        },
    }

}
