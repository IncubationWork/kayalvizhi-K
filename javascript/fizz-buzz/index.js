function myFunction(){
    const start = document.getElementById("snumber").value;
    const end = document.getElementById("enumber").value;
    const fizzNum = document.getElementById("fnumber").value;
    const buzzNum = document.getElementById("bnumber").value;
   
    for(var i=start;i<=end;i++){
        if(i%fizzNum == 0 && i%buzzNum == 0){
            alert("fizzBuzz");
        }else if(i%buzzNum == 0){
            alert("buzz");
        }else if(i%fizzNum == 0){
            alert("fizz");
        }else {
            alert(i);
        }
    }
}