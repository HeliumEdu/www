<p align="center">
  <img src="https://raw.githubusercontent.com/HeliumEdu/www/main/src/assets/img/helium-logo.png" alt="Helium" width="300" />
  <br />
  <img src="https://raw.githubusercontent.com/HeliumEdu/www/main/src/assets/img/og-default.png" alt="Helium - Student Planner" width="800" />
</p>

---

[**Helium**](https://www.heliumedu.com) is a free, color-coded online student planner for classes, homework, grades, and notes — the academic calendar built for the way you actually study.

<p align="center">
  <a href="https://apps.apple.com/us/app/helium-student-planner/id6758323154"><img src="https://raw.githubusercontent.com/HeliumEdu/www/main/src/assets/img/ios-badge.png" alt="Download on the App Store" height="50" /></a>
  &nbsp;
  <a href="https://play.google.com/store/apps/details?id=com.heliumedu.heliumapp"><img src="https://raw.githubusercontent.com/HeliumEdu/www/main/src/assets/img/play-badge.png" alt="Get it on Google Play" height="50" /></a>
</p>

<p align="center">
  <a href="https://www.patreon.com/alexdlaird/membership"><img src="https://raw.githubusercontent.com/HeliumEdu/www/main/public/img/support-patreon.png" alt="Support on Patreon" height="30" /></a>
</p>

---

# Helium Landing Site

[![Build](https://img.shields.io/github/actions/workflow/status/HeliumEdu/www/build.yml)](https://github.com/HeliumEdu/www/actions/workflows/build.yml)
![GitHub License](https://img.shields.io/github/license/heliumedu/www)

The marketing site for Helium - Student Planner, including the [Support Portal](https://www.heliumedu.com/support). Knowledge base articles live as Astro content collection entries in `src/content/support/<category>/<slug>.md`; the "Submit a Ticket" flow at `/support/submit` is an owned form that POSTs to the `platform` API.

## Prerequisites

- Node (>= 24)

## Getting Started

The site is built with [Astro](https://astro.build) on the [AstroWind](https://github.com/onwidget/astrowind) starter.

To install dependencies and start the dev server, execute:

```sh
npm install
npm run dev
```

The dev server is available at http://localhost:4321.

To build a production version of the site, execute:

```sh
npm run build
```

### Deployment

Pushes to `main` will redeploy the marketing site. The site is served from S3 (`heliumedu.www.static`) behind CloudFront. Infrastructure is defined in the [`infra` repo's `global` workspace](https://github.com/HeliumEdu/infra/tree/main/terraform/environments/global).
