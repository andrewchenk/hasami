$(document).ready(function () {
    //object of array hirigana
    var hiragana = {};
    hiragana.a = ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "が", "ざ", "だ", "ば", "ぱ"];
    hiragana.i = ["い", "き", "し", "ち", "に", "ひ", "み", " ", "り", " ", "ぎ", "じ", "ぢ", "び", "ぴ"];
    hiragana.u = ["う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", " ", "ぐ", "ず", "づ", "ぶ", "ぷ"];
    hiragana.e = ["え", "け", "せ", "て", "ね", "へ", "め", " ", "れ", " ", 　"げ", "ぜ", "で", "べ", "ぺ"];
    hiragana.o = ["お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を", "ご", "ぞ", "ど", "ぼ", "ぽ"];
    hiragana.change = function (input, output, initVowel, desiredVowel) {
        var x = hiragana[initVowel].indexOf(input);
        console.log(x);
        output = hiragana[desiredVowel][x];
        console.log(output); //just set it to return
    }

    var groupOne = ["う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む", "る"]
    var groupTwo = ["い", "き", "し", "ち", "に", "ひ", "み", "り", "え", "け", "せ", "て", "ね", "へ", "め", "れ", "ぎ", "じ", "び", "ぴ", "げ", "ぜ", "で", "べ", "ぺ"]
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
        verb.stem = "";
        verb.masu = "";
        verb.preMasu = "";
        verb.ta = "";
        verb.te = "";

        printPage("u", verb.u);

        verb.getGroup = function () {
            if (isInArray(groupThree, verb.u)) {
                verb.group = "3";
            } else if (verb.end === "る" && isInArray(groupTwo, verb.endTwo)) {
                verb.group = "2";
            } else if (isInArray(groupOne, verb.end)) {
                verb.group = "1";
            }
            printPage("group", verb.group);
        }

        verb.getStem = function () {
            if (verb.group === "1") {
                /* function checkChangePreMasu(a, b) {
                    if (verb.end === a) {
                        verb.preMasu = b;
                        printPage("ta", verb.preMasu);
                    }
                }
                 checkChangePreMasu("む", "み");
                checkChangePreMasu("ぬ", "に");
                checkChangePreMasu("ぶ", "び");
                checkChangePreMasu("う", "い");
                checkChangePreMasu("つ", "ち");
                checkChangePreMasu("る", "り");
                checkChangePreMasu("く", "き");
                checkChangePreMasu("ぐ", "ぎ");
                checkChangePreMasu("す", "し"); */

                hiragana.change(verb["end"], verb["preMasu"], "u", "i");
                console.log(verb.preMasu);
                verb.stem = verb.u.slice(0, -1) + verb.preMasu;

            }
            if (verb.group === "2") {
                verb.stem = verb.u.slice(0, -1);
            }

            if (verb.group === "3") {

            }
            printPage("stem", verb.stem);
        }

        verb.getMasu = function () {
            verb.masu = verb.stem + "ます";
            printPage("masu", verb.masu);
        }
        verb.getTe = function () {

            //Check if it's a group three verb and conjugate accordingly.
            if (verb.group === "3" || verb.group === "2") {
                verb.te = verb.stem + "て";
            }
            //Since group three verbs can possibly intended to be group one verbs, we start a new if block.


            //We'll assume everything else that's not group one is a group two verb.


            //Check if the verb is possibly an exception to the usual group rules. We can add more else ifs for more exceptions and use printType and specify. Use either the group one method (preMasu.change) or the group two function verb.printStemTe accordingly.

        };
        verb.getGroup();
        verb.getStem();
        verb.getMasu();
    });
});