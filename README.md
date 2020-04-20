# travel-expense

## About
```
Travel Expense is a system for the University of North Alabama CSIS Department.
Using Vue, a web application was built that allows for staff to request funds for trips
Department chairs can see all submitted forms and either confirm or deny the requests
Forms are stored in a Mongo Database and requests are handled by a RESTful
Emails are sent to the users when forms are submitted and confirmed/denied, chair
is emailed when new forms are submitted
API built with NodeJS and Express. 
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
### Start Restful API
```
npm run express:run
```

### Connect to Mongo Database and View Documents
```
cd to MongoDB bin folder
./mongo
use project;
db.expenseReports.find();
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# travel-expense
