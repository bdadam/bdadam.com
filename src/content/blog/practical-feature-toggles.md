---
title: Practical Feature Flags (a.k.a. Feature Toggles)
date: 2022-12-02
tags:
  - feature flags
  - architecture
  - pattern

abstract: Using feature flags is a pattern for safely releasing new features to users. This articles show a possible practical implementation of the pattern.
---

!> Hello Warning hello

## Table of contents

<!--
  # Feature Flags Generate:
  - Intro
  - Pseudo code
  - Architecture
  - Assumptions: no complex role/rights management, refreshes not too often, proper caching, data file can be public

  # Feature Flags Data File
  - Github Pages + Editor HTML in repo
  - S3 + Editor Lambda
  - Database + Web service

  # Feature Flags server side: Node.js + TypeScript
  # Feature Flags server side: React + TypeScript

 -->

## What are feature flags?

Using feature flags are a software development technique that allows developers to toggle certain features on or off in their codebase without having to deploy new versions of the application. This allows developers to test and experiment with new features without disrupting the existing functionality of the software.

Feature flags are particularly useful, as they allow developers to easily roll out new features to a small group of users or even to individual users. This allows developers to gather feedback on the new feature and make any necessary changes before rolling it out to the entire user base.

If a new feature turns out to be problematic or causes unexpected issues, developers can quickly disable the feature using the feature flag, preventing it from causing further issues.

In this article the naming "feature flags" and "feature toggles" are used interchangeably.

You can read more about the concept on [Martin Fowler's blog](https://martinfowler.com/articles/feature-toggles.html). Feature toggles are an important companion to [trunk based development](https://trunkbaseddevelopment.com/).

<!-- ## What is a feature toggle?

Feature toggling is a pattern used for safely releasing new features to users.

- When developers start working on a new feature they create a feature toggle and put the code changes (the new feature) behind this toggle.
- With this feature toggle they hide the changes from regular users.
- Therefore developers can often merge their changes safely into the main branch without having to show half-baked feature to the users. With this they also avoid working on long-lived feature branches that could otherwise make merging very hard.
- Any stakeholder interested in the feature (the client, product managers/owners, QA persons, developers, business persons, sales, etc.) can take a look at the feature early on and give feedback or test it out.
- If the feature is ready (to some definition of ready) we can release this feature progressively - let's say to a small percentage of users, or based on some user attribute, such as only for premium users, etc. -->

![Feature Toggle Flow](/feature-toggles/flow.excalidraw.png 'Developing software with feature toggles')

## How to design a feature flagging service

![Feature Flagging Service Architecture](/feature-toggles/feature-flagging-service-modules.excalidraw.png 'Designing a feature flagging service from scratch')

The parts:

- A data file that describes each toggle: name, status (on or off), conditions that need to be met (geolocation, browser version, specific user IDs, user category, other attributes). This can literally be a static file on a webserver, an object in an S3 (compatible) bucket or it can be some recordsin a database of choice.
- An SDK that is responsible for fetching and processing the data file in the application. This SDK is usually implemented in the programming language of the host application. This application can be a traditional server side application, a desktop app, a mobile app or a client side web app.
- A UI that can update the data file. Here is where we can change rollout percentage, add or remove toggles, change rollout conditions.

## The Data File

```ts
type FeatureToggleDescription = {
  descriptions: string;
  enabled: boolean;
  default: boolean;
  rolloutConditions?: [];
  rolloutPercentage?: number;
};
type ToggleDataFile = Record<string, FeatureToggleDescription>;
```

## Feature toggles on the Web

Feature toggles can be used in any software project - in Web apps, Native apps, CLI apps, embedded programs, etc.

Here is a simple example of how they work on the web.

![Feature Toggle Flow](/feature-toggles/web-request.excalidraw.png 'Handling web requests with feature toggles')

```ts
if (isFeatureEnabled()) {
  showNewFeature();
} else {
  showOldFeature();
}
```

## The simplest feature toggling solution

We can declare our features as a part of our codebase. Let's see a possible implementation.

```ts
const features = {
  featureOne: true,
  featureTwo: false,
} as const;

export function isFeatureEnabled(featureName: keyof typeof features) {
  return features[featureName] ?? false;
}
```

## Feature overrides

This is a start. But this is not that useful yet. We would like to release half-baked features to production and only enable it for selected user, such as for our client or for our product manager. They might want to see how the feature behaves with real data.

How can we do that? Here come the overrides into play. Per default we keep the toggles disabled but we provide a way for our clients to enable them.

```ts
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
```

Where do the overrides come from? If we have a web app then we can use query params or cookies. Let's see an example with query params.

In this example we are calling our website like this: `https://example.com/?toggle-featureOne=true&toggle-featureTwo=false`

```ts
import express from 'express';
import { isFeatureEnabled } from './feature-toggles';

const app = express();

app.get('/', (req, res) => {
  const toggleOverrides = calculateToggleOverrides(req.query);
});

function calculateToggleOverrides(query: express.Request['query']) {
  const overrides = {};
  for (const param in query) {
    if (param.startsWith('toggle-')) {
      overrides[param.replace('toggle-', '')] = query[param] === 'true';
    }
  }
  return overrides;
}
```

## Partial rollout - modulo based

## Partial rollout - user attribute based

## Separate data file from application code

No application rollout is needed for changes. Enable or disable

## Edit data file on remote location - UI
