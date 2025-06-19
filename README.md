# Coffee Shop Admin Login Backend

## Setup

1. Go to the `server` directory:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

The backend will run on port 5000 by default.

## Endpoints
- `POST /login` — Login with `{ username, password }` (admin only)
- `POST /register` — Register a new user (for testing)

## Frontend
Update your frontend login form to send a POST request to `http://localhost:5000/login`. 

## Register an Admin User
You can register an admin user using a POST request to `/register` with the following JSON body:
```json
{
  "username": "admin",
  "password": "adminpass",
  "isAdmin": true
}
```

You can use tools like Postman or curl to send this request.

For example, using curl:
```sh
curl -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"adminpass\",\"isAdmin\":true}"
```

Or using Postman:
1. Open Postman.
2. Set the request type to POST.
3. Enter the URL: `http://localhost:5000/register`.
4. Select the "Body" tab.
5. Choose "raw" and select "JSON" from the dropdown.
6. Enter the following JSON:
```json
{
  "username": "admin",
  "password": "adminpass",
  "isAdmin": true
}
```
7. Click "Send".

After registering an admin user, you can log in using the login form on your site with the credentials you just registered. 