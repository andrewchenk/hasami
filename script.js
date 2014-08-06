$(document).ready(function () {
    var groupOne = ["う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む", "る"];
    var groupThree = ["来", "きます", "します"];

    //check if in array
    function isInArray(array, search) {
        return array.indexOf(search) >= 0;
    }

    //add input to the page
    function printPage(location, input) {
        $(location).replaceWith(input);
    }

    var g1 = "Group 1";
    var g2 = "Group 2";
    var g3 = "Group 3";
    var ex = "exception";

    //Click the button to get the form value.
    $("#submit").click(function () {
        var verb = {};
        verb.u = $('#enter').val();
        verb.stem = verb.u.slice(0, -3);
        printPage("#masu", verb.u);

        function teConjugate() {

            //What is the verb we're manipulating?

            //Check if it's a group three verb and conjugate accordingly.

            //Since group three verbs can possibly intended to be group one verbs, we start a new if block.


            //We'll assume everything else that's not group one is a group two verb.


            //Check if the verb is possibly an exception to the usual group rules. We can add more else ifs for more exceptions and use printType and specify. Use either the group one method (preMasu.change) or the group two function verb.printStemTe accordingly.

        };
        teConjugate();
    });
});