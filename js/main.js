require(["wanakana"], function () {
    $(document).ready(function () {

        //hiragana table
        var hiragana = {
            a: ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ", "が", "ざ", "だ", "ば", "ぱ"],
            i: ["い", "き", "し", "ち", "に", "ひ", "み", " ", "り", " ", "ぎ", "じ", "ぢ", "び", "ぴ"],
            u: ["う", "く", "す", "つ", "ぬ", "ふ", "む", "ゆ", "る", " ", "ぐ", "ず", "づ", "ぶ", "ぷ"],
            e: ["え", "け", "せ", "て", "ね", "へ", "め", " ", "れ", " ", 　"げ", "ぜ", "で", "べ", "ぺ"],
            o: ["お", "こ", "そ", "と", "の", "ほ", "も", "よ", "ろ", "を", "ご", "ぞ", "ど", "ぼ", "ぽ"],
            teOne: ["み", "に", "び"],
            teTwo: ["い", "ち", "り"],
            change: function (input, initVowel, desiredVowel) {
                var x = hiragana[initVowel].indexOf(input);
                return hiragana[desiredVowel][x];
            }
        };

        var groupOneExceptions = ["はいる", "はしる", "かえる", "かぎる", "きる", "しゃべる", "しる", "いる"];
        var groupThree = ["くる", "する"];
        var existence = [["いる", "ある"], ["です"]];

        //check if in array
        function isInArray(array, search) {
            return array.indexOf(search) >= 0;
        }

        //add input to the page
        function printPage(id, value) {
            $("#" + id).replaceWith("<div id = " + id + ">" + value + "</span>");
        }

        var input = document.getElementById("input");
        wanakana.bind(input);

        $("input:radio[name=input-method]").change(function () {
            if ($(this).val() === "Hiragana") {
                //wanakana support
                wanakana.bind(input);
                $("#input").attr("placeholder", "たべる");
            }

            if ($(this).val() === "Romaji") {
                wanakana.unbind(input);
                $("#input").attr("placeholder", "taberu");
            }
        });

        //Click the button to get the form value.
        $("#submit").click(function () {

            var verb = {
                //put an if check here for masu? LATER
                group: "",
                u: $("#input").val(),
                end: "",
                endTwo: "",
                withoutEnd: "",
                i: "",
                te: "",
                preMasu: "",
                masu: "",
                ta: "",
                taEnd: "",
                nakatta: "",
                mashita: "",
                masendeshita: "",
                teEnd: "",
                nai: "",
                naiEnd: "",
                masen: "",
                ou: "",
                ouEnd: "",
                naidarou: "",
                eba: "",
                ebaEnd: "",
                eru: "",
                eruEnd: "",
                erunai: "",
                seru: "",
                seruNai: "",
                reru: "",
                reruNai: ""
            };

            verb.getInit = function () {
                verb.end = verb.u.slice(-1);
                verb.endTwo = verb.u.slice(-2, -1);
                verb.withoutEnd = verb.u.slice(0, -1);
            };

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

            };

            verb.getMasu = function () {
                verb.masu = verb.i + "ます";

            };

            verb.getMasen = function () {
                verb.masen = verb.i + "ません";

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

            };

            verb.getNakatta = function () {
                verb.nakatta = verb.nai.slice(0, -1) + "かった";

            };

            verb.getMashita = function () {
                verb.mashita = verb.i + "ました";

            };

            verb.getMasendeshita = function () {
                verb.masendeshita = verb.masen + " でした";

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

            };

            verb.getNaidarou = function () {
                verb.naidarou = verb.nai + " だろう";

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

            };

            verb.getNakereba = function () {
                verb.nakereba = verb.nai.slice(0, -1) + "ければ";

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

            };

            verb.getErunai = function () {
                verb.erunai = verb.eru.slice(0, -1) + "ない";

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

            };

            verb.getRerunai = function () {
                verb.rerunai = verb.reru.slice(0, -1) + "ない";

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

            };

            verb.getSerunai = function () {
                verb.serunai = verb.seru.slice(0, -1) + "ない";

            };

            verb.process = function () {
                if (isInArray(existence[0], verb.u)) {
                    printPage("existence", "<div class=\"bs-callout bs-callout-info\"> If you were referring to the existence copula " + verb.u + " (to be), refer here.</div>");
                } else if (isInArray(existence[1], verb.u)) {
                    printPage("existence", "<div class=\"bs-callout bs-callout-info\"> If you were referring to the existence copula " + verb.u + " (is), refer here.</div>");
                }

                var prop = "";
                for (prop in verb) {
                    if (typeof verb[prop] === "string") {
                        if (wanakana.isKana($("#input").val()) === false) {
                            verb[prop] = wanakana.toRomaji(verb[prop]);
                        }
                        printPage(prop, verb[prop]);
                    } //string
                } //for in
            };

            verb.check = function () {
                printPage("existence", "");
                if (wanakana.isKana(verb.u) === false) {
                    verb.u = wanakana.toHiragana(verb.u);
                }

            };

            verb.conjugate = function () {
                verb.getInit();
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
            };

            verb.check();
            verb.conjugate();
            verb.process();

        });
    });
});