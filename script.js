$(document).ready(function(){
var groupOne = ["い", "き", "ぎ", "し", "ち", "に", "び", "み", "り"];
var groupThree = ["来", "きます", "します"];
var exceptions = ["いき"]; //use verb stems
 
function isInArray(array, search) {
    return array.indexOf(search) >= 0;
}
      
   $( "#submit" ).click(function() {
   teConjugate();
});
    
    function teConjugate() {
    var verb = $('#enter').val();
    //What is the verb we're manipulating?
    printPage("Your initial input is " + verb + ".");
    printPage("");
      
    //Used in console.log.
    var teFormIs = "The TE form of " + verb + " is ";
   
    function printPage (input) {
        $("body").append(input + "<br>");
    }
   
    //Print the type of verb for each type, as well as whether it is an exception or not.
    var g1 = "Group 1";
    var g2 = "Group 2";
    var g3 = "Group 3";
    var ex = "exception";
    function printType(group, posException) {
        if(typeof posException === 'undefined') {
            printPage("If your verb is a " + group + " verb:");
        }
        else {
            printPage("If your verb is a " + group + " " + posException + " verb:");
        }
        }
    //Useful for Group 1 verbs.
    var verbStemWithoutPreMasu = verb.slice(0, -3);
    //Get the character before "ます" of the verb (premasu). Manipulate it using its properties and methods.
    var preMasu = new Object();
    preMasu.old = verb.slice(-3, -2);
    preMasu.te = "";
    //This method conjugates the preMasu and prints a result.
    preMasu.change = function (conjugation) {
        preMasu.te = conjugation;
        printPage(preMasu.old + " conjugates to " + preMasu.te + ".");
        printPage(teFormIs + verbStemWithoutPreMasu  + preMasu.te + ".");
    };
   
    //Useful for Group 2 and Group 3 verbs.
    var verbStem = verb.slice(0, -2);  
    function printVerbStemTe() {
       
        var verbStemTe = verbStem + "て";
        printPage(teFormIs + verbStemTe + ".");
    }
   
    //Specify what a verb means to differentiate it from a possible alternative.
    function specify(definition) {
        printPage("This verb, " + verb + ", means \"" + definition + "\".");
    }
      
    //Check if it's a group three verb and conjugate accordingly.
    if (isInArray(groupThree, verb) || isInArray(groupThree, verbStem)){
        printType(g3);
        if(verb == "きます" || verb == "来ます") {
            specify("to come");
            printVerbStemTe();
           
        }
        else if (verb == "します") {
            specify("to do");
            printVerbStemTe();
        }
        printPage("xxx");
    }
   
    //Since group three verbs can possibly intended to be group one verbs, we start a new if block.
    if (isInArray(groupOne, preMasu.old)) {
        printType(g1);
        printPage("The character to be conjugated is " + preMasu.old + ". ");
       
        if (preMasu.old == "み" || preMasu.old == "に" || preMasu.old == "び") {
            preMasu.change("んで");
        }
        else if (preMasu.old == "い" || preMasu.old == "ち" || preMasu.old == "り") {
            preMasu.change("って");
        }
        else if (preMasu.old == "き") {
            preMasu.change("いて");
        }
        else if (preMasu.old == "ぎ") {
            preMasu.change("いで");
        }
        else if (preMasu.old == "し"){
            preMasu.change("して");
        }
        printPage("xxx");
        }
       
    //We'll assume everything else that's not group one is a group two verb.
    else {
        printType(g2);
        printVerbStemTe();
        printPage("xxx");
    }
   
    //Check if the verb is possibly an exception to the usual group rules. We can add more else ifs for more exceptions and use printType and specify. Use either the group one method (preMasu.change) or the group two function printVerbStemTe accordingly.
       if (isInArray(exceptions, verbStem)){
        if(verbStem == "行き" || verbStem == "いき") {
            printType(g1, ex);
            specify("to go");
            preMasu.change("って");
        }
        printPage("xxx");
    }
    printPage("~~~");
    printPage("");
    }
    
});