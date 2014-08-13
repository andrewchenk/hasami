require(['wanakana'], function () {
    $(document).ready(function () {
        //wanakana support
        var input = document.getElementById('enter');
        wanakana.bind(input);

        //object of array hirigana
        //implement wakakana; fix html table
        var hiragana = {};
        hiragana.a = ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "が", "ざ", "だ", "ば", "ぱ"];
        hiragana.i = ["い", "き", "し", "ち", "に", "ひ", "み", " ", "り", " ", "ぎ", "じ", "ぢ", "び", "ぴ"];
        hiragana.u = ["う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", " ", "ぐ", "ず", "づ", "ぶ", "ぷ"];
        hiragana.e = ["え", "け", "せ", "て", "ね", "へ", "め", " ", "れ", " ", 　"げ", "ぜ", "で", "べ", "ぺ"];
        hiragana.o = ["お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を", "ご", "ぞ", "ど", "ぼ", "ぽ"];
        hiragana.teOne = ["み", "に", "び"];
        hiragana.teTwo = ["い", "ち", "り"];
        hiragana.change = function (input, initVowel, desiredVowel) {
            var x = hiragana[initVowel].indexOf(input);
            console.log(x);
            return hiragana[desiredVowel][x];

        };

        var groupOneExceptions = ["はいる", "はしる", "かえる", "かぎる", "きる", "しゃべる", "しる"];
        var groupThree = ["くる", "する"];

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
            verb.withoutEnd = verb.u.slice(0, -1);
            verb.i = "";
            verb.preMasu = "";
            verb.masu = "";
            verb.ta = "";
            verb.taEnd = "";
            verb.te = "";
            verb.teEnd = "";
            verb.negative = "";
            verb.negativeEnd = "";
            verb.provisional = "";
            verb.provisionalEnd = "";

            printPage("u", verb.u);

            verb.getGroup = function () {
                if (isInArray(groupThree, verb.u)) {
                    verb.group = "3";
                } else if (verb.end === "る" && (isInArray(hiragana.i, verb.endTwo) || isInArray(hiragana.e, verb.endTwo))) {
                    verb.group = "2";
                } else if (isInArray(hiragana.u, verb.end)) {
                    verb.group = "1";
                } else if (isInArray(groupOneExceptions, verb.u)) {
                    verb.group = "1";
                }
                printPage("group", verb.group);
            };

            verb.getI = function () {
                if (verb.group === "1") {
                    verb.preMasu = hiragana.change(verb.end, "u", "i");
                    verb.i = verb.u.slice(0, -1) + verb.preMasu;

                }
                if (verb.group === "2") {
                    verb.i = verb.u.slice(0, -1);
                }

                if (verb.group === "3") {
                    verb.i = hiragana.change(verb.withoutEnd, "u", "i");
                }
                printPage("i", verb.i);
            };

            verb.getMasu = function () {
                verb.masu = verb.i + "ます";
                printPage("masu", verb.masu);
            };

            verb.getTe = function () {

                //Check if it's a group three verb and conjugate accordingly.
                if (verb.group === "3" || verb.group === "2") {
                    verb.te = verb.i + "て";
                }
                if (verb.group === "1") {
                    console.log(verb.preMasu);
                    if (isInArray(hiragana.teOne, verb.preMasu)) {
                        verb.teEnd = "んで";
                        console.log(verb.teEnd);
                    } else if (isInArray(hiragana.teTwo, verb.preMasu)) {
                        verb.teEnd = "って";
                    } else if (verb.preMasu === "き") {
                        verb.teEnd = "いて";
                    } else if (verb.preMasu === "ぎ") {
                        verb.teEnd = "いで";
                    } else if (verb.preMasu === "し") {
                        verb.teEnd = "して";
                    }
                    verb.te = verb.withoutEnd + verb.teEnd;
                }
                printPage("te", verb.te);
            };

            verb.getTa = function () {
                if (verb.group === "3" || verb.group === "2") {
                    verb.ta = verb.i + "た";
                }
                if (verb.group === "1") {
                    console.log(verb.preMasu);
                    if (isInArray(hiragana.teOne, verb.preMasu)) {
                        verb.taEnd = "んだ";
                        console.log(verb.teEnd);
                    } else if (isInArray(hiragana.teTwo, verb.preMasu)) {
                        verb.taEnd = "った";
                    } else if (verb.preMasu === "き") {
                        verb.taEnd = "いた";
                    } else if (verb.preMasu === "ぎ") {
                        verb.taEnd = "いだ";
                    } else if (verb.preMasu === "し") {
                        verb.taEnd = "した";
                    }
                    verb.ta = verb.withoutEnd + verb.taEnd;
                }
                printPage("ta", verb.ta);
            };

            verb.getNegative = function () {
                if (verb.group === "3") {
                    if (verb.u === "する") {
                        verb.negative = "しない";
                    }
                    if (verb.u === "くる") {
                        verb.negative = "こない";
                    }
                }

                if (verb.group === "2") {
                    verb.negative = verb.i + "ない";
                }

                if (verb.group === "1") {
                    if (verb.preMasu === "い") {
                        verb.negativeEnd = "わ";
                    } else {
                        verb.negativeEnd = hiragana.change(verb.preMasu, "i", "a");
                    }
                    verb.negative = verb.withoutEnd + verb.negativeEnd + "ない";

                    if (verb.u === "ある") {
                        verb.negative = "ない";
                    }
                }
                printPage("negative", verb.negative);
            };

            verb.getProvisonal = function () {

            };

            verb.getGroup();
            verb.getI();
            verb.getMasu();
            verb.getTe();
            verb.getTa();
            verb.getNegative();
        });
    });
});