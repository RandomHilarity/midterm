# Project Title

LHL Decision-Maker

## Prerequisites

* * Dependencies

1. body-parser: 1.19.0
2. chalk: 2.4.2
3. dotenv: 2.0.0
4. ejs: 2.6.2
5. express: 4.17.1
6. html5sortable: 0.9.16
7. morgan: 1.9.1,
8. pg: 6.4.2
9. pg-native: 3.0.0

* * Dev Dependencies

1. nodemon: 1.19.1

### Installing

1. Create the `.env` 
2. Update the .env file with your correct local information
- username: `labber`
  - password: `labber`
  - database: `midterm`
3. Install dependencies: `npm i`
4. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
5. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
6. Visit `http://localhost:8080/`

## Deployment

This is a midterm exercise for Lighthouse Labs and not intended for production.

## Built With

* [Canvas.JS](https://canvasjs.com/) - To generate results chart
* [Mailgun](https://www.mailgun.com/) - To send email (removed due to account conflict)

## Authors

* **John Webster** - *Some HTML, some CSS, some SQL, all JS* - [RandomHilarity](https://github.com/RandomHilarity)
* **Devon Blake** - *Mailgun, some HTML, some CSS, some SQL* - [itsCharisma](https://github.com/itsCharisma)

## Addtitional Notes

Tracking user names, IPs and user comments are stretch work and are not currently not active
