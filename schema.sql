CREATE TABLE donors (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(10),
    password VARCHAR(100) NOT NULL,
    blood_type VARCHAR(3) CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    last_donated DATE,
    location VARCHAR(100)
);

CREATE TABLE centers (
    center_id SERIAL PRIMARY KEY,
    center_name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    center_phone_number VARCHAR(10),
    location VARCHAR(200) NOT NULL
);

CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES donors(user_id) ON DELETE CASCADE,
    center_id INTEGER REFERENCES centers(center_id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('confirmed', 'pending', 'cancelled')), 
    type VARCHAR(20) CHECK (type IN ('available', 'urgent'))
);

CREATE TABLE campaigns (
    campaign_id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES centers(center_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    info VARCHAR(500) NOT NULL
);

CREATE TABLE requests (
    request_id SERIAL PRIMARY KEY,
    center_id INTEGER REFERENCES centers(center_id) ON DELETE CASCADE,
    blood_type VARCHAR(3) CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    units_needed INTEGER NOT NULL CHECK (units_needed > 0)
);
CREATE TABLE donation_history (
    donation_id SERIAL PRIMARY KEY,
    donor_id INTEGER REFERENCES donors(user_id) ON DELETE CASCADE,
    center_id INTEGER REFERENCES centers(center_id) ON DELETE SET NULL,
    appointment_id INTEGER REFERENCES appointments(appointment_id) ON DELETE SET NULL,
    donation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    blood_type VARCHAR(3) CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    units_donated INTEGER NOT NULL CHECK (units_donated > 0)
);
