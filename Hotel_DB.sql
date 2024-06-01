CREATE TABLE Room (
    RoomID VARCHAR(6) NOT NULL,
    RoomNumber INT NOT NULL,
    RoomType VARCHAR(20) NOT NULL,
    Status VARCHAR(10) NOT NULL,
    PRIMARY KEY (RoomID)
);

CREATE TABLE Guest (
    GuestID VARCHAR(6) NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Address VARCHAR(100) NOT NULL,
    Phone VARCHAR(15) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    PRIMARY KEY (GuestID)
);

CREATE TABLE Reservation (
    ReservationID VARCHAR(6) NOT NULL,
    GuestID VARCHAR(6) NOT NULL,
    RoomID VARCHAR(6) NOT NULL,
    CheckInDate DATE NOT NULL,
    CheckOutDate DATE NOT NULL,
    PRIMARY KEY (ReservationID),
    FOREIGN KEY (GuestID) REFERENCES Guest (GuestID),
    FOREIGN KEY (RoomID) REFERENCES Room (RoomID)
);

CREATE TABLE Review (
    ReviewID VARCHAR(6) NOT NULL,
    ReservationID VARCHAR(6) NOT NULL,
    ReviewType VARCHAR(20) NOT NULL,
    GeneratedDate DATE NOT NULL,
    Content VARCHAR(250) NOT NULL,
    PRIMARY KEY (ReviewID),
    FOREIGN KEY (ReservationID) REFERENCES Reservation (ReservationID)
);

CREATE TABLE Billing (
    BillingID VARCHAR(6) NOT NULL,
    ReservationID VARCHAR(6) NOT NULL,
    TotalAmount DECIMAL(4,2) NOT NULL,
    BillingDate DATE NOT NULL,
    PRIMARY KEY (BillingID),
    FOREIGN KEY (ReservationID) REFERENCES Reservation (ReservationID)
);

CREATE TABLE Service (
    ServiceID VARCHAR(6) NOT NULL,
    ReservationID VARCHAR(6) NOT NULL,
    ServiceName VARCHAR(50) NOT NULL,
    Price DECIMAL(4,2) NOT NULL,
    PRIMARY KEY (ServiceID),
    FOREIGN KEY (ReservationID) REFERENCES Reservation (ReservationID)
);

ALTER TABLE Reservation ADD CONSTRAINT room_reservation_fk
FOREIGN KEY (RoomID)
REFERENCES Room (RoomID)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Reservation ADD CONSTRAINT guest_reservation_fk
FOREIGN KEY (GuestID)
REFERENCES Guest (GuestID)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Service ADD CONSTRAINT reservation_service_fk
FOREIGN KEY (ReservationID)
REFERENCES Reservation (ReservationID)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Billing ADD CONSTRAINT reservation_billing_fk
FOREIGN KEY (ReservationID)
REFERENCES Reservation (ReservationID)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Review ADD CONSTRAINT reservation_report_fk
FOREIGN KEY (ReservationID)
REFERENCES Reservation (ReservationID)
ON DELETE NO ACTION
ON UPDATE NO ACTION;