#!/bin/bash

# Define the base URL
BASE_URL="http://localhost:4000/api"

# Define the payload for the POST request
POST_DATA='{
  "username": "John shell",
  "email": "john@gmail.com",
  "phone": "3335994673",
  "address": "downtown amherst",
  "is_seller": true
}'

# Log file
LOG_FILE="api_requests.log"

# Perform the POST request
echo "Sending POST request to create a new user..." | tee -a "$LOG_FILE"
POST_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${BASE_URL}/users" \
-H "Content-Type: application/json" \
-d "${POST_DATA}")

if [ "$POST_RESPONSE" -eq 201 ]; then
  echo "POST request succeeded: $POST_RESPONSE" | tee -a "$LOG_FILE"
else
  echo "POST request failed: $POST_RESPONSE" | tee -a "$LOG_FILE"
fi

# Perform the GET request to retrieve the user data
echo "Sending GET request to retrieve users..." | tee -a "$LOG_FILE"
GET_RESPONSE=$(curl -s -w "%{http_code}" -o response.json -X GET "${BASE_URL}/users" \
-H "Content-Type: application/json")

if [ "$GET_RESPONSE" -eq 200 ]; then
  echo "GET request succeeded: $GET_RESPONSE" | tee -a "$LOG_FILE"
  cat response.json | tee -a "$LOG_FILE"
else
  echo "GET request failed: $GET_RESPONSE" | tee -a "$LOG_FILE"
fi

# Clean up
rm -f response.json

