# visit-app
Django + React visit app.

## Docker

### Dev Launch
    docker-compose -f docker-compose-dev.yml up --build

### Pro Launch
    docker-compose -f docker-compose.yml up --build

## Frontend

### Launch
    cd frontend
    npm start

## Backend

### Launch
    cd backend
    virtualenv venv // Just for the first time.
    source venv/bin/activate
    pip install -r requirements.txt // Just for the first time.
    cd server 
    ./manage.py makemigrations // Create migration when you have model changes.
    ./manage.py migrate // Apply migrations when you have model changes.
    python manage.py runserver

### REST API for accounts
    /users/ - to signup a new user,
    /users/me/ - to get user information,
    /token/login/ - to get token,
    /token/logout/ - to logout.

### REST API for visits
    GET list of visits: /api/v1/visits,
    GET list of visits filtered: /api/v1/visits/?start_date=[START]&end_date=[END]&browser=[BROWSER]&os=[OS]&is_new=[BOOLEAN],
    GET one visit with id: /api/v1/visits/1/ (for id = 1),
    create visit, the POST request at /api/v1/visits/ with visit JSON data,
    delete visit with DELETE request at /api/v1/visits/1/ (for id = 1),
    partial visit update with PATCH request at /api/v1/visits/1/ (for id = 1),
    full visit update with PUT request at /api/v1/visits/1/ (for id = 1).
