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
            verb.te = "";
            verb.preMasu = "";
            verb.masu = "";
            verb.ta = "";
            verb.taEnd = "";
            verb.nakatta = "";
            verb.mashita = "";
            verb.masendeshita = "";
            verb.teEnd = "";
            verb.nai = "";
            verb.naiEnd = "";
            verb.masen = "";
            verb.ou = "";
            verb.ouEnd = "";
            verb.naidarou = "";
            verb.eba = "";
            verb.ebaEnd = "";
            verb.eru = "";
            verb.eruEnd = "";
            verb.erunai = "";
            verb.seru = "";
            verb.seruNai = "";

            printPage("u", verb.u);

            verb.getGroup = function () {
                if (isInArray(groupThree, verb.u)) {
                    verb.group = "3";
                } else if (verb.end === "る" && (isInArray(hiragana.i, verb.endTwo) || isInArray(hiragana.e, verb.endTwo))) {
                    verb.group = "2";
                } else if (isInArray(hiragana.u, verb.end)) {
                    verb.group = "1";
                }

                if (isInArray(groupOneExceptions, verb.u)) {
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

            verb.getTe = function () {

                if (verb.group === "3" || verb.group === "2") {
                    verb.te = verb.i + "て";
                }
                if (verb.group === "1") {
                    if (isInArray(hiragana.teOne, verb.preMasu)) {
                        verb.teEnd = "んで";
                    } else if (isInArray(hiragana.teTwo, verb.preMasu)) {
                        verb.teEnd = "って";
                    } else if (verb.preMasu === "き") {
                        verb.teEnd = "いて";
                    } else if (verb.preMasu === "ぎ") {
                        verb.teEnd = "いで";
                    } else if (verb.preMasu === "し") {
                        verb.teEnd = "して";
                    }

                    //exception
                    if (verb.u === "いく") {
                        verb.teEnd = "って";
                    }

                    verb.te = verb.withoutEnd + verb.teEnd;
                }
                printPage("te", verb.te);
            };

            verb.getNai = function () {
                if (verb.group === "3") {
                    if (verb.u === "する") {
                        verb.nai = "しない";
                    }
                    if (verb.u === "くる") {
                        verb.nai = "こない";
                    }
                }

                if (verb.group === "2") {
                    verb.nai = verb.i + "ない";
                }

                if (verb.group === "1") {
                    if (verb.preMasu === "い") {
                        verb.naiEnd = "わ";
                    } else {
                        verb.naiEnd = hiragana.change(verb.preMasu, "i", "a") + "ない";
                    }
                    verb.nai = verb.withoutEnd + verb.naiEnd;

                    if (verb.u === "ある") {
                        verb.nai = "ない";
                    }
                }
                printPage("nai", verb.nai);
            };

            verb.getMasu = function () {
                verb.masu = verb.i + "ます";
                printPage("masu", verb.masu);
            };

            verb.getMasen = function () {
                verb.masen = verb.i + "ません";
                printPage("masen", verb.masen);
            };

            verb.getTa = function () {
                if (verb.group === "3" || verb.group === "2") {
                    verb.ta = verb.i + "た";
                }
                if (verb.group === "1") {
                    verb.taEnd = verb.teEnd.slice(0, -1) + "た";
                    console.log(verb.taEnd);
                    verb.ta = verb.withoutEnd + verb.taEnd;
                }
                printPage("ta", verb.ta);
            };

            verb.getNakatta = function () {
                verb.nakatta = verb.nai.slice(0, -1) + "かった";
                printPage("nakatta", verb.nakatta);
            };

            verb.getMashita = function () {
                verb.mashita = verb.i + "ました";
                printPage("mashita", verb.mashita);
            };

            verb.getMasendeshita = function () {
                verb.masendeshita = verb.masen + " でした";
                printPage("masendeshita", verb.masendeshita);
            };

            verb.getOu = function () {
                if (verb.group === "3") {
                    verb.ou = verb.nai.slice(0, -2) + "よう";
                }
                if (verb.group === "2") {
                    verb.ou = verb.i + "よう";
                }
                if (verb.group === "1") {
                    verb.ouEnd = hiragana.change(verb.preMasu, "i", "o") + "う";
                    verb.ou = verb.withoutEnd + verb.ouEnd;
                }
                printPage("ou", verb.ou);
            };

            verb.getNaidarou = function () {
                verb.naidarou = verb.nai + " だろう";
                console.log(verb.naidarou);
                printPage("naidarou", verb.naidarou);
            };

            verb.getEba = function () {
                if (verb.group === "3") {
                    verb.eba = verb.withoutEnd + "れば";
                }
                if (verb.group === "2") {
                    verb.eba = verb.i + "れば";
                }
                if (verb.group === "1") {
                    verb.ebaEnd = hiragana.change(verb.preMasu, "i", "e") + "ば";
                    verb.eba = verb.withoutEnd + verb.ebaEnd;
                }
                printPage("eba", verb.eba);
            };

            verb.getNakereba = function () {
                verb.nakereba = verb.nai.slice(0, -1) + "ければ";
                printPage("nakereba", verb.nakereba);
            };

            verb.getEru = function () {
                if (verb.group === "3") {
                    if (verb.u === "する") {
                        verb.eru = "できる";
                    }
                    if (verb.u === "くる") {
                        verb.eru = "こられる";
                    }
                }
                if (verb.group === "2") {
                    verb.eru = verb.withoutEnd + "られる";
                }
                if (verb.group === "1") {
                    verb.eruEnd = hiragana.change(verb.preMasu, "i", "e") + "る";
                    verb.eru = verb.withoutEnd + verb.eruEnd;
                }
                printPage("eru", verb.eru);
            };

            verb.getErunai = function () {
                verb.erunai = verb.eru.slice(0, -1) + "ない";
                printPage("erunai", verb.erunai);
            };

            verb.getReru = function () {
                if (verb.group === "3") {
                    if (verb.u === "する") {
                        verb.reru = "される";
                    }
                    if (verb.u === "くる") {
                        verb.reru = "こらせる";
                    }
                }
                if (verb.group === "2") {
                    verb.reru = verb.eru;
                }
                if (verb.group === "1") {
                    verb.reru = verb.nai.slice(0, -2) + "れる";
                }
                printPage("reru", verb.reru);
            };

            verb.getRerunai = function () {
                verb.rerunai = verb.reru.slice(0, -1) + "ない";
                printPage("rerunai", verb.rerunai);
            };


            verb.getSeru = function () {
                if (verb.group === "3") {
                    if (verb.u === "する") {
                        verb.seru = "させる";
                    }
                    if (verb.u === "くる") {
                        verb.seru = "こさせる";
                    }
                }
                if (verb.group === "2") {
                    verb.seru = verb.withoutEnd + "させる";
                }
                if (verb.group === "1") {
                    verb.seru = verb.nai.slice(0, -2) + "せる";
                }
                printPage("seru", verb.seru);
            };

            verb.getSerunai = function () {
                verb.serunai = verb.seru.slice(0, -1) + "ない";
                printPage("serunai", verb.serunai);
            };


            verb.getGroup();
            verb.getI();
            verb.getTe();
            verb.getNai();
            verb.getMasu();
            verb.getMasen();
            verb.getTa();
            verb.getNakatta();
            verb.getMashita();
            verb.getMasendeshita();
            verb.getOu();
            verb.getNaidarou();
            verb.getEba();
            verb.getNakereba();
            verb.getEru();
            verb.getErunai();
            verb.getSeru();
            verb.getSerunai();
            verb.getReru();
            verb.getRerunai();

        });
    });
});