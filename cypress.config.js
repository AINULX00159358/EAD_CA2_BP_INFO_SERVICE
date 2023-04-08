const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        supportFile: false,
        logger: {
            console: {
                level: 'debug'
            }
        },
        reporter: "mochawesome",
        reporterOptions: {
            "reportDir": "cypress/results",
            "overwrite": true,
            "html": false,
            "json": true
        }
    },
})
