DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
\c employee_db;


CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE SET NULL
);
CREATE TABLE employee(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id)
);
INSERT INTO department(name)
VALUES('Engineering'),
        ('IT'),
        ('Finance');
INSERT INTO role(title,salary,department_id)
VALUES ('Mechanical Engineer', 80000, 1),
        ('Electrical Engineer', 80000, 1),
        ('Software Engineer', 80000, 2),
        ('Accountant', 80000, 3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES('John','Doe',1,NULL),
      ('Jane','Doe',1,1),
      ('Jim','Doe',2,NULL),
      ('Sanjeev','Thapa',2,NULL),
      ('San','Thap',3,4),
      ('Henry','Haul',4,NULL),
      ('David','Hall',3,4),
      ('Feeling','Henry',4,NULL),
      ('John','Cash',1,1);