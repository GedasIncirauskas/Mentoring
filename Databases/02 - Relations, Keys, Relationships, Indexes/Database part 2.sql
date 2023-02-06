/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 16.0 		*/
/*  Created On : 12-Nov-2022 7:04:54 PM 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0
; 
/* Drop Tables */

DROP TABLE IF EXISTS `accounts` CASCADE
;

DROP TABLE IF EXISTS `accounts_m2m_statuses` CASCADE
;

DROP TABLE IF EXISTS `offices` CASCADE
;

DROP TABLE IF EXISTS `owners` CASCADE
;

DROP TABLE IF EXISTS `site_pages` CASCADE
;

DROP TABLE IF EXISTS `status` CASCADE
;

DROP TABLE IF EXISTS `transaction_operation` CASCADE
;

/* Create Tables */

CREATE TABLE `accounts`
(
	`a_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`a_owner` VARCHAR(250) NOT NULL,
	`a_system` VARCHAR(250) NOT NULL,
	`a_balance` VARCHAR(250) NOT NULL,
	CONSTRAINT `PK_accounts` PRIMARY KEY (`a_id` ASC)
)

;

CREATE TABLE `accounts_m2m_statuses`
(
	`a_id` INT NOT NULL,
	`s_id` INT NOT NULL,
	`a_m2m_update` DATETIME NOT NULL,
	CONSTRAINT `PK_accounts_m2m_statuses` PRIMARY KEY (`a_id` ASC, `s_id` ASC)
)

;

CREATE TABLE `offices`
(
	`o_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`o_city` VARCHAR(50) NOT NULL,
	`o_name` VARCHAR(50) NOT NULL,
	`o_sales` DECIMAL(10,2) NOT NULL,
	CONSTRAINT `PK_office` PRIMARY KEY (`o_id` ASC)
)

;

CREATE TABLE `owners`
(
	`own_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`onw_name` VARCHAR(50) NOT NULL,
	CONSTRAINT `PK_owner` PRIMARY KEY (`own_id` ASC)
)

;

CREATE TABLE `site_pages`
(
	`site_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`site_parent` INT UNSIGNED NOT NULL,
	`site_name` VARCHAR(50) NOT NULL,
	CONSTRAINT `PK_site_pages` PRIMARY KEY (`site_id` ASC)
)

;

CREATE TABLE `status`
(
	`s_id` INT NOT NULL,
	`s_name` VARCHAR(250) NULL,
	CONSTRAINT `PK_status` PRIMARY KEY (`s_id` ASC)
)

;

CREATE TABLE `transaction_operation`
(
	`tran_id` INT NOT NULL,
	`tran_source_account` VARCHAR(250) NOT NULL,
	`tran_destination_account` VARCHAR(250) NOT NULL,
	`tran_sum` DECIMAL(13,2) NOT NULL,
	`trans_date` DATETIME NOT NULL,
	CONSTRAINT `PK_transaction_operation` PRIMARY KEY (`tran_id` ASC)
)

;

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE `accounts` 
 ADD CONSTRAINT `UNQ_system` UNIQUE (`a_system` ASC)
;

ALTER TABLE `accounts_m2m_statuses` 
 ADD INDEX `IXFK_accounts_m2m_statuses_accounts` (`s_id` ASC)
;

ALTER TABLE `offices` 
 ADD INDEX `IXFK_offices_accounts` (`o_id` ASC)
;

ALTER TABLE `owners` 
 ADD INDEX `IXFK_owners_accounts` (`own_id` ASC)
;

ALTER TABLE `site_pages` 
 ADD INDEX `IXFK_site_pages_offices` (`site_id` ASC)
;

ALTER TABLE `status` 
 ADD INDEX `IXFK_status_accounts` (`s_id` ASC)
;

ALTER TABLE `transaction_operation` 
 ADD INDEX `IXFK_transaction_operation_accounts` (`tran_id` ASC)
;

/* Create Foreign Key Constraints */

ALTER TABLE `accounts_m2m_statuses` 
 ADD CONSTRAINT `FK_accounts_m2m_statuses_accounts`
	FOREIGN KEY (`s_id`) REFERENCES `accounts` (`a_id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `offices` 
 ADD CONSTRAINT `FK_offices_accounts`
	FOREIGN KEY (`o_id`) REFERENCES `accounts` (`a_id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `owners` 
 ADD CONSTRAINT `FK_owners_accounts`
	FOREIGN KEY (`own_id`) REFERENCES `accounts` (`a_id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `site_pages` 
 ADD CONSTRAINT `FK_site_pages_offices`
	FOREIGN KEY (`site_id`) REFERENCES `offices` (`o_id`) ON DELETE Restrict ON UPDATE Restrict
;

ALTER TABLE `transaction_operation` 
 ADD CONSTRAINT `FK_transaction_operation_accounts`
	FOREIGN KEY (`tran_id`) REFERENCES `accounts` (`a_id`) ON DELETE Restrict ON UPDATE Restrict
;

SET FOREIGN_KEY_CHECKS=1
; 