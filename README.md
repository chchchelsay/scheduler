# Interview Scheduler

# A Lighthouse Labs React project - February 2023.

Interview Scheduler is a single-page application (SPA) that allows users to book technical interviews between students and mentors.

Appointments can be between the hours of **12 PM and 5 PM, Monday to Friday.**

Each appointment has **one student** and **one interviewer**.

When creating a new appointment, the user can enter any student name while the interviewer is chosen from a predefined list.

The user can **save** the appointment and view the entire schedule of appointments on any day of the week.

Appointments can also be **edited or deleted**.

The front end of this project is built with **React** and makes requests to an API to fetch and store appointment data from a database.

We utilised [**Jest**](https://jestjs.io/docs/getting-started), [**Storybook**](https://storybook.js.org/docs/react/get-started/introduction) (front-end UI), [**Cypress**](https://docs.cypress.io/guides/getting-started/installing-cypress) (end-to-end), and the Webpack Development server to learn about different methods of testing features.

## Dependencies

- axios: ^0.20.0
- classnames: ^2.2.6
- cypress: ^9.7.0
- normalize.css: ^8.0.1
- react: ^16.14.0
- react-dom: ^16.9.0
- react-scripts: ^.4.4

## Setup

Install dependencies with `npm install`.

## Database

**Fork** the [**scheduler-api**](https://github.com/lighthouse-labs/scheduler-api) repository and follow the steps to seed the database. Run **scheduler-api** and this project **scheduler** simultaneously.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## In Action

Add Appointment
!["Add Appointment"](https://github.com/chchchelsay/scheduler/blob/fixes/public/images/ADD.gif?raw=true)
Edit Appointment
!["Edit Appointment"](https://github.com/chchchelsay/scheduler/blob/fixes/public/images/EDIT.gif?raw=true)
Delete Appointment
!["Delete Appointment"](https://github.com/chchchelsay/scheduler/blob/fixes/public/images/DELETE.gif?raw=true)
