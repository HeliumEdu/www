---
title: Using the Helium API
description: "Build your own integrations on top of Helium's public REST API — anything you can do in the apps is available via the API too."
category: sync-and-integration
publishedDate: 2026-05-19
updatedDate: 2026-11-11
---

## Overview

Helium exposes a public REST API. Anything you can do in the iOS, Android, or web apps — view classes, add assignments, see grades, edit notes, run a bulk import — is also available via the API. The full schema and authentication reference live in our [API docs](https://api.heliumedu.com/docs/).

Helium doesn't maintain official tooling or pre-built integrations, but the platform is open so you can build your own. Helium is also open source on [GitHub](https://github.com/HeliumEdu) — contributions are welcome, and if you build something with the API and want to share it, [let us know](/support/submit/).

> **Tip:** If you'd rather not write any code, [use AI as a scheduling assistant](/support/getting-started/where-to-start-with-helium/#use-ai-as-a-scheduling-assistant) — connect your AI assistant to Helium and it imports your syllabi for you, or use the prompt there and upload the file it produces.

## Getting Your API Token

To use the API from a script or tool, you need an **API token**, a long-lived key you can copy into your script, save in a password manager, or paste into something like Postman.

  1. Open [**Settings → Security & API**](https://app.heliumedu.com/settings/security).
  2. Under **API Token**, click **Generate**.
  3. Click **Copy**, and save the token somewhere safe.

> **Important:** Your new API token is shown **exactly once**. Copy it the moment you see it. If you lose it, rotate it to get a new one.

Then send the token on every API call:

```sh
curl https://api.heliumedu.com/planner/courses/ \
  -H 'Authorization: Token <API_TOKEN>'
```

For the full authentication reference, see the [API docs](https://api.heliumedu.com/docs/#section/Authentication).

> **Note:** An API token can't change your email or password, delete your account, or manage your API token and connected apps. Do those from **Settings** in the Helium app.

## Rotating or Revoking Your Token

Both are under **Settings → Security & API**, where you can also see when your current token was created.

  * **Rotate** gets a fresh token and invalidates the old one. Do this if you think your token may have leaked, or on a schedule of your own choosing.
  * **Revoke** turns off your current token without replacing it.

Changing or resetting your password also revokes your API token.

> **Note:** Only one API token is active per Helium account at a time. If you have multiple scripts or tools that need access, you can use the same token across all of them (just be sure to update them together when you rotate).

## Connected Apps

Apps you've connected to your Helium account, such as an [AI assistant](/support/getting-started/where-to-start-with-helium/#connect-your-ai-assistant), are listed under **Settings → Security & API → Connected Apps**, with what each can do and when it last connected. Click **Revoke** on an app to cut off its access; you can connect it again later.

## Related Articles

  * [Where to Start with Helium](/support/getting-started/where-to-start-with-helium/)
  * [Importing & Exporting Your Data](/support/import-export-and-backup/importing-and-exporting-your-data/)

---
