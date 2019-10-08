# Alpheios User Word API

## API Documentation

Operation: `GET /words`

Description: returns all word item data for all languages for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: Array of Objects adhering to [schema.json](schema.json)


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `GET /words?languageCode={code}`

Description: returns all word item data for the specified language for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: Array of Objects adhering to [schema.json](schema.json)


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `GET /words/{id}`

Description: returns a specific word item for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: Object adhering to [schema.json](schema.json)


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`

Error Condition: Item not found


Error Response Code: `500`

Error Response Body: `{ "status": "Item not found"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `POST /words/{id}` 

Description: saves a new word item(or replaces if existing) for the authorized principal.
             
Required Request Header: `Authorization: Bearer <access token>`

Required Request Body: JSON string adhering to [schema.json](schema.json)

Response Content-Type: `application/json`

Success Response Code: `201`

Success Response Body: Object adhering to [schema.json](schema.json)


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Invalid data or unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `PUT /words/{id}` 

Description: updates a word item for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Required Request Body: JSON string adhering to [schema.json](schema.json)


Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: `{ "status": true }`


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Invalid data or unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `DELETE /words/{id}` 

Description: deletes a single word item for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: `{ "status": true }`


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`

---

Operation: `DELETE /words?languageCode={code}` 

Description: deletes all word items for the specified language for the authorized principal

Required Request Header: `Authorization: Bearer <access token>`

Response Content-Type: `application/json`

Success Response Code: `200`

Success Response Body: `{ "status": true }`


Error Condition: Invalid or missing access token

Error Response Code: `401`

Error Response Body: `{ "message": "unauthorized"}`


Error Condition: Unexpected error

Error Response Code: `500`

Error Response Body: `{ "status": false}`


## Authorization

Bearer Token.

API Operations are protected by login to the Alpheios Auth0 domain. All operations require a
Signed JWT Token granting access to the correct audience be supplied in an Author.


## Developer Instructions

Built using the Servless Stack following the tutorial at https://serverless-stack.com
