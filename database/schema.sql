CREATE DATABASE IF NOT EXISTS morningstar_enterprises
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE morningstar_enterprises;

CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  email VARCHAR(190) NOT NULL,
  company VARCHAR(190) NULL,
  phone VARCHAR(80) NULL,
  message TEXT NOT NULL,
  source VARCHAR(80) NOT NULL DEFAULT 'website',
  status ENUM('new', 'reviewed', 'closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_contact_submissions_email (email),
  INDEX idx_contact_submissions_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
