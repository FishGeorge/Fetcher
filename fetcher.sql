-- MySQL dump 10.13  Distrib 5.7.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fetcher
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bbinfo`
--

DROP TABLE IF EXISTS `bbinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bbinfo` (
  `UserID` int(11) NOT NULL,
  `TotalDistance` int(11) NOT NULL DEFAULT '-1',
  `TotalTime` int(11) NOT NULL DEFAULT '-1',
  `Counter` int(11) NOT NULL DEFAULT '-1',
  `Turnover` int(11) NOT NULL DEFAULT '-1',
  `Rate` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`UserID`),
  CONSTRAINT `bbinfo_user_UserID_fk` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bbinfo`
--

LOCK TABLES `bbinfo` WRITE;
/*!40000 ALTER TABLE `bbinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `bbinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fetcherinfo`
--

DROP TABLE IF EXISTS `fetcherinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fetcherinfo` (
  `UserID` int(11) NOT NULL,
  `TotalDistance` int(11) NOT NULL DEFAULT '-1',
  `TotalTime` int(11) NOT NULL DEFAULT '-1',
  `Counter` int(11) NOT NULL DEFAULT '-1',
  `Turnover` int(11) NOT NULL DEFAULT '-1',
  `Rate` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`UserID`),
  CONSTRAINT `fetcherinfo_user_UserID_fk` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fetcherinfo`
--

LOCK TABLES `fetcherinfo` WRITE;
/*!40000 ALTER TABLE `fetcherinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `fetcherinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemextrainfo`
--

DROP TABLE IF EXISTS `itemextrainfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemextrainfo` (
  `ItemID` int(11) NOT NULL,
  `ExtraInfo` varchar(24) NOT NULL DEFAULT '',
  PRIMARY KEY (`ItemID`),
  CONSTRAINT `itemextrainfo_iteminfo_ItemID_fk` FOREIGN KEY (`ItemID`) REFERENCES `iteminfo` (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemextrainfo`
--

LOCK TABLES `itemextrainfo` WRITE;
/*!40000 ALTER TABLE `itemextrainfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `itemextrainfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iteminfo`
--

DROP TABLE IF EXISTS `iteminfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iteminfo` (
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(24) NOT NULL DEFAULT '',
  `Weight` int(11) NOT NULL DEFAULT '-1',
  `Size` int(11) NOT NULL DEFAULT '-1',
  `Price` int(11) NOT NULL DEFAULT '-1',
  `Location` varchar(24) NOT NULL DEFAULT '',
  `Type` int(11) NOT NULL DEFAULT '-1',
  `Picture` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=10003 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iteminfo`
--

LOCK TABLES `iteminfo` WRITE;
/*!40000 ALTER TABLE `iteminfo` DISABLE KEYS */;
INSERT INTO `iteminfo` VALUES (10001,'可口可乐(罐装)',330,330,250,'梅园中超超市',0,'D:/itempic/10001.png'),(10002,'雪碧(罐装)',330,330,250,'梅园中超超市',0,'D:/itempic/10002.png');
/*!40000 ALTER TABLE `iteminfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traderecordinfo`
--

DROP TABLE IF EXISTS `traderecordinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `traderecordinfo` (
  `TradeID` int(11) NOT NULL AUTO_INCREMENT,
  `FetcherID` int(11) NOT NULL,
  `BbID` int(11) NOT NULL,
  `WantedID` int(11) NOT NULL,
  `WantIDList` varchar(100) NOT NULL DEFAULT '',
  `StartTime` varchar(19) NOT NULL DEFAULT '',
  `FinishTime` varchar(19) NOT NULL DEFAULT '',
  `State` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`TradeID`),
  KEY `traderecordinfo_wantedinfo_FetcherID_fk` (`FetcherID`),
  KEY `traderecordinfo_wantedinfo_WantedID_fk` (`WantedID`),
  KEY `traderecordinfo_wantinfo_BbID_fk` (`BbID`),
  CONSTRAINT `traderecordinfo_wantedinfo_FetcherID_fk` FOREIGN KEY (`FetcherID`) REFERENCES `wantedinfo` (`FetcherID`),
  CONSTRAINT `traderecordinfo_wantedinfo_WantedID_fk` FOREIGN KEY (`WantedID`) REFERENCES `wantedinfo` (`WantedID`),
  CONSTRAINT `traderecordinfo_wantinfo_BbID_fk` FOREIGN KEY (`BbID`) REFERENCES `wantinfo` (`BbID`)
) ENGINE=InnoDB AUTO_INCREMENT=10003 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traderecordinfo`
--

LOCK TABLES `traderecordinfo` WRITE;
/*!40000 ALTER TABLE `traderecordinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `traderecordinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(10) NOT NULL DEFAULT '',
  `NickName` varchar(10) NOT NULL DEFAULT '',
  `Psw` varchar(16) NOT NULL DEFAULT '',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=10001 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10000,'','','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userinfo` (
  `UserID` int(11) NOT NULL,
  `Gender` tinyint(1) NOT NULL DEFAULT '-1',
  `PhoneNumber` varchar(11) NOT NULL DEFAULT '',
  `ExtraInfo` varchar(24) NOT NULL DEFAULT '',
  PRIMARY KEY (`UserID`),
  CONSTRAINT `userinfo_user_UserID_fk` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wantedinfo`
--

DROP TABLE IF EXISTS `wantedinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wantedinfo` (
  `FetcherID` int(11) NOT NULL,
  `WantedID` int(11) NOT NULL AUTO_INCREMENT,
  `StartingPoint` int(11) NOT NULL DEFAULT '-1',
  `Destination` int(11) NOT NULL DEFAULT '-1',
  `ArriveTime` varchar(19) NOT NULL DEFAULT '',
  `AcceptBigSize` tinyint(1) NOT NULL DEFAULT '-1',
  `AcceptSE` tinyint(1) NOT NULL DEFAULT '-1',
  `State` int(11) NOT NULL DEFAULT '-1',
  `Rate` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`WantedID`),
  KEY `wantedinfo_user_UserID_fk` (`FetcherID`),
  CONSTRAINT `wantedinfo_user_UserID_fk` FOREIGN KEY (`FetcherID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wantedinfo`
--

LOCK TABLES `wantedinfo` WRITE;
/*!40000 ALTER TABLE `wantedinfo` DISABLE KEYS */;
INSERT INTO `wantedinfo` VALUES (10000,10001,-1,-1,'',-1,-1,-1,-1);
/*!40000 ALTER TABLE `wantedinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wantinfo`
--

DROP TABLE IF EXISTS `wantinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wantinfo` (
  `BbID` int(11) NOT NULL,
  `WantID` int(11) NOT NULL AUTO_INCREMENT,
  `Destination` int(11) NOT NULL DEFAULT '-1',
  `AddressDetail` varchar(100) NOT NULL DEFAULT '',
  `ArriveTime` varchar(19) NOT NULL DEFAULT '',
  `AcceptND` tinyint(1) NOT NULL DEFAULT '-1',
  `Type` int(11) NOT NULL DEFAULT '-1',
  `ItemList` varchar(255) NOT NULL DEFAULT '',
  `Note` varchar(100) NOT NULL DEFAULT '',
  `Image` varchar(100) NOT NULL DEFAULT '',
  `State` int(11) NOT NULL DEFAULT '-1',
  `Rate` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`WantID`),
  KEY `wantinfo_user_UserID_fk` (`BbID`),
  CONSTRAINT `wantinfo_user_UserID_fk` FOREIGN KEY (`BbID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=10003 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wantinfo`
--

LOCK TABLES `wantinfo` WRITE;
/*!40000 ALTER TABLE `wantinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `wantinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-07 14:17:18
