---
date: 2023-03-25
title: Quick "mailto:" parameter reference
description: Overview - "mailto:" links are simple, effective and valuable tools on the Web.
tags:
  - mailto
  - quick tip
  - email

abstract: |
  The good old `mailto:` links are still an integral part of the Web. Mailto links provide great value for little investment.
  Let's see how to construct mailto links in plain HTML and in JSX.
published: false
---

## Table of contents

## What are `mailto:` links

A `mailto:` link is a type of hyperlink that, when clicked, opens the default email client of the user's device and creates a new email with some of the fields pre-filled, e.g. recipient, subject line, and some pre-written body text. It's a handy way for website visitors to quickly get in touch with the website owner or admin.

A `mailto:` link can also be used to enable sharing functionality. For example, if you're on a website and you see an article or product that you'd like to share with a friend via email, you can click on a mailto: link that's been set up to automatically populate the email subject line and body text with information about the article or product. This can make it easier for you to share content with others, without having to manually copy and paste information into your email.

In its simples form a `mailto:` link only includes the recepient's e-mail address.

```html
<a href="mailto:info@example.com">Contact us</a>
```

But we can pre-fill much more: multiple recepients, css, bcc, the mail subject and even the mail body.

Here is the list of parameters that can be pre-filled. Every parameter value must be URL encoded. In JavaScript we can use `encodeURIComponent` for this. The parameters are separated by an `&` character, like in any usual URL. These are still just URLs after all - only the protocol is `mailto:` instead of e.g. `https:`.

| Field     | Description                                                                               |
| --------- | ----------------------------------------------------------------------------------------- |
| `to`      | The recepient(s), a comma separated list.                                                 |
| `cc`      | Comma separated list of other recepients. (Carbon Copy)                                   |
| `bcc`     | Like CC but without revealing the recepient identities to each other. (Blind Carbon Copy) |
| `subject` | The subject line                                                                          |
| `body`    | The e-mail body text. We can only use plain text here, HTML tags will not work.           |

```html
<a href="mailto:?to=&cc=&bcc=&subject=&body=">Send e-mail</a>
```

## Full example

```html
<a
  href="mailto:?to=jane%40example.com%2Ccustomercare%40example.com&cc=john%40example.com&bcc=info%40example.com&subject=Hello%20world!&body=This%20is%20an%20example%0Awith%20linebreaks!%0A%0Aand%20some%20funny%20letters%3A%20%C3%81%C3%89%C5%90%C3%9A%C3%9A"
  >jane@example.com</a
>
```

This is what it looks like [jane@example.com](mailto:jane1%40example.com%2Cqwe2@gmail.com?to=jane%40example.com%2Ccustomercare%40example.com&cc=john%40example.com&bcc=info%40example.com&subject=Hello%20world!&body=This%20is%20an%20example%0Awith%20linebreaks!%0A%0Aand%20some%20funny%20letters%3A%20%C3%81%C3%89%C5%90%C3%9A%C3%9A).

## For React users

Here is a React component which generates such `mailto:` links.

```tsx title="MailtoLink.jsx"
type MailtoProps = Omit<React.HTMLProps<HTMLAnchorElement>, 'href'> &
  Partial<{
    to: string | string[];
    cc: string | string[];
    bcc: string | string[];
    subject: string;
    body: string;
  }>;

function MailtoLink(props: MailtoProps) {
  const { to, cc, bcc, subject, body, children, ...linkProps } = props;
  const url = new URL('mailto:');

  const fields = ['to', 'cc', 'bcc', 'subject', 'body'];

  for (const field of fields) {
    if (!(field in props)) {
      continue;
    }

    urlSearchParams.append(field, props[field]);
  }

  // for (const field of ['to', 'cc', 'bcc', 'subject', 'body']) {
  //   const value =
  //     ['to', 'cc', 'bcc'].includes(field) && Array.isArray(props.field)
  //       ? props[field].join(',')
  //       : props[field];

  //   if (value) {
  //     url.searchParams.append(
  //       field,
  //       Array.isArray(value) ? value.join(',') : value
  //     );
  //   }
  // }

  // if (to) {
  //   url.searchParams.append('to', Array.isArray(to) ? to.join(',') : to);
  // }

  // if (cc) {
  //   url.searchParams.append('cc', Array.isArray(cc) ? cc.join(',') : cc);
  // }

  // if (bcc) {
  //   url.searchParams.append('bcc', Array.isArray(bcc) ? bcc.join(',') : bcc);
  // }

  // if (subject) {
  //   url.searchParams.append('subject', subject);
  // }

  // if (body) {
  //   url.searchParams.append('body', body);
  // }

  return (
    <a {...linkProps} href={url.toString()}>
      {children}
    </a>
  );
}
```

## Where are my spaces and new lines?

We can use any character in the parameters but they have to be URL encoded. Please note that only the `body` parameter should have new-line characters - in other parameters there is no-use for line breaks.

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

## Do we still use `mailto:` links in 2023?

Yes, maybe more than ever. Here are the pros and cons for using mailto links.

**Pros**

- The e-mail is sent by the user's email client.
- The recepient is more likely to recognize the sender than a random website.
- Less chance for spam issues, each e-mail is sent by a person.
- No third party tools or code needed.
- Works without JavaScript.
- No privacy concerns.
- Better privacy. No chance for tracking (we can still put UTM params and stuff into links in body text).

**Cons**

- The user needs to send the e-mail. What if they don't want to expose their e-mail address?
- We have no control over how the e-mail looks. Users will most likely edit the e-mail before sending.
- We cannot know for sure to whom and if the e-mail was sent.
- We cannot know if the e-mail was received.
- Crawlers can harvest e-mail addresses if `cc` or `bcc` parameters are present.
