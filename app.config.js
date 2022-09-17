require('dotenv').config();

export default () => ({
    expo: {
        name: 'TomoKuru',
        version: '1.0.0',
        extra: {
            fbApiKey: process.env.FB_APIKEY,
            fbAuthDomain: process.env.FB_AUTHDOMAIN,
            fbProjectId: process.env.FB_PROJECTID,
            fbStorageBucket: process.env.FB_STORAGEBUCKET,
            fbMessagingSenderId: process.env.FB_MESSAGINGSENDERID,
            fbAppId: process.env.FB_APPID,
            apiURL: process.env.API_URL,
            eas: {
                projectId: '35240d2f-cc61-42fe-adf4-9d97e41f6557',
            },
        },
        owner: 'team_tomodachi',
        slug: 'tomokuru',
        runtimeVersion: {
            policy: 'sdkVersion',
        },
        updates: {
            url: 'https://u.expo.dev/35240d2f-cc61-42fe-adf4-9d97e41f6557',
        },
    },
});
