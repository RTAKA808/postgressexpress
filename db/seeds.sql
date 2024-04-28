INSERT INTO department (department_name)
VALUES ('service'),
        ('customers'),
        ('management');


		
INSERT INTO roles (job_title, salary,department_id)
VALUES ('slave',1.00,1),
        ('another slave', 200.00,2),
        ('rich guy',3000000.00,3);
		
		INSERT INTO employees (last_name, first_name,manager_id,role_id)
VALUES ('reyn','t',null,3),
        ('ryan', 'b',1,2),
        ('rain','c',2,1);