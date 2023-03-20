const features = {
    featureOne: true,
    featureTwo: false,
} as const;

export function isFeatureEnabled(
    featureName: keyof typeof features,
    overrides: Partial<Record<keyof typeof features, boolean>>
) {
    return overrides[featureName] ?? features[featureName] ?? false;
}

isFeatureEnabled('featureOne', { featureOne: false });
isFeatureEnabled('featureOne', { featureTwo: true });
isFeatureEnabled('featureOne', { featureOne: false, featureTwo: true });

import express from 'express';

const app = express();

app.get('/', (req, res) => {
    const toggleOverrides = calculateToggleOverrides(req.query);
});

function calculateToggleOverrides(query: express.Request['query']) {
    return {};
}
