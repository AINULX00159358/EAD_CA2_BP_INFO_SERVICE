const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        supportFile: false,
        logger: {
            console: {
                level: 'debug'
            }
        },
        video: false,
        reporter: "mochawesome",
        reporterOptions: {
            "reportDir": "cypress/results",
            "overwrite": true,
            "html": true,
            "json": false
        }
    },
})

