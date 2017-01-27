/**
 * Al principio pense de implementarlo con un array modo stack, guardando las
 * operaciones con mayor prioridad(* and /) al frente del array y (+ and -) al
 * final. Asi solo tenia que ir de una sola pasada por el array y hacer las 
 * operaciones. Eso no funciono pero segui con esa idea y decidi que cada vez
 * que vea una operacion de mayor precedencia, calcularlo en ese momento y 
 * modificar el array. De ese modo al final solo tendria operaciones de adicion
 * y substraccion en el array.
 
 * Al final encontre una function "eval" que toma expression matematicas como
 * cadenas y calcula su valor. Asi que decidi usar un tag(h2) de html y extraer
 * el texto y pasarlo a "eva" para ejecutarlo. La parte mas dificil fue 
 * verificar que el usuario introduciera los numeros correctos. Si eso no 
 * fuera parte del programa esto hubiera sido mucho mas facil. 
 */
var screenExpression = $(".expr");

var subTotal = $(".sub-total");
var screen = $("#screen");
var needDecimal = true;

var needOperator = true;
var needFrontZero = true;
var needClean = false;
var trackLeadingZeros = false;
var count = 0;


function showKeyValueOnScreen(value){
  screenExpression.append(value);
} 

// this adjust text width to make it visible
// regardless of the expression's length
// need a litle more work
function adjustTextSize(){
 /*  var size = 0;
  console.log("screen " + screen.width());
  console.log("expre " + screenExpression.width());
  if(screenExpression.width() > screen.width()){
    size = (screen.width()+40)/screenExpression.width();
   screenExpression.css("font-size",size + "rem");
  }else{
    size = 1.5; */
   //  console.log("expre " + screenExpression.width());
  //  screenExpression.css("font-size",size + "rem");
  //}
  
   
}

function showSubtotal(expression){
  //console.log(expression[expression.length-1]);
  if(!Number.isNaN(expression[expression.length-1]))
     subTotal.text(eval(expression));
}

function clearScreenAndArray(arr){
  screenExpression.text(arr);
  subTotal.text(0);
  screenExpression.removeClass("hideScreenExpression");
  subTotal.removeClass("moveSubToTotal");
}


$( document ).ready(function() {
      
   $("#keypad").on('click', function(event){
     event.preventDefault();
     
     var keyInput = $(event.target).text();
     if(keyInput === "C"){
       clearScreenAndArray("");
       needClean = false;
        needDecimal = true;
       needFrontZero = true;
       trackLeadingZeros = false;
     }else if(keyInput === "0"){
      
         adjustTextSize()
         
        if(needClean){
         clearScreenAndArray("");
         needClean = false;
         needFrontZero = false;
         showKeyValueOnScreen("0.");
         needDecimal = false;
        }
       
if(trackLeadingZeros){
  count++;
}       
       if(screenExpression.text().length > 0 && count <= 1){
        showKeyValueOnScreen(keyInput);
         
       }
  needOperator = true;      
    showSubtotal(screenExpression.text());
      
     }else if(keyInput >= "1" && keyInput <= "9"){
       
       if(needClean){
         clearScreenAndArray("");
          needDecimal = true;
         needClean = false;
       }
       
        showKeyValueOnScreen(keyInput);
       needOperator = true;
       showSubtotal(screenExpression.text());
       //needFrontZero = true;
       trackLeadingZeros = false;
       count = 0;
       adjustTextSize()
     }else if(keyInput === "." && needDecimal === true){
       //console.log(currentInput.length);
       if(needClean){
         clearScreenAndArray(""); 
          needDecimal = true;
         needClean = false;
       }
       if(screenExpression.text().length === 0){
         showKeyValueOnScreen("0");
       }
        showKeyValueOnScreen(keyInput);
       
       needDecimal = false;
       needFrontZero = true;
       needOperator = false;
       trackLeadingZeros = false;
       count = 0;
       
       adjustTextSize()
     }else if((keyInput === "+" || 
               keyInput === "-" || 
               keyInput === "*" || 
               keyInput === "/") &&
              needOperator === true &&
              screenExpression.text().length > 0){
       
       if(needClean){
          screenExpression.text(subTotal.text());   
         screenExpression.removeClass("hideScreenExpression");
         subTotal.removeClass("moveSubToTotal");
         needClean = false;
         needDecimal = true;
       }
       //console.log(keyInput);
       
       showKeyValueOnScreen(keyInput);
       //console.log(screenExpression.text());
     
       needOperator = false;
       needDecimal = true;
       trackLeadingZeros = true;
       count = 0;
       
       adjustTextSize()
     }else if(keyInput === "="){
       screenExpression.addClass("hideScreenExpression");
       subTotal.addClass("moveSubToTotal");
       //console.log(screenExpression);
       needClean = true;
       needOperator = true;
       needDecimal = true;
       count = 0;
       //console.log(needOperator);
       
     }
     
  });
  
});
