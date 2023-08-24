package jdbc

import java.sql.DriverManager
import java.sql.Connection

@main def hello: Unit =

  object ScalaJdbcConnectSelect:

    def main(args: Array[String]) =
      // connect to the database named "mysql" on the localhost
      val driver = "com.mysql.jdbc.Driver"
      val url = "jdbc:mysql://localhost/mysql"
      val username = "root"
      val password = "Kayal23"

      // there's probably a better way to do this
      var connection:Connection = null

      try 
        // make the connection
        Class.forName(driver)
        connection = DriverManager.getConnection(url, username, password)

        // create the statement, and run the select query
        val statement = connection.createStatement()
        val resultSet = statement.executeQuery("select * from user_details")
        while resultSet.next()  do
          val host = resultSet.getString("host")
          val user = resultSet.getString("user")
          println("kayal-host, user = " + host + ", " + user)
        
      catch 
        case e => e.printStackTrace
      
      connection.close()

  println("Hello world!")
  println(msg)

def msg = "I was compiled by Scala 3. :)"
