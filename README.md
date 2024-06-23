# Calendly API

## Overview
This is a REST API application for a calendly-like service. It supports the following features:
1. Setting own availability
2. Showing own availability
3. Finding overlap in schedule between 2 users

## Design
The API is designed to be simple and easy to use. It is a simple NodeJS application that uses Express to handle HTTP requests. The data is stored in memory and is not persisted. The API has the following endpoints:
1. `GET /users` - Get all users
2. `GET /availability` - Get availability of a user
3. `POST /availability` - Set availability of a user
4. `POST /bookking/find` - Get overlap in availability between 2 users

## Assumptions
* Two users are created by default with ids `1` and `2`.
* All times are considered to be in UTC timezone.
* Date and time used are in the ISO 8601 format.
* A user is assumed to be working on all 7 days of the week. There is no concept of weekends.
* A user is assumed to be available between the start time and end time of the work day as configured.
* User unavailability like OOO, busy etc. are treated as bookings for simplicity. So, unless there is a booking, the user is considered to be available.
* The API is public and does not have any authentication or authorization.

## Limitations
* A real world database is not used. Data is stored in memory.
* Duplicate bookings are allowed. There is no logic to prevent duplicate bookings for the same user at the same time slot.
* The API does not support updating or deleting bookings.
* The API does not support creating or deleting users.
* The API does not support setting the work hours for a user. The work hours are assumed to be 9 AM to 5 PM.

## API Contracts

### Get all users
```http
GET /users
```

### Get availability of a user
```http
GET /availability?userId=<userId>&startTime=<startTime>&endTime=<endTime>
```

### Set availability of a user
```http
POST /availability/:<userId>
Content-Type: application/json

{
    "availability": [
        {
            "start": "2024-09-01T09:00:00Z",
            "end": "2024-09-01T12:00:00Z",
            "type": "busy"
        },
        {
            "start": "2024-09-01T13:00:00Z",
            "end": "2024-09-01T17:00:00Z",
            "type": "busy"
        }
    ]
}
```

### Get overlap in availability between 2 users
```http
POST /booking/find
Content-Type: application/json

{
    "userId1": "<userId>",
    "userId2": "<userId>",
    "startTime": "2024-09-01T10:00:00Z",
    "endTime": "2024-09-01T11:00:00Z"
}
```
## Local development

To run the API, you need to have `node` and `npm` installed on your machine. Once you have installed `node` and `npm`, you can run the following commands to start the API:

1. Clone the repository
```bash
https: git clone https://github.com/111mihir/p0-inc.git
ssh: git clone git@github.com:111mihir/p0-inc.git
```

2. Install the dependencies
```bash
npm install
```

3. Start the API
```bash
npm start
```

The API will start on `http://localhost:3000`. You can use `Postman`, `curl` or any other tool to test the API.

Sample CURL commands to test the API:

Deployment URL can be replaced with `http://localhost:3000` for local testing.

```bash

// Get all users
curl -X GET "https://p0-inc.onrender.com/users"

// Get availability of a user
curl -X GET "https://p0-inc.onrender.com/availability?userId=1&startTime=2024-06-24T09:00:00Z&endTime=2024-06-24T17:00:00Z"

// Set availability of a user
curl -X POST "https://p0-inc.onrender.com/availability/1" -H "Content-Type: application/json" -d '{"availability": [{"start_time": "2024-06-24T09:00:00Z", "end_time": "2024-06-24T12:00:00Z", "type": "busy"}, {"start_time": "2024-06-24T13:00:00Z", "end_time": "2024-06-24T17:00:00Z", "type": "busy"}]}'

// Get overlap in availability between 2 users
curl -X POST https://p0-inc.onrender.com/booking/find -H "Content-Type: application/json" -d '{"userId1": "1", "userId2": "2", "startTime": "2024-06-24T09:00:00Z", "endTime": "2024-06-24T17:00:00Z"}'
```

## Deployment

The API is deployed on Render. You can access the API [here](https://p0-inc.onrender.com/).
