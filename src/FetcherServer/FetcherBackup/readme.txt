此为Fetcher工程文件夹根目录。
包含四个包：dbservice, filter, view, utils
以及八个java文件：ListenForever.java, MainWindow.java, matchOrder.java, MinaTimeClient.java, ServerFrame.java, ServerHandler.java, SessionManager.java, TimeClientHandler.java
此八个java文件为服务器核心代码，为服务器提供了可视化窗口并实现了服务器业务逻辑。
此四个包为服务器的正常运转提供了必要的接口。
服务器采用apache-mina框架，程序入口为MainWindow.java
本工程引用的外部包为：fastjson-1.2.49.jar, mina-core-2.0.19.jar, mysql-connector-java-5.1.45-bin.jar, slf4j-api-1.7.25.jar, slf4j-simple-1.7.25.jar
本服务器代码的作者为：李元亨，王帆，工程参与者为：龚呈，孟霖，陈玥，井劭杰