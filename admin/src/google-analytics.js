const { google } = require('googleapis');
const { pick } = require('lodash');

const key = require('../.service-account.json');

const authClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly'],
    null
);

const ga = google.analyticsreporting({
    version: 'v4',
    auth: authClient
});

(async () => {

    const response = await ga.reports.batchGet({
        requestBody: {
            reportRequests: [{
                viewId: '81430219',
                dateRanges: [{
                    startDate: '30daysAgo',
                    endDate: 'yesterday'
                }],
                metrics: [{
                    expression: 'ga:pageviews'
                }],
                dimensionFilterClauses: [{
                    filters: [
                        { dimensionName: 'ga:pagePath', operator: 'BEGINS_WITH', expressions: ['/blog'] }
                    ]
                }],
                dimensions: [
                    { name: 'ga:pagePath' }
                ],
                orderBys: [
                    { fieldName: 'ga:pageviews', "sortOrder": "DESCENDING" }
                ]
            }]
        }
    });

    const pageviews = response.data.reports[0].data.rows.map(row => ({ path: row.dimensions[0], pageviews: row.metrics[0].values[0] }));
    pageviews.length = 5;
    console.log(pageviews);

    // console.log(JSON.stringify(x.data.reports[0].data.rows.map(row => ({ path: row.dimensions[0], pageviews: row.metrics[0].values[0] })), null, 2));

})();