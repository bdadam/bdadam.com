---
date: 2020-05-05
title: Quick "mailto:" URL parameter reference with full HTML and JSX examples
description: Overview - "mailto:" links are simple, effective and valuable tools on the Web.
tags:
  - mailto
  - quick tip
  - email

abstract: |
  The good old `mailto:` links are still an integral part of the Web. They still provide great value for little investment.
  This article wants to be a quick summary of all the available parameters. We also have examples for HTML pages and JSX components.
---

## Table of contents

## What are `mailto:` links URLs

If we want to provide users with an easy way to send some content over e-mail one of the simplest solutions is to add a `mailto:` link to a website.
When a user clicks on such a link it will bring them to their default mail client - whatever they configured on their device (Gmail, Outlook, Thunderbird, etc.).

We can also prefill some of the values to save some time for our users. Here is the list of those parameters. Every parameter value must be URL encoded. In JavaScript we can use `encodeURIComponent` for this.

- `to`: The recepient
- `subject`: The mail subject
- `body`: The e-mail body text. We can only use plain text here, HTML tags will not work.
- `cc`: Other recepients (carbon copy), a comma separated list
- `bcc`: Like `cc` above but recepients are hidden from each other
- The parameters have to be separated by an `&` character, like in any usual URL. These URLs are still plain old URLs which only have a `mailto:` protocol and some paramters.

## Full example

```html
<a
  href="mailto:?to=jane%40example.com%2Ccustomercare%40example.com&cc=john%40example.com&bcc=info%40example.com&subject=Hello%20world!&body=This%20is%20an%20example%0Awith%20linebreaks!%0A%0Aand%20some%20funny%20letters%3A%20%C3%81%C3%89%C5%90%C3%9A%C3%9A"
  >jane@example.com</a
>
```

This is what it looks like <a href="mailto:?to=jane%40example.com%2Ccustomercare%40example.com&cc=john%40example.com&bcc=info%40example.com&subject=Hello%20world!&body=This%20is%20an%20example%0Awith%20linebreaks!%0A%0Aand%20some%20funny%20letters%3A%20%C3%81%C3%89%C5%90%C3%9A%C3%9A" target="_blank">jane@example.com</a>

## For React and other JSX users

Here is a React component which generates such `mailto:` links.

```tsx title="components/Mailto.jsx"
type MailtoProps = Partial<{
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
}>;

function MailtoLink({ to, cc, bcc, subject, body }: Props) {
  const encoded = {
    to: encodeURIComponent(to ?? ''),
    cc: encodeURIComponent(cc ?? ''),
    bcc: encodeURIComponent(bcc ?? ''),
    body: encodeURIComponent(body ?? ''),
    subject: encodeURIComponent(subject ?? ''),
  };

  return (
    <a
      href={`mailto:?to=${encoded.to}&cc=${encoded.cc}&bcc=${encoded.bcc}&subject=${encoded.subject}&body=${encoded.body}`}
    >
      Send an email to: {to}
    </a>
  );
}
```

## Where are my spaces and new lines?

We can use any character in the parameters but they have to be URL encoded. Please note that only the `body` parameter should have new-line characters - for other parameters it would not make any sense.

| Character  | Encoded value |
| ---------- | ------------: |
| `&`        |         `%26` |
| `@`        |         `%40` |
| `#`        |         `%23` |
| (space)    |         `%20` |
| (new line) |         `%0A` |
| `á`        |      `%C3%A1` |
| `ä`        |      `%C3%A4` |
| `é`        |      `%C3%A9` |
| `ö`        |      `%C3%B6` |
| `ő`        |      `%C5%91` |
| `ü`        |      `%C3%BC` |
| `ű`        |      `%C5%B1` |

## Do we still use `mailto:` links in 2020?

Yes, maybe more than ever. Here are the pros and cons for using mailto links.

Pros
: The e-mail is sent by the user's email client.
: The recepient is more likely to recognize the sender than a random website.
: Less chance for spam issues, each e-mail is sent by a person.
: No third party tools or code needed.
: Works without JavaScript.
: No privacy concerns.
: Better privacy. No chance for tracking (we can still put UTM params and stuff into links in body text).

Cons
: The user needs to send the e-mail. What if they don't want to expose their e-mail address?
: We have no control over how the e-mail looks. Users will most likely edit the e-mail before sending.
: We cannot know for sure to whom and if the e-mail was sent.
: We cannot know if the e-mail was received.
: Crawlers can harvest e-mail addresses if `cc` or `bcc` parameters are present.
