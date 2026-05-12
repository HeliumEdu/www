<p align="center">
  <img src="https://raw.githubusercontent.com/HeliumEdu/www/main/src/assets/img/helium-logo.png" alt="Helium" width="300" />
  <br />
  <img src="https://raw.githubusercontent.com/HeliumEdu/www/main/src/assets/img/og-default.png" alt="Helium - Student Planner" width="800" />
</p>

[![Build](https://img.shields.io/github/actions/workflow/status/HeliumEdu/www/build.yml)](https://github.com/HeliumEdu/www/actions/workflows/build.yml)
![GitHub License](https://img.shields.io/github/license/heliumedu/www)

# Helium Marketing Site

The marketing site for [Helium](https://www.heliumedu.com/).

This repository also mirrors FreshDesk support articles into `support/`. FreshDesk remains the source of truth for the rendered support portal.

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
