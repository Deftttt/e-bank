INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 1, '123456789', 'client@example.com', 'John', 'Doe', '$2a$10$TAHmSTrojH67HTIq0KLVFu59FOgQ21/vuYO9v0G1z6FjXJL3H0e.a', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 2, '997888096', 'client2@example.com', 'Mariusz', 'Czerkawski', '$2a$10$D8lJw7Ju.T5HgswnTs80JO6UURrKX/XRWOCxwYoF/Q/eGo8deoAsq', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 3, '728119146', 'piotrstasicki2@gmail.com', 'Piotr', 'Stasicki', '$2a$10$aCGR0e3BrvkMWkerE3/e.Oz1fPkgXHxHEjx2o/Oid0HDs6EQrkHsW', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 4, '889381290', 'piotrstasicki3@gmail.com', 'Kong', 'Strong', '$2a$10$Aa43f50LIn969ld23dql3exLgA20ZuwKmJewH/zHhizQAjFw0yXYG', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 5, '889381291', 'piotrstasicki4@gmail.com', 'Kong2', 'Strong2', '$2a$10$tm72W9mUdtNU3f5TZE578ea87FZI8v7NXcJv90SJrlJ0x1lq8tjMy', null);

INSERT INTO _right (id, name) VALUES (1, 'APPROVE_LOANS');
INSERT INTO _right (id, name) VALUES (2, 'VIEW_CLIENTS');
INSERT INTO _right (id, name) VALUES (3, 'VIEW_ACCOUNTS');
INSERT INTO _right (id, name) VALUES (4, 'VIEW_EMPLOYEES');
INSERT INTO _right (id, name) VALUES (5, 'VIEW_CLIENTS');

INSERT INTO position (salary, id, position_name) VALUES (7400, 1, 'Loan Analyst');
INSERT INTO position (salary, id, position_name) VALUES (5600, 2, 'Emp_Position_1');

INSERT INTO position_rights (_right_id, position_id) VALUES (1, 1);
INSERT INTO position_rights (_right_id, position_id) VALUES (2, 1);
INSERT INTO position_rights (_right_id, position_id) VALUES (3, 1);
INSERT INTO position_rights (_right_id, position_id) VALUES (4, 1);
INSERT INTO position_rights (_right_id, position_id) VALUES (5, 2);

INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (1, 1, '23/24', '37-700', 'Przemysl', 'Polska', 'Opalinskiego');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (2, 1, '50', '37-800', 'Rzeszów', 'Polska', 'Rejtana');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (3, 2, '48', '38-997', 'Zamosc', 'Polska', 'Polna');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (4, 3, '10a/37', '36-721', 'Kraków', 'Polska', 'Norymberska');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (5, 4, '51', '36-721', 'Kraków', 'Polska', 'Zachodnia');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (6, 5, '4', '36-721', 'Kraków', 'Polska', 'Pawia');

INSERT INTO employee (id, position_id, department) VALUES (3, 1, 'DEPARTMENT_1');
INSERT INTO employee (id, position_id, department) VALUES (4, 2, 'DEPARTMENT_2');
INSERT INTO employee (id, position_id, department) VALUES (5, 1, 'DEPARTMENT_2');

INSERT INTO client (id, pesel) VALUES (1, '89123458901');
INSERT INTO client (id, pesel) VALUES (2, '02779856702');

INSERT INTO register_confirmation_token_seq (next_val) VALUES (1);

INSERT INTO password_reset_token_seq (next_val) VALUES (1);



INSERT INTO bank_account (balance, client_id, opening_date, account_number, account_type) VALUES (2000.00, 1, '2024-05-13 02:33:06.560000', '0987654321', 'INVESTMENT_ACCOUNT');
INSERT INTO bank_account (balance, client_id, opening_date, account_number, account_type) VALUES (1000.00, 1, '2024-05-13 02:33:06.560000', '1234567890', 'PERSONAL_ACCOUNT');
INSERT INTO bank_account (balance, client_id, opening_date, account_number, account_type) VALUES (1500.00, 2, '2024-05-13 02:33:06.560000', '5432109876', 'PERSONAL_ACCOUNT');

INSERT INTO transaction (amount, id, transaction_date, recipient_account_id, sender_account_id) VALUES (500.00, 1, '2024-05-13 02:33:06.639000', '0987654321', '1234567890');
INSERT INTO transaction (amount, id, transaction_date, recipient_account_id, sender_account_id) VALUES (300.00, 2, '2024-05-13 02:33:06.639000', '5432109876', '1234567890');
INSERT INTO transaction (amount, id, transaction_date, recipient_account_id, sender_account_id) VALUES (200.00, 3, '2024-05-13 02:33:06.639000', '5432109876', '0987654321');

INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (15000.00, null, 10, null, '2024-05-23', null, '2024-05-13 02:33:06.674724', 1, null, 3, 1, null, 'Zakup motocykla', 'REQUESTED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (20000.00, null, 16, null, '2024-05-28', null, '2024-05-13 02:33:06.674724', 1, null, 5, 2, null, 'Remont mieszkania', 'REQUESTED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (40000.00, null, 24, null, '2024-06-02', null, '2024-05-13 02:33:06.674724', 2, null, 3, 3, null, 'Budowa działki', 'REQUESTED');



