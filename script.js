$(document).ready(function () {
    var groupOne = ["う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む", "る"];
    var groupTwo = ["い", "き", "し", "ち", "に", "え", "け", "せ", "て", "ね", "へ", "め", "れ", "ぎ", "じ", "び", "ぴ", "げ", "ぜ", "で", "べ", "ぺ"]
    var groupThree = ["来", "くる", "する"];

    //check if in array
    function isInArray(array, search) {
        return array.indexOf(search) >= 0;
    }

    //add input to the page
    function printPage(id, input) {
        $("#" + id).replaceWith("<span id = " + id + ">" + input + "</span>");
    }

    //Click the button to get the form value.
    $("#submit").click(function () {
        var verb = {};
        //put an if check here for masu? LATER
        verb.group = "";
        verb.u = $('#enter').val();
        verb.end = verb.u.slice(-1);
        verb.endTwo = verb.u.slice(-2, -1);
        verb.stem = verb.u.slice(0, -2);
        verb.masu = "";
        verb.ta = "";
        verb.te = "";

        printPage("u", verb.u);
        printPage("stem", verb.stem);
        printPage("ta", verb.endTwo);

        function getVerbGroup() {
            if (isInArray(groupThree, verb.u)) {
                verb.group = "3";
            } else if (verb.end === "る" && isInArray(groupTwo, verb.endTwo)) {
                verb.group = "2";
            } else if (isInArray(groupOne, verb.end)) {
                verb.group = "1";
            }

            printPage("group", verb.group);
        }
        //function teConjugate() {

        //What is the verb we're manipulating?

        //Check if it's a group three verb and conjugate accordingly.

        //Since group three verbs can possibly intended to be group one verbs, we start a new if block.


        //We'll assume everything else that's not group one is a group two verb.


        //Check if the verb is possibly an exception to the usual group rules. We can add more else ifs for more exceptions and use printType and specify. Use either the group one method (preMasu.change) or the group two function verb.printStemTe accordingly.

        //};
        getVerbGroup();

    });
});