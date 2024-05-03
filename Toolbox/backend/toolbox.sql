---- CONSTRAINTS TABLES ----
CREATE TABLE account_roles (
	role VARCHAR(20) PRIMARY KEY 
)

INSERT INTO account_roles VALUES 
	('ADMIN'),
	('MANAGER'),
	('USER')

CREATE TABLE general_statuses (
	status VARCHAR(20) PRIMARY KEY 
)

INSERT INTO general_statuses VALUES 
	('ACTIVE'),
	('INACTIVE')


CREATE TABLE leave_types (
	leave_type VARCHAR(20) PRIMARY KEY 
)

INSERT INTO leave_types VALUES 
	('ANNUAL'),
	('SICK'),
	('CHILDCARE'),
	('MATERNITY'),
	('PATERNITY')

CREATE TABLE request_statuses (
	status VARCHAR(20) PRIMARY KEY 
)

INSERT INTO request_statuses VALUES
	('DRAFT'),
	('PENDING'),
	('APPROVED'),
	('REJECTED')

CREATE TABLE expense_categories (
	category VARCHAR(50) PRIMARY KEY 
)

INSERT INTO expense_categories VALUES
	('TRAVEL'),
	('MOBILE'),
	('ENTERTAINMENT'),
	('TEAM BUILDING'),
	('LEARNING AND DEVELOPMENT'),
	('OFFICE SUPPLIES'),
	('MARKETING AND ADVERTISING')

----------------------------

CREATE TABLE accounts (
	uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	status VARCHAR(20) DEFAULT 'ACTIVE',
	email VARCHAR(50) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"role" VARCHAR(20) DEFAULT 'USER',
	access_admin_console BOOLEAN DEFAULT FALSE,
	access_account_info BOOLEAN DEFAULT FALSE,
	access_employee_directory BOOLEAN DEFAULT FALSE,
	access_leave_management BOOLEAN DEFAULT FALSE,
	access_expense_tracker BOOLEAN DEFAULT FALSE,
	access_knowledge_base BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES general_statuses(status),
	CONSTRAINT fk_role FOREIGN KEY ("role") REFERENCES account_roles ("role")	
)
	
CREATE TABLE employees (
	id SERIAL NOT NULL PRIMARY KEY,
	account_id UUID NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	date_of_birth DATE,
	gender VARCHAR(20),
	address VARCHAR(50),
	country VARCHAR(20),
	postal_code CHAR(6),
	phone CHAR(8),
	email VARCHAR(50),
	status VARCHAR(20) DEFAULT 'ACTIVE',
	joined_date DATE,
	resigned_date DATE,
	profile_picture_url VARCHAR(255),
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES accounts(uuid),
	CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES general_statuses(status)
)

CREATE TABLE employee_titles (
	uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	employee_id SERIAL NOT NULL,
	title VARCHAR(50) NOT NULL,
	start_date DATE,
	end_date DATE,
	department_id SERIAL NOT NULL,
	status VARCHAR(20) DEFAULT 'ACTIVE',
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employees(id),
	CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES departments(id),
	CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES general_statuses(status)
)

CREATE TABLE departments (
	id SERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
)

CREATE TABLE department_managers (
	uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	employee_id SERIAL NOT NULL,
	department_id SERIAL NOT NULL,
	start_date DATE,
	end_date DATE,
	status VARCHAR(20) DEFAULT 'ACTIVE',
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employees(id),
	CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES departments(id),
	CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES general_statuses(status)
)

CREATE TABLE leave_request (
	uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	requestor_id SERIAL NOT NULL,
	leave_type VARCHAR(20) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	duration FLOAT(24),
	file_url VARCHAR(255),
	remarks VARCHAR(255),
	status VARCHAR(20),
	dept_manager_id UUID NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT fk_requestor_id FOREIGN KEY (requestor_id) REFERENCES employees(id),
	CONSTRAINT fk_leave_type FOREIGN KEY (leave_type) REFERENCES leave_types(leave_type),
	CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES request_statuses(status),
	CONSTRAINT fk_dept_manager_id FOREIGN KEY (dept_manager_id) REFERENCES department_managers(uuid)
)

CREATE TABLE leave_quotas (
	uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	employee_id SERIAL NOT NULL,
	leave_type VARCHAR(20) NOT NULL,
	quota FLOAT(24) NOT NULL,
	used FLOAT(24) DEFAULT 0, 
	year DATE DEFAULT CURRENT_DATE,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT fk_employee_id FOREIGN KEY (employee_id) REFERENCES employees(id),
	CONSTRAINT fk_leave_type FOREIGN KEY (leave_type) REFERENCES leave_types(leave_type)
)

CREATE TABLE expense_requests (
	uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	requestor_id SERIAL NOT NULL,
	category VARCHAR(50) NOT NULL,
	expense_date DATE NOT NULL,
	amount FLOAT(24) NOT NULL,
	file_url VARCHAR(255),
	remarks VARCHAR(255),
	status VARCHAR(20),
	dept_manager_id UUID NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	CONSTRAINT fk_requestor_id FOREIGN KEY (requestor_id) REFERENCES employees(id),
	CONSTRAINT fk_category FOREIGN KEY (category) REFERENCES expense_categories(category),
	CONSTRAINT fk_status FOREIGN KEY (status) REFERENCES request_statuses(status),
	CONSTRAINT fk_dept_manager_id FOREIGN KEY (dept_manager_id) REFERENCES department_managers(uuid)
)
