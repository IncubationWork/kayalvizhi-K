import scala.io.StdIn.readLine
import scala.io.StdIn.readInt
@main def hello: Unit =

  object UserDetails:
    def displayName(uname : String) : Unit =
      println(s"User Name is ${uname}")

    def displayAge(uage : Int) : Unit =
      println(s"User Age is ${uage}")

  class Person (var Name: String, var Age: Int):
    UserDetails.displayName(Name)
    UserDetails.displayAge(Age)

  println("Enter Your Name:")
  val fname = readLine()
  println("Enter your Age:")
  val fage = readInt()

  val p = Person(fname, fage)


