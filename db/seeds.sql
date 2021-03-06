USE company_db

INSERT INTO departments (dept_name)
VALUES ("Community Outreach"),
       ("Social Services"),
       ("Medical"),
       ("Employment");

INSERT INTO roles (title, salary, dept_id)
VALUES  ("Outreach Manager", 100000.00, 1),
        ("Volunteer Coordinator", 70000.00, 1),
        ("Donation Coordinator", 70000.00, 1),
        ("Housing Resource Coordinator", 70000.00, 1),
        ("Web Developer", 70000.00, 1),
        ("Supervisory Social Worker", 100000.00, 2),
        ("Social Worker", 80000.00, 2),
        ("Lead Site Doctor", 150000.00, 3),
        ("Head Nurse", 100000.00, 3),
        ("Assist Nurse", 900000.00, 3),
        ("Development Manager", 100000.00, 4),
        ("Career Counselor", 70000.00, 4),
        ("Work Source Coordinator", 70000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Mabel", "Leon", 1, null),
        ("Tom", "Williams", 2, 1),
        ("Dakota", "Miller", 3, 1),
        ("Laura", "James", 4, 1),
        ("Taylor", "Dill", 5, 1),
        ("Jack", "Matthews", 6, null),
        ("Betty", "Allens", 7, 6),
        ("Talia", "Deal", 8, null),
        ("Graham", "Hill", 9, 8),
        ("Jill", "Ramsey", 10, 9),
        ("Joe", "Montgomery", 10, 9),
        ("Charlie", "Fish", 11, null),
        ("Ryan", "Elmo", 12, 11),
        ("Kel", "Andrews", 13, 11);
