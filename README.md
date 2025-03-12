# SCHOOL PROJECT API Development

## API Endpoints

### 1. Get Schools Data

**Endpoint:** `/list-schools`

**Method:** `GET`

**Description:** Retrieves a list of schools sorted by distance from the provided latitude and longitude.

**Query Parameters:**
- `latitude` (required): The latitude of the location.
- `longitude` (required): The longitude of the location.

**Sample URL:**
```
/list-schools?latitude=12.9716&longitude=77.5946
```

**Response:**
- `200 OK`: 
  ```json
  {
    "success": true,
    "schools": [
      {
        "id": 1,
        "name": "School Name",
        "address": "School Address",
        "latitude": "School Latitude",
        "longitude": "School Longitude",
        "distance": "Distance (km) from provided location"
      },
      ...
    ]
  }
  ```
- `400 Bad Request`: 
  ```json
  {
    "error": "Latitude and Longitude are required"
  }
  ```
- `500 Internal Server Error`: 
  ```json
  {
    "success": false,
    "message": "Internal Server Error"
  }
  ```

### 2. Add School Data

**Endpoint:** `/add-school`

**Method:** `POST`

**Description:** Adds a new school to the database.

**Request Body:**
- `name` (required): The name of the school.
- `address` (required): The address of the school.
- `latitude` (required): The latitude of the school.
- `longitude` (required): The longitude of the school.

**Example Request Body:**
```json
{
  "name": "Example School",
  "address": "123 Example Street",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

**Response:**
- `201 Created`: 
  ```json
  {
    "success": true,
    "message": "Created"
  }
  ```
- `400 Bad Request`: 
  ```json
  {
    "success": false,
    "error": "Invalid Data"
  }
  ```
- `400 Bad Request`: 
  ```json
  {
    "success": false,
    "message": "School already exists!"
  }
  ```
- `500 Internal Server Error`: 
  ```json
  {
    "success": false,
    "message": "Internal Server Error"
  }
  ```

## Database Schema

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

## Environment Variables

Ensure you have a `.env` file in the root of your project with the following variables:

```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

## Usage

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.
4. Use the above endpoints to interact with the API.

