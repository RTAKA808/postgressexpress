DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL

);


CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employees(
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    manager_id INTEGER REFERENCES employees(id),
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);
