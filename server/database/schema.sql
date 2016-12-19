-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `fullname` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'events'
--
-- ---

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_users` INTEGER NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `date` DATETIME NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `venue` VARCHAR(150) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `zipcode` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users_friends'
--
-- ---

DROP TABLE IF EXISTS `users_friends`;

CREATE TABLE `users_friends` (
  `user_id` INTEGER NOT NULL,
  `friend_id` INTEGER NOT NULL,
  PRIMARY KEY ()
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `events` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `users_friends` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `users_friends` ADD FOREIGN KEY (friend_id) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `events` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users_friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`email`,`password`,`fullname`) VALUES
-- ('','','','');
-- INSERT INTO `events` (`id`,`id_users`,`name`,`date`,`location`,`venue`,`city`,`zipcode`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `users_friends` (`user_id`,`friend_id`) VALUES
-- ('','');
