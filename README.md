```

####### How to Run  ###########

sudo git clone https://github.com/RahulRNair/healthi.git
1. To Start UI Run Below Commands
cd healthi
npm install
npm start
2. To Start Backend Run Below commands
cd healthi
sudo node src/server/server.js 

UI url : http://localhost:8081/
Backend url : http://localhost:3000/api/*
Socket Url : http://localhost:3001/

###### Mysql Query ##############

CREATE TABLE `users` (`uid` int(11) AUTO_INCREMENT,`username` varchar(50),`password` varchar(200),`email` varchar(200),PRIMARY KEY (`uid`));
INSERT INTO users(username,password,email) VALUES('user','test','test@gmail.com');
INSERT INTO users(username,password,email) VALUES('user2','test2','test2@gmail.com');
CREATE TABLE `news` (
     `nid` int(11) AUTO_INCREMENT,
     `title` varchar(255) NOT NULL,
     `content` longtext NOT NULL,
     `status` int(2) NOT NULL,
     `uid` int(11) NOT NULL,
     PRIMARY KEY (`nid`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
    change the mysql connection accordingly in src/server/server.js
    
