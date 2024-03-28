import { PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig={
    timeout: 60000,    //global timeout for alll test to finish
    retries: 0,       //how many times we want to rerun failed tests
    use: {
        //browser specific options
        headless: true, //it'll run outomatically in headless mode
        viewport: {width: 1280, height:720,}, //size of the browser
        actionTimeout: 15000, //timeout for all actions such as click
        ignoreHTTPSErrors:true,
        video:'off',
        screenshot: 'on'
    },
    projects:[
        {
            name:'Chromium',
            use:{browserName:'chromium'},
        },
        {
            name:'Firefox',
            use:{browserName:'firefox'},
        },
    ],
}

export default config