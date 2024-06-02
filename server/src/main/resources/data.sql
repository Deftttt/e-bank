INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 1, '123456789', 'client@example.com', 'John', 'Doe', '$2a$10$TAHmSTrojH67HTIq0KLVFu59FOgQ21/vuYO9v0G1z6FjXJL3H0e.a', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 2, '997888096', 'client2@example.com', 'Mariusz', 'Czerkawski', '$2a$10$D8lJw7Ju.T5HgswnTs80JO6UURrKX/XRWOCxwYoF/Q/eGo8deoAsq', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 3, '728119146', 'piotrstasicki2@gmail.com', 'Piotr', 'Stasicki', '$2a$10$aCGR0e3BrvkMWkerE3/e.Oz1fPkgXHxHEjx2o/Oid0HDs6EQrkHsW', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 4, '889381290', 'piotrstasicki3@gmail.com', 'Kong', 'Strong', '$2a$10$Aa43f50LIn969ld23dql3exLgA20ZuwKmJewH/zHhizQAjFw0yXYG', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 5, '889381291', 'piotrstasicki4@gmail.com', 'Kong2', 'Strong2', '$2a$10$tm72W9mUdtNU3f5TZE578ea87FZI8v7NXcJv90SJrlJ0x1lq8tjMy', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 6, '998877665', 'client6@example.com', 'Anna', 'Kowalska', '$2a$10$pEQoaRobw3t3syFdLWWnLO5/mG8aqC6Ml.LxxXrV5q0s92TWj.goC', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 7, '778899001', 'client7@example.com', 'Piotr', 'Nowak', '$2a$10$dgmG6OC/8HptDIDiKj0ZW.GnVcK7vQ3M2w2F.4l6Oi9dfX2SJ1hZa', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 8, '665544332', 'client8@example.com', 'Maria', 'Wiśniewska', '$2a$10$UIaJ0uF1lmtpP7CCOwML6.LqUMRLxX0ECdJsNfOxgsBGMJxaM8KCW', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 9, '445566778', 'client9@example.com', 'Krzysztof', 'Wójcik', '$2a$10$99l8FmUTYWedjzF3CQmCoeQhk9czbqHROcvtRo1yQWtwI2EoeDvCO', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 10, '334455667', 'client10@example.com', 'Ewa', 'Kowalczyk', '$2a$10$Wd1OKlxF9Wo9RQCMqW107epdrfXbXNuywf11pb9aI6/T962Nn4j3C', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 11, '223344556', 'client11@example.com', 'Jan', 'Zając', '$2a$10$yLYXKyo5rTiI2/shkRyo2eE7AODBS5NXEyp0cB/cCo7wwYVw8aRVi', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 12, '998877665', 'client12@example.com', 'Michał', 'Kowal', '$2a$10$GLiGL8dRTAc9oHrn2uLqrOn7DCwKpKBRITJGkDSpdNO7QHY8lkcTW', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 13, '112233445', 'client13@example.com', 'Agnieszka', 'Szczepańska', '$2a$10$e8MrlEmtAiy0hKc/zrniX.IRt1zGt65ja5S5L0iE6PEuNgeSzCsn6', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 14, '556677889', 'client14@example.com', 'Barbara', 'Kamińska', '$2a$10$mgfaIlZVVAuyXY5eiDcHF.b0wq0hNsFLcmWPzBvjlES4sT1gYrzdK', null);
INSERT INTO user (enabled, mfa_enabled, id, phone_number, email, first_name, last_name, password, secret) VALUES (true, false, 15, '667788990', 'client15@example.com', 'Tomasz', 'Mazur', '$2a$10$jMXqW.a66biTNdQTDrAsjOlwyva9tTPeZLPnMi9fWiiAlsUTy3Ane', null);



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
INSERT INTO position_rights (_right_id, position_id) VALUES (5, 1);
INSERT INTO position_rights (_right_id, position_id) VALUES (5, 2);

INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (1, 1, '23/24', '37-700', 'Przemysl', 'Polska', 'Opalinskiego');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (2, 1, '50', '37-800', 'Rzeszów', 'Polska', 'Rejtana');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (3, 2, '48', '38-997', 'Zamosc', 'Polska', 'Polna');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (4, 3, '10a/37', '36-721', 'Kraków', 'Polska', 'Norymberska');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (5, 4, '51', '36-721', 'Kraków', 'Polska', 'Zachodnia');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (6, 5, '4', '36-721', 'Kraków', 'Polska', 'Pawia');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (7, 6, '1A', '00-001', 'Warszawa', 'Polska', 'Aleje Jerozolimskie');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (8, 7, '2B', '00-002', 'Kraków', 'Polska', 'Floriańska');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (9, 8, '3C', '00-003', 'Łódź', 'Polska', 'Piotrkowska');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (10, 8, '', '00-009', 'Krasnystaw', 'Polska', 'Czarna');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (11, 9, '4D', '00-004', 'Wrocław', 'Polska', 'Świdnicka');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (12, 10, '5E', '00-005', 'Poznań', 'Polska', 'Półwiejska');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (13, 11, '6F', '00-006', 'Gdańsk', 'Polska', 'Długa');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (14, 12, '7G', '00-007', 'Szczecin', 'Polska', 'Wojska Polskiego');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (15, 12, '89', '00-001', 'Warszawa', 'Polska', '3 maja');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (16, 13, '8H', '00-008', 'Lublin', 'Polska', 'Lubartowska');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (17, 14, '9I', '00-009', 'Katowice', 'Polska', 'Stawowa');
INSERT INTO address (id, user_id, local_number, post_code, city, country, street) VALUES (18, 15, '10J', '00-010', 'Białystok', 'Polska', 'Lipowa');


INSERT INTO employee (id, position_id, department) VALUES (3, 1, 'DEPARTMENT_1');
INSERT INTO employee (id, position_id, department) VALUES (4, 2, 'DEPARTMENT_2');
INSERT INTO employee (id, position_id, department) VALUES (5, 1, 'DEPARTMENT_2');

INSERT INTO client (id, pesel) VALUES (1, '89123458901');
INSERT INTO client (id, pesel) VALUES (2, '02779856702');
INSERT INTO client (id, pesel) VALUES (6, '12345678901');
INSERT INTO client (id, pesel) VALUES (7, '22345678902');
INSERT INTO client (id, pesel) VALUES (8, '32345678903');
INSERT INTO client (id, pesel) VALUES (9, '42345678904');
INSERT INTO client (id, pesel) VALUES (10, '52345678905');
INSERT INTO client (id, pesel) VALUES (11, '62345678906');
INSERT INTO client (id, pesel) VALUES (12, '72345678907');
INSERT INTO client (id, pesel) VALUES (13, '82345678908');
INSERT INTO client (id, pesel) VALUES (14, '92345678909');
INSERT INTO client (id, pesel) VALUES (15, '02345678900');

INSERT INTO register_confirmation_token_seq (next_val) VALUES (1);

INSERT INTO password_reset_token_seq (next_val) VALUES (1);



INSERT INTO bank_account (balance, client_id, opening_date, account_number, account_type, is_blocked) VALUES (2000.00, 1, '2024-05-13 02:33:06.560000', '31123456782427179921005413', 'INVESTMENT_ACCOUNT', false);
INSERT INTO bank_account (balance, client_id, opening_date, account_number, account_type, is_blocked) VALUES (1000.00, 1, '2024-05-13 02:33:06.560000', '76123456785091168560947874', 'PERSONAL_ACCOUNT', false);
INSERT INTO bank_account (balance, client_id, opening_date, account_number, account_type, is_blocked) VALUES (1500.00, 2, '2024-05-13 02:33:06.560000', '84123456788988384542428350', 'PERSONAL_ACCOUNT', false);

INSERT INTO transaction (amount, id, transaction_date, recipient_account_id, sender_account_id) VALUES (500.00, 1, '2024-05-13 02:33:06.639000', '31123456782427179921005413', '76123456785091168560947874');
INSERT INTO transaction (amount, id, transaction_date, recipient_account_id, sender_account_id) VALUES (300.00, 2, '2024-05-13 02:33:06.639000', '84123456788988384542428350', '76123456785091168560947874');
INSERT INTO transaction (amount, id, transaction_date, recipient_account_id, sender_account_id) VALUES (200.00, 3, '2024-05-13 02:33:06.639000', '84123456788988384542428350', '31123456782427179921005413');

INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (15000.00, null, 10, null, '2024-05-23', null, '2024-05-13 02:33:06.674724', 1, null, 3, 1, null, 'Motorcycle purchase', 'REQUESTED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (20000.00, null, 16, null, '2024-05-28', null, '2024-05-11 02:33:06.674724', 1, null, 5, 2, null, 'Home renovation', 'REQUESTED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (40000.00, 3.5, 24, 1916.67, '2024-06-02', 46000.00, '2024-05-12 02:33:06.674724', 2, '2024-05-14 04:35:06.674724', 3, 3, 'Application rejected due to low creditworthiness.', 'Land construction', 'REJECTED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (36000.00, 3.5, 20, 1953.00, '2024-06-02', 42300.00, '2024-05-13 02:33:06.674724', 1, '2024-05-18 12:38:06.674724', 3, 4, 'The application meets all requirements. Loan approved.', 'Car purchase', 'APPROVED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (8000.00, 6, 6, 1413.33, '2024-06-03', 8480.00, '2024-05-10 02:33:06.674724', 2, '2024-05-15 14:33:06.674724', 5, 5, 'After careful verification, the loan application has been approved.', 'Wedding', 'DENIED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (56000.00, 3.5, 40, 1610.00, '2024-06-04', 64400.00, '2024-05-13 02:33:06.674724', 2, '2024-05-16 12:56:06.674724', 3, 6, 'The application meets all requirements. Loan approved.', 'Start of business', 'ACCEPTED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (18000.00, null, 12, null, '2024-06-01', null, '2024-05-14 10:15:06.674724', 1, null, 3, 7, null, 'Dream vacation', 'REQUESTED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (22000.00, null, 18, null, '2024-06-05', null, '2024-05-11 11:20:06.674724', 1, null, 5, 8, null, 'Home appliances purchase', 'REQUESTED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (42000.00, 3.5, 26, 1730.77, '2024-06-07', 54600.00, '2024-05-09 12:25:06.674724', 2, '2024-05-15 05:45:06.674724', 3, 9, 'Unfortunately, the loan application was rejected. Reason: insufficient income.', 'Medical expenses', 'REJECTED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (38000.00, 3.5, 22, 1761.36, '2024-06-09', 48400.00, '2024-05-08 13:30:06.674724', 1, '2024-05-19 13:38:06.674724', 3, 10, 'The application has been positively reviewed. The loan is granted according to the terms of the agreement.', 'Boat purchase', 'APPROVED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (8500.00, 5, 8, 1106.25, '2024-06-11', 9350.00, '2024-05-12 14:35:06.674724', 2, '2024-05-16 15:33:06.674724', 5, 11, 'After careful verification, the loan application has been approved.', 'Divorce expenses', 'DENIED');
INSERT INTO loan (amount, interest_rate, loan_term, monthly_repayment_amount, start_date, total_repayment_amount, application_date, client_id, decision_date, employee_id, id, comment, loan_purpose, status) VALUES (58000.00, 3.2, 42, 1527.62, '2024-06-13', 76560.00, '2024-05-07 16:40:06.674724', 2, '2024-05-17 13:56:06.674724', 3, 12, 'After careful verification, the loan application has been approved.', 'Moving expenses', 'ACCEPTED');



