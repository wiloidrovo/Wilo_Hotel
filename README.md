# Databases-Project

## Design and implementation of a database for a Hotel Management System.

The project aims to develop a comprehensive information management system designed specifically for hotels to efficiently manage various aspects of their operations. Functionalities will include reservations management, guest check-in/check-out, room assignment, food service and housekeeping, billing and reporting.

<b/>Description of the problem:</b>

The problem to be solved is that of a hotel which faces challenges in the efficient management of reservations, guest check-in/check-out, room assignment, and tracking of services and payments. Currently, it relies heavily on manual processes and stand-alone systems that lead to errors, data duplication and delays in customer service. The lack of integration between existing systems hinders coordination between departments and limits the ability to generate accurate and timely reports. An automated hotel management system is necessary to improve operational efficiency, provide a smoother guest experience and facilitate data-driven decision making.

<b/>Functional Requirements of the Database System:</b>

• Reservation Management: Allow users to make online reservations, modify and cancel existing reservations.

• Room Management: Facilitate room assignment based on availability and guest preferences.

• Check-in/Check-out: Automate the guest check-in and check-out process, including the generation of room keys.

• Billing: Calculate and record guest charges for services used and hotel stay.

• Reporting: Provide detailed reports on occupancy, revenue, and guest satisfaction.

<b/>Non-Functional Database System Requirements:</b>

• Security: Ensure the protection of sensitive guest data and the integrity of stored information.

• Scalability: Ability to handle future growth in data and user volume.

• Usability: Intuitive and easy to use interface for hotel employees.

• Integration: Compatibility and ability to integrate with third-party systems such as reservation platforms and payment management systems.

## Backend

This project has as its backend a clean and well-structured API implementation using Django and Flask. Aspects such as room categories, and the rooms themselves are directly implemented in the API within Django. Other models such as services, and user data are in turn in the Flask API. All the url handling and settings are done inside Django as well.

Below is the list of the endpoints defined within the API in flask. It can be seen that there is also a room model. However, this was not used since it was implemented in a better way within the Django API. Ultimately the CRUD operations and the attributes of the model do not change.

## Technical Report: CRUD Operations of the API

### Model: Room
- `GET /rooms`: Retrieve a list of all rooms or details of a specific room.
- `POST /rooms`: Create a new room with the provided data.
- `PUT /rooms/:RoomID`: Update the details of a specific room.
- `DELETE /rooms/:RoomID`: Delete a specific room from the system.

### Model: Guest
- `GET /guests`: Retrieve a list of all guests or details of a specific guest.
- `POST /guests`: Create a new guest with the provided data.
- `PUT /guests/:GuestID`: Update the details of a specific guest.
- `DELETE /guests/:GuestID`: Delete a specific guest from the system.

### Model: Reservation
- `GET /reservations`: Retrieve a list of all reservations or details of a specific reservation.
- `POST /reservations`: Create a new reservation with the provided data.
- `PUT /reservations/:ReservationID`: Update the details of a specific reservation.
- `DELETE /reservations/:ReservationID`: Delete a specific reservation from the system.

### Model: Review
- `GET /reviews`: Retrieve a list of all reviews or details of a specific review.
- `POST /reviews`: Create a new review with the provided data.
- `PUT /reviews/:ReviewID`: Update the details of a specific review.
- `DELETE /reviews/:ReviewID`: Delete a specific review from the system.

### Model: Billing
- `GET /billings`: Retrieve a list of all billings or details of a specific billing.
- `POST /billings`: Create a new billing with the provided data.
- `PUT /billings/:BillingID`: Update the details of a specific billing.
- `DELETE /billings/:BillingID`: Delete a specific billing from the system.

### Model: Service
- `GET /services`: Retrieve a list of all services or details of a specific service.
- `POST /services`: Create a new service with the provided data.
- `PUT /services/:ServiceID`: Update the details of a specific service.
- `DELETE /services/:ServiceID`: Delete a specific service from the system.

## Frontend Information

### Overview
The frontend of this project is built using React, a popular JavaScript library for building user interfaces. The design components are based on Tailwind UI, providing a modern and responsive design.

### Dependencies
The following dependencies and tools were used in this project:

- **django-environ**: For managing environment variables in Django.
- **django-cors-headers**: To handle Cross-Origin Resource Sharing (CORS) headers in Django.
- **djangorestframework**: A powerful and flexible toolkit for building Web APIs in Django.
- **pillow**: A Python Imaging Library that adds image processing capabilities to your Python interpreter.
- **django-storages**: A collection of custom storage backends for Django, allowing integration with various cloud storage services.
- **django-ckeditor**: An application that uses the CKEditor as the rich text editor for Django.

### Design
The frontend utilizes some components from **Tailwind UI**, a collection of professionally designed, fully responsive HTML components built with Tailwind CSS.

### Key Features
- **Room Management**: Allows users to view, add, update, and delete room details.
- **Guest Management**: Allows users to view, add, update, and delete guest details.
- **Reservation Management**: Provides functionality for handling reservations, including viewing, adding, updating, and deleting reservations.
- **Review Management**: Facilitates the creation, viewing, updating, and deletion of reviews.
- **Billing and Services**: Manages billing information and additional services associated with reservations.

### Setup
To set up the frontend, follow these steps:
1. Navigate to the `frontend` directory.
2. Install the dependencies using `npm`:
```bash
npm install
```
3. Start the development server:
```bash
npm run start
```

## Django Setup

### Overview
As mentioned above, the backend of this project is built using Django, a high-level Python web framework that encourages rapid development and clean, pragmatic design. Django REST framework is used to build the APIs that the frontend interacts with.

### Installation
1. **Clone the repository**:
```bash
git clone <repository_url>
cd <repository_directory>
```
2. Create a virtual environment:
``` bash
python -m venv venv
venv\Scripts\activate  # On Windows
```
3. Install the dependencies:
``` bash
pip install -r requirements.txt
```
4. Set up environment variables:

DEBUG=on

SECRET_KEY=your_secret_key

DATABASE_URL=path to your database

ALLOWED_HOSTS=localhost,127.0.0.1

5. Apply migrations:
``` bash
python manage.py migrate
```
6. Create a superuser:
``` bash
python manage.py createsuperuser
```
7. Collect static files:
``` bash
python manage.py collectstatic
```
8. Run the development server:
``` bash
python manage.py runserver
```













