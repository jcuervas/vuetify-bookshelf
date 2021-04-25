# vuetify-bookshelf
This is a private app to solve the skill test

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
Linter is setup to fix automatically your files on save within your IDE so you don't usually 
have to worry about linter 

### Docker setup

Use the makefile to start docker actions. Help will show you the different options
````bash
make help
````
#### build and serve with nginx
````bash
make prod
````
#### serve with hot reload
````bash
make dev
````
#### stop dev image
````bash
make stop
````
##### Note on windows
_make dev_ will start dev server with hot reload on linux but hot reloading will not work on 
windows OS. An option for windows developers is to run this project inside wsl2. Another option
for local development into windows is to not use docker but just yarn serve, which will perform
better.  


### Api mocking
Api backend service has been mocked through [miragejs.com](https://miragejs.com)
This service only worries about auth login action. Books api endpoints are passed through
in mirage router to allow external data fetching.

### Authentication
Theese users are available to login

user: mipass   
admin: admin  
user2: mipass2  

Routing guards prevent to access app if no Bearer token is present. Bearer token is obtained and
saved into store from mock api.
#### Considerations
1. App doesn't handle token expiration and renewal
2. Post Content-Type should be x-www-form-urlencoded but mock api only supports application/json
3. Password should be sent encrypted instead of plain text, but this is for another scope.

### Books api
Books api documentation is available [here](https://demo.api-platform.com/)
#### Considerations
1. Api doesn't handle filtering options with a single query parameter so filtering as
is specified on section 5 has to be done on client side.  
2. Pagination on the other side is handled within api param "page" so this action is done
server side.
3. Post action is very confusing. I followed documentation and errors returned doesn't give
any clue of what was wrong. I'm printing errors returned from api in an error field but can't 
   solve them as i don't know what's wrong in many cases. In any case front input validation
   is applied and network inspection shows how the request is being sent.
   Reviews also cannot be added in this action. Even documentation test fails.
