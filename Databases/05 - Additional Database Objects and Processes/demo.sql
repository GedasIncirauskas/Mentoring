------------- VIEWS -------------------

--Views can be created in a database to provide a specific perspective on data.

--Account Summary:
--Displays a summary of all accounts, including account ID, balance, account owner, 
--and system account flag.
SELECT id, balance, account_owner, system_account FROM Account;

--Active Accounts:
--Displays all accounts with the status "Active".
SELECT A.id, A.balance, A.account_owner, A.system_account
FROM Account A
INNER JOIN Status S ON A.status_id = S.id
WHERE S.name = 'Active';

--Current Month Transactions:
--Displays all transactions from the current month.
SELECT T.id, T.source_account, T.destination_account, T.datetime, T.sum
FROM Transaction_operational T;

--Account Owner Transactions:
--Displays all transactions for a specific account owner.
SELECT T.id, T.source_account, T.destination_account, T.datetime, T.sum
FROM Transaction_operational T
INNER JOIN Account A ON T.source_account = A.id OR T.destination_account = A.id
WHERE A.account_owner = [ACCOUNT_OWNER_ID];

--Office Sales:
--Displays the total sales for each office.
SELECT O.id, O.city, O.name, O.total_sells_sum FROM Office O;

-------     CHECKS      ----------

--Checks are constraints that can be added to a database to ensure the data entered meets certain criteria

--Non-Negative Balance:
--Ensures that the balance of an account is always non-negative.
ALTER TABLE Account ADD CONSTRAINT non_negative_balance CHECK (balance >= 0);

--Valid Account Status:
--Ensures that an account has a valid status ID that corresponds to a status in the 
--Status table.
ALTER TABLE Account ADD CONSTRAINT valid_account_status CHECK (status_id IN (SELECT id FROM Status));

--Valid Source Account:
--Ensures that the source account in a transaction exists in the Account table.
ALTER TABLE Transaction_operational ADD CONSTRAINT valid_source_account CHECK (source_account IN (SELECT id FROM Account));

--Valid Destination Account:
--Ensures that the destination account in a transaction exists in the Account table.
ALTER TABLE Transaction_operational ADD CONSTRAINT valid_destination_account CHECK (destination_account IN (SELECT id FROM Account));

--Valid Parent Page:
--Ensures that the parent page in a site page exists in the Site Page table.
ALTER TABLE Site_page ADD CONSTRAINT valid_parent_page CHECK (parent_page IN (SELECT id FROM Site_page) OR parent_page IS NULL);

-------     TRIGGER       ----------

--Triggers are database objects that are automatically executed in response to specific events, 
--such as an INSERT, UPDATE, or DELETE statement on a table.

--Update Account Balance:
--Automatically updates the balance of an account after a transaction is inserted or updated.
CREATE TRIGGER update_account_balance
AFTER INSERT OR UPDATE ON Transaction_operational
FOR EACH ROW
BEGIN
UPDATE Account
SET balance = balance - NEW.sum
WHERE id = NEW.source_account;

UPDATE Account
SET balance = balance + NEW.sum
WHERE id = NEW.destination_account;
END;

--Update Office Total Sales Sum:
--Automatically updates the total sales sum of an office after a transaction 
--is inserted or updated.
CREATE TRIGGER update_office_total_sales_sum
AFTER INSERT OR UPDATE ON Transaction_operational
FOR EACH ROW
BEGIN
UPDATE Office
SET total_sales_sum = total_sales_sum + NEW.sum
WHERE id = (SELECT office_id FROM Account WHERE id = NEW.destination_account);
END;

--Archive Old Transactions:
--Automatically archives transactions that are more than a month old.
CREATE TRIGGER archive_old_transactions
AFTER INSERT ON Transaction_operational
FOR EACH ROW
BEGIN
IF (SELECT DATEDIFF(month, NEW.date_time, GETDATE())) > 1 THEN
INSERT INTO Transaction_archive (id, source_account, destination_account, date_time, sum)
VALUES (NEW.id, NEW.source_account, NEW.destination_account, NEW.date_time, NEW.sum);
DELETE FROM Transaction_operational WHERE id = NEW.id;
END IF;
END;

-------     STORED ROUTINES     ----------

--Stored routines are precompiled SQL statements stored in the database

--Get account balance by account id:
CREATE PROCEDURE getAccountBalance(IN p_account_id INT)
BEGIN
  SELECT balance 
  FROM Account 
  WHERE id = p_account_id;
END;

--Transfer Funds:
--Automates the process of transferring funds from one account to another.

CREATE PROCEDURE transfer_funds(IN p_source_account INT, IN p_destination_account INT, IN p_sum DECIMAL)
BEGIN
DECLARE @source_balance DECIMAL;
SELECT @source_balance = balance FROM Account WHERE id = p_source_account;
IF @source_balance >= p_sum THEN
BEGIN
UPDATE Account
SET balance = balance - p_sum
WHERE id = p_source_account;
   UPDATE Account 
   SET balance = balance + p_sum 
   WHERE id = p_destination_account; 
   INSERT INTO Transaction_operational (source_account, destination_account, date_time, sum) 
   VALUES (p_source_account, p_destination_account, GETDATE(), p_sum); 
END; 

--Check Account Balance:
--Retrieves the current balance of a specified account.

CREATE FUNCTION check_account_balance(IN p_account_id INT)
RETURNS DECIMAL
BEGIN
DECLARE @balance DECIMAL;
SELECT @balance = balance FROM Account WHERE id = p_account_id;
RETURN @balance;
END;

--Search Transactions:
--Searches for transactions based on specific criteria, such as date range, account ID, etc.

CREATE PROCEDURE search_transactions(IN p_start_date DATETIME, IN p_end_date DATETIME, IN p_account_id INT)
BEGIN
SELECT * FROM Transaction_operational
WHERE date_time BETWEEN p_start_date AND p_end_date
AND (source_account = p_account_id OR destination_account = p_account_id);
END;

