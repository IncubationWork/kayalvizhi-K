import java.sql.DriverManager
import java.sql.Connection
import java.sql.ResultSet
import scala.io.StdIn.readLine
import java.sql.Date
import java.time.LocalDate

  object ScalaJdbcConnectSelect:

    def main(args: Array[String]) : Unit =
      val url = "jdbc:mysql://localhost/scala_database?characterEncoding=UTF-8"
      val username = "root"
      val password = "Kayal23"
      var connection:Connection = null
      
      startMethod()

      //user functions
      def deletePost(userId: String): Unit = 
        println("\n----------------Delete Post Module----------------")
        var i = 1;
        try 
          connection = DriverManager.getConnection(url, username, password)
          println("connected")
          val statement = connection.createStatement()
          val query = s"""SELECT postid, content FROM user_post WHERE userid = '$userId'"""
          val resultSet = statement.executeQuery(query)
          var testpost = ""
          var testpid = ""
          println("\n Your Posts Are:\n")
          while resultSet.next()  do
            val pid = resultSet.getString("postid")
            val content = resultSet.getString("content")
            println(s"        $i. $content - postid : $pid")
            i = i + 1
            testpost = content
            testpid = pid

          if testpost == "" then
            println(s"\n No post available\n")
          else
            println("\n Enter the Post ID you want to delete:")
            val del_id = readLine()
            var postid = ""
            val statement = connection.createStatement()
            val query = s"""SELECT postid FROM user_post WHERE postid = '$del_id'"""
            val resultSet = statement.executeQuery(query)
            while resultSet.next()  do
              val pid = resultSet.getString("postid")
              postid = pid

            if postid == "" then
              println(s"\n No command available for that post\n")
            else
              val insertStatement = connection.prepareStatement("delete from user_post where postid = ?")
              insertStatement.setString(1, del_id)
              val rowsAffected = insertStatement.executeUpdate()
              println(s"Delete Query Executed. $rowsAffected rows deleted.")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
        userFunc(userId)

      def createPost(userId: String): Unit = 
        println("\n----------------Post Module----------------");
        println(s"\n Your User ID is $userId")
        println("\n Enter your Post Content:")
        val content = readLine()
        val p = Post(userId, content)
        try 
          connection = DriverManager.getConnection(url, username, password)
          println("connected")
          val insertStatement = connection.prepareStatement("INSERT INTO user_post (userid, content, createdon) VALUES (?, ?, ?)")
          insertStatement.setString(1, p.user_id)
          insertStatement.setString(2, p.postContent)
          val currentDate = Date.valueOf(LocalDate.now())
          insertStatement.setDate(3, currentDate)
          val rowsAffected = insertStatement.executeUpdate()
          println(s"Insert Query Executed. $rowsAffected rows inserted.")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
            println("connection closed")
        userFunc(userId)

      def viewPost(userId: String): Unit = 
        var i = 1;
        println("\n----------------View Post Module----------------");
        try 
          connection = DriverManager.getConnection(url, username, password)
          println("connected")
          val statement = connection.createStatement()
          val query = s"""SELECT postid, content FROM user_post WHERE userid = '$userId'"""
          val resultSet = statement.executeQuery(query)
          var testpost = ""
          var testpid = ""
          println("\n Your Posts Are:\n")
          while resultSet.next()  do
            val pid = resultSet.getString("postid")
            val content = resultSet.getString("content")
            println(s"        $i. $content - postid : $pid")
            i = i + 1
            testpost = content
            testpid = pid

          if testpost == "" then
            println(s"\n No post available\n")
          else
            println(s"\n               1. Command on Post")
            println(s"\n               2. View Command of an particular post")
            println(s"\n               3. Go Back")
            println(s"\n             Enter your choice:")
            val uchoice = scala.io.StdIn.readInt()
            uchoice match
              case 1 => command(userId)
              case 2 => viewCommand(userId)
              case 3 => userFunc(userId)
              case _: Int => println("\n                     Thank You")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
        userFunc(userId)

      def viewCommand(userId: String): Unit = 
        var i = 1;
        try 
          connection = DriverManager.getConnection(url, username, password)
          println("connected")
          val statement = connection.createStatement()
          val resultSet = statement.executeQuery("SELECT postid, content FROM user_post")
          println("\n Posts Are:\n")
          while resultSet.next()  do
            val pid = resultSet.getString("postid")
            val content = resultSet.getString("content")
            println(s"        $i. $content - postid : $pid")
            i = i + 1 
          var postid = ""
          println("\n---------------- View Command Module----------------");
          println("\nEnter the Post ID :")
          var postid1 = readLine()
          val statement1 = connection.createStatement()
          val query = s"""SELECT * FROM user_command WHERE postid = '$postid1'"""
          val resultSet1 = statement1.executeQuery(query)
          while resultSet1.next()  do
            val pid = resultSet1.getString("postid")
            val command = resultSet1.getString("command")
            val cdate = resultSet1.getString("createdon")
            postid = pid
          if postid == "" then
            println(s"\n No command available for that post\n")
          else
            println("this")
            var con = ""
            val statement = connection.createStatement()
            val query = s"""SELECT * FROM user_post WHERE postid = '$postid1'"""
            val resultSet = statement.executeQuery(query)
            while resultSet.next()  do
              val pid = resultSet.getString("postid")
              val uid = resultSet.getString("userid")
              val content = resultSet.getString("content")
              val cdate = resultSet.getString("createdon")
              con = content
            val statement2 = connection.createStatement()
            val query1 = s"""SELECT * FROM user_command WHERE postid = '$postid1'"""
            val resultSet2 = statement2.executeQuery(query1)
            println(s"\n     Commands for the Post - $con")
            while resultSet2.next()  do
              val pid = resultSet2.getString("postid")
              val command = resultSet2.getString("command")
              val cdate = resultSet2.getString("createdon")
              println(s"\n           * $command")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
        userFunc(userId)

      def command(userId: String): Unit = 
        var i = 1;
        try 
          connection = DriverManager.getConnection(url, username, password)
          val statement = connection.createStatement()
          val resultSet = statement.executeQuery("SELECT postid, content FROM user_post")
          println("\n Posts Are:\n")
          while resultSet.next()  do
            val pid = resultSet.getString("postid")
            val content = resultSet.getString("content")
            println(s"        $i. $content - postid : $pid")
            i = i + 1  
          println("\n----------------Command Module----------------");
          var postid = ""
          println("\nEnter the Post ID :")
          postid = readLine()
          val statement1 = connection.createStatement()
          val query = s"""SELECT postid FROM user_post WHERE postid = '$postid'"""
          val resultSet1 = statement1.executeQuery(query)
          while resultSet1.next()  do
            val pid = resultSet1.getString("postid")
            postid = pid
          if postid == "" then
            println(s"\n Give a valid Post ID.\n")
          else
            println("\n Enter Your Commands:")
            val comm = readLine()
            val c = Command(postid, comm)
            val insertStatement = connection.prepareStatement("INSERT INTO user_command (postid, command, createdon) VALUES (?, ?, ?)")
            insertStatement.setString(1, c.postid_comm)
            insertStatement.setString(2, c.command)
            val currentDate = Date.valueOf(LocalDate.now())
            insertStatement.setDate(3, currentDate)
            val rowsAffected = insertStatement.executeUpdate()
            println(s"Insert Query Executed. $rowsAffected rows inserted.")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
        userFunc(userId)

      def follow(userId: String): Unit = 
        println("\n----------------Follow Module----------------");
        var i = 1;
        var testfuser = ""
        var fid = ""
        try 
          connection = DriverManager.getConnection(url, username, password)
          println("connected")
          val statement = connection.createStatement()
          val query = s"""SELECT * FROM user_details WHERE id != '$userId' AND id NOT IN (SELECT foll_id FROM follower_table WHERE userid = '$userId')"""
          val resultSet = statement.executeQuery(query)
          println("\n Users Are:\n")
          while resultSet.next()  do
            val uid = resultSet.getString("id")
            val uname = resultSet.getString("name")
            println(s"        $i. User name is - $uname and ID is $uid")
            i = i + 1
          println("\n Enter the user ID you want to follow:")
          val fuser = readLine()
          val statement1 = connection.createStatement()
          val query1 = s"""SELECT id,name FROM user_details WHERE id = '$fuser'"""
          val resultSet1 = statement1.executeQuery(query1)
          while resultSet1.next()  do
            val uid = resultSet1.getString("id")
            val uname = resultSet1.getString("name")
            testfuser = uname
            fid = uid
          if testfuser == "" then
            println("\n  Kindly,Enter a valid user id.")
          else
            val f = Follower(userId, testfuser, fid)
            val insertStatement = connection.prepareStatement("INSERT INTO follower_table (userid, foll_name, foll_id, createdon) VALUES (?, ?, ?, ?)")
            insertStatement.setString(1, f.follow_userid)
            insertStatement.setString(2, f.follow_name)
            insertStatement.setString(3, f.follower_id)
            val currentDate = Date.valueOf(LocalDate.now())
            insertStatement.setDate(4, currentDate)
            val rowsAffected = insertStatement.executeUpdate()
            println(s"Insert Query Executed. $rowsAffected rows inserted.")
            println(s"Now you are following $testfuser")
          catch 
            case e: Exception => e.printStackTrace()
          finally
            if connection != null then
              connection.close()
        userFunc(userId)

      def unfollow(userId: String): Unit =
        println("\n----------------Un Follow Module----------------");
        var i = 1;
        var testfuser = ""
        var fid = ""
        try 
          connection = DriverManager.getConnection(url, username, password)
          println("connected")
          val statement = connection.createStatement()
          val query = s"""SELECT userid, foll_name, foll_id FROM follower_table WHERE userid = '$userId'"""
          val resultSet = statement.executeQuery(query)
          println("\n Your followings Are:\n")
          while resultSet.next()  do
            val uid = resultSet.getString("userid")
            val uname = resultSet.getString("foll_name")
            val follid = resultSet.getString("foll_id")
            fid = uid
            println(s"        $i. Follower name is - $uname and ID is $follid")
            i = i + 1
          println("\n Enter the Follower ID you want to unfollow:")
          val fuser = readLine()
          if fid == "" then
            println("\n You are not following any user:")
          else 
            val insertStatement = connection.prepareStatement("delete from follower_table where userid = ? and foll_id = ?")
            insertStatement.setString(1, userId)
            insertStatement.setString(2, fuser)
            val rowsAffected = insertStatement.executeUpdate()
            println(s"Delete Query Executed. $rowsAffected rows deleted.")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
        userFunc(userId)

      def viewfollow(userId: String): Unit = 
        println("\n----------------View Follow Module----------------");
        var testfollowname = ""
        try 
          connection = DriverManager.getConnection(url, username, password)
          val statement = connection.createStatement()
          val query = s"""SELECT foll_name FROM follower_table WHERE userid = '$userId'"""
          val resultSet = statement.executeQuery(query)
          println("\n Your Followings are:")
          while resultSet.next()  do
            val uname = resultSet.getString("foll_name")
            testfollowname = uname
            println(s"\n * $uname")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
        if testfollowname == "" then
          println("\n    No Followers")
        userFunc(userId)

      //email validation
      object Validator:
        def isValidUserName (testname : String) : Boolean =
          if testname.isEmpty() || testname.length == 0 then false else true
        
        def isValidEmail(testemail: String): Boolean = 
          val emailPattern = "^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})$"
          testemail.matches(emailPattern)

        def isValidPassword(password: String): Boolean = 
          val passwordPattern = "^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$"
          password.matches(passwordPattern)
  
      //checkinput class
      class CheckInput(var iname : String, var imail : String, var ipass : String, var iconpass : String):
        val trimedInputname = iname.trim();
        val isname = Validator.isValidUserName(trimedInputname)
        val isemail = Validator.isValidEmail(imail)
        var ispass = Validator.isValidPassword(ipass)

        if isemail == false then
          println("Give a valid mail ID")

        if isname == false then
          println("User name cannot be empty")

        if ispass == true then
          var passCheck = if (ipass == iconpass) then "true" else "false"
          if (passCheck == "true") then
            println(s"Check - Your password and confirm password is equal")
          else
            ispass = false
            println(s"Your password and confirm password is not equal")
        else
          println("Your password should be minimum of 8 characters and also have a special character")

        if isname == true && isemail == true && ispass == true then
          //check wheather the user already exist
          try 
            connection = DriverManager.getConnection(url, username, password)

            val statement = connection.createStatement()
            val query = s"""SELECT email FROM user_details WHERE email = '$imail'"""
            val resultSet = statement.executeQuery(query)
            var testmail = "mail"
            while resultSet.next()  do
              val email = resultSet.getString("email")
              testmail = email

            val test = testmail == imail
            //check email
            if testmail == imail then
              println("User is already exist")
            else
              val tu = User(iname, imail, ipass, iconpass)
              val insertStatement = connection.prepareStatement("INSERT INTO user_details (name, email, password, createdon) VALUES (?, ?, ?, ?)")
              insertStatement.setString(1, tu.user_name)
              insertStatement.setString(2, tu.user_email)
              insertStatement.setString(3, tu.user_password)
              val currentDate = Date.valueOf(LocalDate.now())
              insertStatement.setDate(4, currentDate)
              val rowsAffected = insertStatement.executeUpdate()
              println(s"Insert Query Executed. $rowsAffected rows inserted.")
              startMethod()  
          catch 
            case e: Exception => e.printStackTrace()
          finally
            if connection != null then
              connection.close()
        else
          println("\n                    Sign Up process failed, Give a valid input\n")
          startMethod()

      
      def userFunc(uId: String): Unit = 
        println(s"               1. Create a post")
        println(s"               2. Delete your post")
        println(s"               3. View your existing Post")
        println(s"               4. command on post")
        println(s"               5. Like and Dislike a post")
        println(s"               6. Count of Like and Dislike of a post")
        println(s"               7. View command")
        println(s"               8. Follow a member")
        println(s"               9. View your following")
        println(s"               10. Unfollow")
        println(s"               11. Sign Out")
        println(s"             Enter your choice:")
        val uchoice = scala.io.StdIn.readInt()
        uchoice match
          case 1 => createPost(uId)
          case 2 => deletePost(uId)
          case 3 => viewPost(uId) 
          case 4 => command(uId)
          case 5 => likeDislike(uId)
          case 6 => countLikeDislike(uId)
          case 7 => viewCommand(uId)
          case 8 => follow(uId)  
          case 9 => viewfollow(uId)
          case 10 => unfollow(uId)
          case 11 => startMethod()
          case _: Int => println("\n                     Thank You")

      class LogIn(var uimail : String, var uipass : String):
        try 
          connection = DriverManager.getConnection(url, username, password)
          println("connected")
          val statement = connection.createStatement()
          val query = s"""SELECT * FROM user_details WHERE email = '$uimail' and password = '$uipass'"""
          val resultSet = statement.executeQuery(query)
          var testmail = "mail"
          var testpass = "pas"
          var testname = ""
          var testid = ""
          while resultSet.next()  do
            val id = resultSet.getString("id")
            val name = resultSet.getString("name")
            val email = resultSet.getString("email")
            val pass = resultSet.getString("password")
            testmail = email
            testpass = pass
            testname = name
            testid = id
        
          //check email
          if testmail == uimail && testpass == uipass then
            println(s"\n                Welcome $testname")
            userFunc(testid);
          else
            println("Give a valid Email or Password")
            startMethod()
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()

      def signIn(): Unit = 
        println("--------------------------SIGN IN--------------------------------")
        println("                      1. Enter Your Email:                         \n")
        val umail = readLine()
        println("                      2. Enter Your password:                         \n")
        val upass = readLine()
        println(s"Your email is $umail and your password is $upass")
        val siu = SignInUser(umail, upass)
        println("\n SignIn Case - Email: "+siu.signInEmail)
        val log = LogIn(siu.signInEmail, siu.signInPassword)
  
      def signUp(): Unit =
        println("--------------------------SIGN UP--------------------------------")
        println("                      1. Enter Your Name:                         \n")
        val name = readLine()
        println("                      2. Enter Email:                         \n")
        val mail = readLine()
        println("                      3. Enter password:                         \n")
        val pass = readLine()
        println("                      4. Enter password again(confirm password):                         \n")
        val conpass = readLine()
        //check input
        val u = User(name, mail, pass, conpass)
        println("\n User case - name : "+ u.user_name)
        val input = CheckInput(u.user_name, u.user_email, u.user_password, u.user_conform_password)
          
      def startMethod(): Unit =
        println("-------------------------SOCIAL MEDIA-------------------------------\n")
        println("                         1.Sign In                                  ")
        println("                         2.Sign Up                                  ")
        println("                         3.Exit                                  ")
        println("If you want to 'Sign In' press 1 or If you are not a existing user, For 'Sign Up' press 2. Enter your Choice:")
        val choice = scala.io.StdIn.readInt()

        choice match
          case 1 => signIn()
          case 2 => signUp()   
          case _: Int => println("\n                     Thank You")

      def displayPost(): Unit =
        var i = 1;
        try 
          connection = DriverManager.getConnection(url, username, password)
          val statement = connection.createStatement()
          val resultSet = statement.executeQuery("SELECT postid, content FROM user_post")
          println("\n Posts Are:\n")
          while resultSet.next()  do
            val pid = resultSet.getString("postid")
            val content = resultSet.getString("content")
            println(s"        $i. $content - postid : $pid")
            i = i + 1
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
      
      def likeDislike(userId: String): Unit =
        println("\n-----------------------Like and Dislike Module-----------------------\n")
        displayPost()
        println("\n               Do you want to Like or Dislike")
        println("\n                   1. Like")
        println("\n                   2. DisLike")
        println("\n                   3. Go Back")
        val choice = scala.io.StdIn.readInt()

        choice match
          case 1 => likePost(userId)
          case 2 => dislikePost(userId)   
          case 3 => userFunc(userId)
          case _: Int => println("\n                     Thank You")
        
      def likePost(ufid: String): Unit =
        println("\n-------------------- Like Module---------------------")
        var postid = ""
        println("\nEnter the Post ID :")
        postid = readLine()
        try 
          connection = DriverManager.getConnection(url, username, password)
          val statement = connection.createStatement()
          val query = s"""SELECT postid FROM user_post WHERE postid = '$postid'"""
          val resultSet = statement.executeQuery(query)
          while resultSet.next()  do
            val pid = resultSet.getString("postid")
            postid = pid
          if postid == "" then
            println(s"\n Give a valid Post ID.\n")
          else
            val l = LikePost(postid, ufid, "1", "0")
            val insertStatement = connection.prepareStatement("delete from reaction where postid = ? and userid = ?")
            insertStatement.setString(1, l.like_postid)
            insertStatement.setString(2, l.like_userid)
            val rowsAffected = insertStatement.executeUpdate()
            println(s"Delete Query Executed. $rowsAffected rows deleted.")
            val insertStatement1 = connection.prepareStatement("INSERT INTO reaction (postid, userid, liked, dislike, createdon) VALUES (?, ?, ?, ?, ?)")
            insertStatement1.setString(1, l.like_postid)
            insertStatement1.setString(2, l.like_userid)
            insertStatement1.setString(3, l.like_like)
            insertStatement1.setString(4, l.like_dislike)
            val currentDate = Date.valueOf(LocalDate.now())
            insertStatement1.setDate(5, currentDate)
            val rowsAffected1 = insertStatement1.executeUpdate()
            println(s"Insert Query Executed. $rowsAffected1 rows inserted.")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
        userFunc(ufid)

      def dislikePost(ufid: String): Unit =
        println("\n-------------------- DisLike Module---------------------")
        var postid = ""
        println("\nEnter the Post ID :")
        postid = readLine()
        try 
          connection = DriverManager.getConnection(url, username, password)
          val statement = connection.createStatement()
          val query = s"""SELECT postid FROM user_post WHERE postid = '$postid'"""
          val resultSet = statement.executeQuery(query)
          while resultSet.next()  do
            val pid = resultSet.getString("postid")
            postid = pid
          if postid == "" then
            println(s"\n Give a valid Post ID.\n")
          else
            val dl = LikePost(postid, ufid, "0", "1")
            val insertStatement = connection.prepareStatement("delete from reaction where postid = ? and userid = ?")
            insertStatement.setString(1, dl.like_postid)
            insertStatement.setString(2, dl.like_userid)
            val rowsAffected = insertStatement.executeUpdate()
            println(s"Insert Query Executed. $rowsAffected rows deleted.")
            val insertStatement1 = connection.prepareStatement("INSERT INTO reaction (postid, userid, liked, dislike, createdon) VALUES (?, ?, ?, ?, ?)")
            insertStatement1.setString(1, dl.like_postid)
            insertStatement1.setString(2, dl.like_userid)
            insertStatement1.setString(3, dl.like_like)
            insertStatement1.setString(4, dl.like_dislike)
            val currentDate = Date.valueOf(LocalDate.now())
            insertStatement1.setDate(5, currentDate)
            val rowsAffected1 = insertStatement.executeUpdate()
            println(s"Insert Query Executed. $rowsAffected1 rows inserted.")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
        userFunc(ufid)

      def countLikeDislike(userId: String): Unit =
        println("\n-----------------------Count Like and Dislike Module-----------------------\n")
        displayPost()
        var postid = ""
        println("\nEnter the Post ID :")
        postid = readLine()
        try 
          connection = DriverManager.getConnection(url, username, password)
          val statement = connection.createStatement()
          val query = s"""SELECT postid FROM user_post WHERE postid = '$postid'"""
          val resultSet = statement.executeQuery(query)
          while resultSet.next()  do
            val pid = resultSet.getString("postid")
            postid = pid
          var likeid = ""
          if postid == "" then
            println(s"\n Give a valid Post ID.\n")
          else
            val statement = connection.createStatement()
            val query = s"""SELECT postid, userid FROM reaction WHERE postid = '$postid'"""
            val resultSet = statement.executeQuery(query)
            while resultSet.next()  do
              val pid = resultSet.getString("postid")
              val uid = resultSet.getString("userid")
              likeid = pid
            if likeid == "" then
              println("\n No Likes and Commands for this post")
            else
              println("\n Count of Like and DisLike for this post is:")
              val statement = connection.createStatement()
              val query = s"""SELECT postid, count(liked) AS count FROM reaction WHERE liked = 1 and postid = '$likeid' GROUP BY postid"""
              val resultSet = statement.executeQuery(query)
              while resultSet.next()  do
                val pid = resultSet.getString("postid")
                val likecount = resultSet.getString("count")
                println(s"\n Likes: $likecount")
              val statement1 = connection.createStatement()
              val query1 = s"""SELECT postid, count(dislike) AS count FROM reaction WHERE dislike = 1 and postid = '$likeid' GROUP BY postid"""
              val resultSet1 = statement1.executeQuery(query1)
              while resultSet1.next()  do
                val pid = resultSet1.getString("postid")
                val likecount = resultSet1.getString("count")
                println(s"\n DisLikes: $likecount")
        catch 
          case e: Exception => e.printStackTrace()
        finally
          if connection != null then
            connection.close()
        userFunc(userId)