-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'events'
--
-- ---

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `tm_id` VARCHAR(30) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `artist_name` VARCHAR(100) NOT NULL,
  `date` DATETIME NOT NULL,
  `genre` VARCHAR(100) NOT NULL,
  `event_url` VARCHAR(150) NOT NULL,
  `venue` VARCHAR(150) NOT NULL,
  `venue_address` VARCHAR(200) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `zipcode` INTEGER(10) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `subgenre` VARCHAR(50) NOT NULL,
  `latitude` VARCHAR(50) NOT NULL,
  `longitude` VARCHAR(50) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(70) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `fullname` VARCHAR(100) NOT NULL,
  `createdOn` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users_events'
--
-- ---

DROP TABLE IF EXISTS `users_events`;

CREATE TABLE `users_events` (
  `id_users` INTEGER NOT NULL,
  `id_events` INTEGER NOT NULL
);

-- ---
-- Table 'users_friends'
--
-- ---

DROP TABLE IF EXISTS `users_friends`;

CREATE TABLE `users_friends` (
  `id_user` INTEGER NOT NULL,
  `id_friend` INTEGER NOT NULL
);

-- ---
-- Table 'artists'
--
-- ---

DROP TABLE IF EXISTS `artists`;

CREATE TABLE `artists` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `events` ADD FOREIGN KEY (id_artists) REFERENCES `artists` (`id`);
ALTER TABLE `users_events` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `users_events` ADD FOREIGN KEY (id_events) REFERENCES `events` (`id`);
ALTER TABLE `users_friends` ADD FOREIGN KEY (id_user) REFERENCES `users` (`id`);
ALTER TABLE `users_friends` ADD FOREIGN KEY (id_friend) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users_events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users_friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `artists` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `events` (`id`,`tm_id`,`name`,`artist_name`,`date`,`genre`,`event_url`,`venue`,`venue_address`,`city`,`zipcode`,`image`,`subgenre`,`latitude`,`longitude`,`id_artists`) VALUES
-- ('','','','','','','','','','','','','','','','');
-- INSERT INTO `users` (`id`,`email`,`password`,`fullname`) VALUES
-- ('','','','');
-- INSERT INTO `users_events` (`id_users`,`id_events`) VALUES
-- ('','');
-- INSERT INTO `users_friends` (`id_user`,`id_friend`) VALUES
-- ('','');
-- INSERT INTO `artists` (`id`,`name`) VALUES
-- ('','');
