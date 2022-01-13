SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS user;




/* Create Tables */

CREATE TABLE article
(
	id int NOT NULL AUTO_INCREMENT,
	file_path varchar(255),
	title varchar(255),
	create_date varchar(255),
	user_id int NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE favorite
(
	user_id int NOT NULL,
	article_id int NOT NULL
);


CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
	password varchar(255),
	mailaddress varchar(255),
	name varchar(255),
	introduction varchar(255),
	PRIMARY KEY (id),
	UNIQUE (id)
);



/* Create Foreign Keys */

ALTER TABLE favorite
	ADD FOREIGN KEY (article_id)
	REFERENCES article (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE article
	ADD FOREIGN KEY (user_id)
	REFERENCES user (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE favorite
	ADD FOREIGN KEY (user_id)
	REFERENCES user (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;



