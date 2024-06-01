# Flask databases

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:esponjaxd@127.0.0.1:3306/HOTEL_DB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


##############################################################################################
##############################################################################################
# MODELS
class Room(db.Model):
    RoomID = db.Column(db.String(6), primary_key=True)
    RoomNumber = db.Column(db.Integer, nullable=False)
    RoomType = db.Column(db.String(20), nullable=False)
    Status = db.Column(db.String(10), nullable=False)

    def __init__(self, RoomID, RoomNumber, RoomType, Status):
        self.RoomID = RoomID
        self.RoomNumber = RoomNumber
        self.RoomType = RoomType
        self.Status = Status


class Guest(db.Model):
    GuestID = db.Column(db.String(6), primary_key=True)
    Name = db.Column(db.String(50), nullable=False)
    Address = db.Column(db.String(100), nullable=False)
    Phone = db.Column(db.String(15), nullable=False)
    Email = db.Column(db.String(50), nullable=False)

    def __init__(self, GuestID, Name, Address, Phone, Email):
        self.GuestID = GuestID
        self.Name = Name
        self.Address = Address
        self.Phone = Phone
        self.Email = Email


class Reservation(db.Model):
    ReservationID = db.Column(db.String(6), primary_key=True)
    GuestID = db.Column(db.String(6), db.ForeignKey(
        'guest.GuestID'), nullable=False)
    RoomID = db.Column(db.String(6), db.ForeignKey(
        'room.RoomID'), nullable=False)
    CheckInDate = db.Column(db.Date, nullable=False)
    CheckOutDate = db.Column(db.Date, nullable=False)

    def __init__(self, ReservationID, GuestID, RoomID, CheckInDate, CheckOutDate):
        self.ReservationID = ReservationID
        self.GuestID = GuestID
        self.RoomID = RoomID
        self.CheckInDate = CheckInDate
        self.CheckOutDate = CheckOutDate


class Review(db.Model):
    ReviewID = db.Column(db.String(6), primary_key=True)
    ReservationID = db.Column(db.String(6), db.ForeignKey(
        'reservation.ReservationID'), nullable=False)
    ReviewType = db.Column(db.String(20), nullable=False)
    GeneratedDate = db.Column(db.Date, nullable=False)
    Content = db.Column(db.String(250), nullable=False)

    def __init__(self, ReviewID, ReservationID, ReviewType, GeneratedDate, Content):
        self.ReviewID = ReviewID
        self.ReservationID = ReservationID
        self.ReviewType = ReviewType
        self.GeneratedDate = GeneratedDate
        self.Content = Content


class Billing(db.Model):
    BillingID = db.Column(db.String(6), primary_key=True)
    ReservationID = db.Column(db.String(6), db.ForeignKey(
        'reservation.ReservationID'), nullable=False)
    TotalAmount = db.Column(db.Numeric(4, 2), nullable=False)
    BillingDate = db.Column(db.Date, nullable=False)

    def __init__(self, BillingID, ReservationID, TotalAmount, BillingDate):
        self.BillingID = BillingID
        self.ReservationID = ReservationID
        self.TotalAmount = TotalAmount
        self.BillingDate = BillingDate


class Service(db.Model):
    ServiceID = db.Column(db.String(6), primary_key=True)
    ReservationID = db.Column(db.String(6), db.ForeignKey(
        'reservation.ReservationID'), nullable=False)
    ServiceName = db.Column(db.String(50), nullable=False)
    Price = db.Column(db.Numeric(4, 2), nullable=False)

    def __init__(self, ServiceID, ReservationID, ServiceName, Price):
        self.ServiceID = ServiceID
        self.ReservationID = ReservationID
        self.ServiceName = ServiceName
        self.Price = Price
##############################################################################################
##############################################################################################


with app.app_context():
    db.create_all()


##############################################################################################
##############################################################################################
# SCHEMAS
class RoomSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Room
        load_instance = True


class GuestSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Guest
        load_instance = True


class ReservationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Reservation
        load_instance = True
    GuestID = ma.auto_field()
    RoomID = ma.auto_field()
    CheckInDate = ma.auto_field()
    CheckOutDate = ma.auto_field()


class ReviewSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Review
        load_instance = True


class BillingSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Billing
        load_instance = True


class ServiceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Service
        load_instance = True
##############################################################################################
##############################################################################################


##############################################################################################
##############################################################################################
# CRUD OPERATIONS FOR ROOM
# curl -X GET http://127.0.0.1:5000/rooms
@app.route('/rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    room_schema = RoomSchema(many=True)
    rooms_json = room_schema.dump(rooms)
    return make_response(jsonify({'Rooms': rooms_json}))


# curl -X GET http://127.0.0.1:5000/room/"A001"
@app.route('/room/<string:id>', methods=['GET'])
def get_room(id):
    room = Room.query.get(id)
    if room:
        room_schema = RoomSchema()
        room_json = room_schema.dump(room)
        return jsonify(room_json), 200
    else:
        return jsonify({'message': 'Room not found'}), 404


# curl -X POST -H "Content-Type: application/json" -d "{\"RoomID\":\"A001\", \"RoomNumber\":\"001\", \"RoomType\":\"Single\", \"Status\":\"Available\"}" http://127.0.0.1:5000/rooms
@app.route('/rooms', methods=['POST'])
def create_room():
    data = request.get_json()
    room_schema = RoomSchema()
    try:
        new_room = room_schema.load(data)
        db.session.add(new_room)
        db.session.commit()
        rooms_json = room_schema.dump(new_room)
        return jsonify(rooms_json), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


# curl -X PUT -H "Content-Type: application/json" -d "{\"RoomID\":\"A001\", \"RoomNumber\":\"001\", \"RoomType\":\"Single\", \"Status\":\"Occupied\"}" http://127.0.0.1:5000/rooms
@app.route('/room/<string:id>', methods=['PUT'])
def update_room(id):
    room = Room.query.get(id)
    if room:
        data = request.get_json()
        room_schema = RoomSchema()
        try:
            updated_room = room_schema.load(data, instance=room, partial=True)
            db.session.commit()
            room_json = room_schema.dump(updated_room)
            return jsonify(room_json)
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'message': 'Room not found'}), 404


# curl -X DELETE http://127.0.0.1:5000/room/"A001"
@app.route('/room/<string:id>', methods=['DELETE'])
def delete_room(id):
    room = Room.query.get(id)
    if room:
        db.session.delete(room)
        db.session.commit()
        return jsonify({'message': 'Room deleted successfully'})
    else:
        return jsonify({'message': 'Room not found'}), 404
##############################################################################################
##############################################################################################


##############################################################################################
##############################################################################################
# CRUD OPERATIONS FOR GUEST
@app.route('/guests', methods=['GET'])
def get_guests():
    guests = Guest.query.all()
    guest_schema = GuestSchema(many=True)
    guests_json = guest_schema.dump(guests)
    return make_response(jsonify({'Guests': guests_json}))


# curl -v http://localhost:5000/guest/1
@app.route('/guest/<string:id>', methods=['GET'])
def get_guest(id):
    guest = Guest.query.get(id)
    if guest:
        guest_schema = GuestSchema()
        guest_json = guest_schema.dump(guest)
        return jsonify(guest_json), 200
    else:
        return jsonify({'message': 'Guest not found'}), 404


# curl -X POST -H "Content-Type: application/json" -d "{\"GuestID\":\"AA01\", \"Name\":\"Wilo\", \"Address\":\"Urcuqui\", \"Phone\":\"+593994790288\", \"Email\":\"wiloidrovogd@gmail.com\"}" http://127.0.0.1:5000/guests
@app.route('/guests', methods=['POST'])
def create_guest():
    data = request.get_json()
    guest_schema = GuestSchema()
    try:
        new_guest = guest_schema.load(data)
        db.session.add(new_guest)
        db.session.commit()
        guests_json = guest_schema.dump(new_guest)
        return jsonify(guests_json), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@app.route('/guest/<string:id>', methods=['PUT'])
def update_guest(id):
    guest = Guest.query.get(id)
    if guest:
        data = request.get_json()
        guest_schema = GuestSchema()
        try:
            updated_guest = guest_schema.load(
                data, instance=guest, partial=True)
            db.session.commit()
            guest_json = guest_schema.dump(updated_guest)
            return jsonify(guest_json)
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'message': 'Guest not found'}), 404


@app.route('/guest/<string:id>', methods=['DELETE'])
def delete_guest(id):
    guest = Guest.query.get(id)
    if guest:
        db.session.delete(guest)
        db.session.commit()
        return jsonify({'message': 'Guest deleted successfully'})
    else:
        return jsonify({'message': 'Guest not found'}), 404
##############################################################################################
##############################################################################################


##############################################################################################
##############################################################################################
# CRUD OPERATIONS FOR RESERVATION
@app.route('/reservations', methods=['GET'])
def get_reservations():
    reservations = Reservation.query.all()
    reservation_schema = ReservationSchema(many=True)
    reservations_json = reservation_schema.dump(reservations)
    return make_response(jsonify({'Reservations': reservations_json}))


# curl -v http://localhost:5000/reservation/1
@app.route('/reservation/<string:id>', methods=['GET'])
def get_reservation(id):
    reservation = Reservation.query.get(id)
    if reservation:
        reservation_schema = ReservationSchema()
        reservation_json = reservation_schema.dump(reservation)
        return jsonify(reservation_json), 200
    else:
        return jsonify({'message': 'Reservation not found'}), 404


# curl -X POST -H "Content-Type: application/json" -d "{\"ReservationID\":\"WI0524\", \"GuestID\":\"AA01\", \"RoomID\":\"A001\", \"CheckInDate\":\"2024-06-01\", \"CheckOutDate\":\"2024-06-10\"}" http://127.0.0.1:5000/reservations
@app.route('/reservations', methods=['POST'])
def create_reservation():
    data = request.get_json()
    reservation_schema = ReservationSchema()
    try:
        new_reservation = reservation_schema.load(data)
        db.session.add(new_reservation)
        db.session.commit()
        reservations_json = reservation_schema.dump(new_reservation)
        return jsonify(reservations_json), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@app.route('/reservation/<string:id>', methods=['PUT'])
def update_reservation(id):
    reservation = Reservation.query.get(id)
    if reservation:
        data = request.get_json()
        reservation_schema = ReservationSchema()
        try:
            updated_reservation = reservation_schema.load(
                data, instance=reservation, partial=True)
            db.session.commit()
            reservation_json = reservation_schema.dump(updated_reservation)
            return jsonify(reservation_json)
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'message': 'Reservation not found'}), 404


@app.route('/reservation/<string:id>', methods=['DELETE'])
def delete_reservation(id):
    reservation = Reservation.query.get(id)
    if reservation:
        db.session.delete(reservation)
        db.session.commit()
        return jsonify({'message': 'Reservation deleted successfully'})
    else:
        return jsonify({'message': 'Reservation not found'}), 404
##############################################################################################
##############################################################################################


##############################################################################################
##############################################################################################
# CRUD OPERATIONS FOR REVIEW
@app.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    review_schema = ReviewSchema(many=True)
    reviews_json = review_schema.dump(reviews)
    return make_response(jsonify({'Reviews': reviews_json}))


# curl -v http://localhost:5000/review/1
@app.route('/review/<string:id>', methods=['GET'])
def get_review(id):
    review = Review.query.get(id)
    if review:
        review_schema = ReviewSchema()
        review_json = review_schema.dump(review)
        return jsonify(review_json), 200
    else:
        return jsonify({'message': 'Review not found'}), 404


@app.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    review_schema = ReviewSchema()
    try:
        new_review = review_schema.load(data)
        db.session.add(new_review)
        db.session.commit()
        reviews_json = review_schema.dump(new_review)
        return jsonify(reviews_json), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/review/<string:id>', methods=['PUT'])
def update_review(id):
    review = Review.query.get(id)
    if review:
        data = request.get_json()
        review_schema = ReviewSchema()
        try:
            updated_review = review_schema.load(
                data, instance=review, partial=True)
            db.session.commit()
            review_json = review_schema.dump(updated_review)
            return jsonify(review_json)
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'message': 'Review not found'}), 404


@app.route('/review/<string:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message': 'Review deleted successfully'})
    else:
        return jsonify({'message': 'Review not found'}), 404
##############################################################################################
##############################################################################################


##############################################################################################
##############################################################################################
# CRUD OPERATIONS FOR BILLING
@app.route('/billings', methods=['GET'])
def get_billings():
    billings = Billing.query.all()
    billing_schema = BillingSchema(many=True)
    billings_json = billing_schema.dump(billings)
    return make_response(jsonify({'Billings': billings_json}))


# curl -v http://localhost:5000/billing/1
@app.route('/billing/<string:id>', methods=['GET'])
def get_billing(id):
    billing = Billing.query.get(id)
    if billing:
        billing_schema = BillingSchema()
        billing_json = billing_schema.dump(billing)
        return jsonify(billing_json), 200
    else:
        return jsonify({'message': 'Billing not found'}), 404


@app.route('/billings', methods=['POST'])
def create_billing():
    data = request.get_json()
    billing_schema = BillingSchema()
    try:
        new_billing = billing_schema.load(data)
        db.session.add(new_billing)
        db.session.commit()
        billings_json = billing_schema.dump(new_billing)
        return jsonify(billings_json), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/billing/<string:id>', methods=['PUT'])
def update_billing(id):
    billing = Billing.query.get(id)
    if billing:
        data = request.get_json()
        billing_schema = BillingSchema()
        try:
            updated_billing = billing_schema.load(
                data, instance=billing, partial=True)
            db.session.commit()
            billing_json = billing_schema.dump(updated_billing)
            return jsonify(billing_json)
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'message': 'Billing not found'}), 404


@app.route('/billing/<string:id>', methods=['DELETE'])
def delete_billing(id):
    billing = Billing.query.get(id)
    if billing:
        db.session.delete(billing)
        db.session.commit()
        return jsonify({'message': 'Billing deleted successfully'})
    else:
        return jsonify({'message': 'Billing not found'}), 404
##############################################################################################
##############################################################################################


##############################################################################################
##############################################################################################
# CRUD OPERATIONS FOR SERVICE
@app.route('/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    service_schema = ServiceSchema(many=True)
    services_json = service_schema.dump(services)
    return make_response(jsonify({'services': services_json}))


# curl -v http://localhost:5000/service/1
@app.route('/service/<string:id>', methods=['GET'])
def get_service(id):
    service = Service.query.get(id)
    if service:
        service_schema = ServiceSchema()
        service_json = service_schema.dump(service)
        return jsonify(service_json), 200
    else:
        return jsonify({'message': 'Service not found'}), 404


@app.route('/services', methods=['POST'])
def create_service():
    data = request.get_json()
    service_schema = ServiceSchema()
    try:
        new_service = service_schema.load(data)
        db.session.add(new_service)
        db.session.commit()
        services_json = service_schema.dump(new_service)
        return jsonify(services_json), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/service/<string:id>', methods=['PUT'])
def update_service(id):
    service = Service.query.get(id)
    if service:
        data = request.get_json()
        service_schema = ServiceSchema()
        try:
            updated_service = service_schema.load(
                data, instance=service, partial=True)
            db.session.commit()
            service_json = service_schema.dump(updated_service)
            return jsonify(service_json)
        except Exception as e:
            return jsonify({'error': str(e)}), 400
    else:
        return jsonify({'message': 'Service not found'}), 404


@app.route('/service/<string:id>', methods=['DELETE'])
def delete_service(id):
    service = Service.query.get(id)
    if service:
        db.session.delete(service)
        db.session.commit()
        return jsonify({'message': 'Service deleted successfully'})
    else:
        return jsonify({'message': 'Service not found'}), 404
##############################################################################################
##############################################################################################


if __name__ == '__main__':
    app.run(debug=True)
