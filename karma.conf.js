// Karma configuration
var _ = require('lodash');
var grunt = require('grunt');

// Require project configuration:
var project = require('./project.conf.js');

module.exports = function (config) {

    var karmaResources = [];

    _.forEach(project.common.resources.vendor.testResources, function (v) {
        karmaResources.push(project.common.build.target + "testResources/" + v);
    });

    _.forEach(project.common.resources.vendor.js, function (v) {
        karmaResources.push(project.common.build.target + 'vendor/' + v);
    });
    _.forEach(project.common.resources.app, function (v) {
        karmaResources.push(project.common.build.target + v);
    });

    //System config addition for the karma urls

    //Adds the TS modules to the karma files, but doesn't load them in the browser
    karmaResources.push({pattern: project.common.build.target + 'app/**/*.js', included: false, watched: false});
    karmaResources.push({pattern: project.common.build.target + 'oblique-reactive/**/*.js', included: false, watched: false});

    karmaResources.push('node_modules/angular-mocks/angular-mocks.js');
    karmaResources.push('test.main.js');

    karmaConfig = {

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: karmaResources,

        // list of files to exclude
        exclude: [
            project.common.build.target + 'app/system.config.dev.js'
        ],

        plugins: [
            'karma-jasmine',
            'karma-coverage',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'junit', 'coverage'],

        junitReporter: {
            outputFile: '../target/surefire-reports/TEST-karma-results.xml'
        },

        coverageReporter: {
            dir: 'target/',
            type: 'lcovonly',
            subdir: '.'
        },

        //preprocessors is defined after config (see bottom of this file)
        preprocessors: {},

        // web server port
        port: 9999,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],

        // How long will Karma wait for a message from a browser before disconnecting from it (in ms).
        browserNoActivityTimeout: 600000,

        retryLimit: 0,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    };
    karmaConfig.preprocessors[project.common.build.target + 'app/**/*.js'] = 'coverage';

    config.set(karmaConfig);
};