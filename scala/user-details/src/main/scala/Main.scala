import scala.io.StdIn.readLine
@main def hello: Unit =
  println("Enter the First Name:")
  val fname = readLine()

  println("Enter the Last Name:")
  val lname = readLine()
  println(s" Your Name is ${fname} ${lname}")

  println("Enter your Age:")
  val age = scala.io.StdIn.readInt()
  println(s" Your Age is ${age}")

  println("Enter your gender:")
  val sex = readLine()
  println(s" Your Gender is ${sex}")

  println("Enter your phoneNumber:")
  val pnum = BigInt(readLine())
  println(s" Your PhoneNumber is ${pnum}")

  println("Enter your Email:")
  val mail = readLine()
  println(s" Your Mail ID is ${mail}")

  println("Enter your Password:")
  val pass = readLine()
  println(s" Your Password is ${pass}")

  case class User(
  firstName : String,
  lastName : String,
  userage : Int,
  gender : String,
  phoneNumber : BigInt,
  email : String,
  password : String
)

  val u = User(fname, lname, age, sex, pnum, mail, pass);

  println("User First Name is " + u.firstName)
  println("User Last Name is " + u.lastName)
  println("User Age is " + u.userage)
  println("User Gender is " + u.gender)
  println("User Phone Number is " + u.phoneNumber)
  println("User Email is " + u.email)
  println("User Password is " + u.password)
