define(['jquery', 'hiragana', 'wanakana'], function ($, hiragana) {
    var isInArray = function (array, search) {
        return array.indexOf(search) >= 0;
    };

    var groupOneExceptions = ["はいる", "はしる", "かえる", "かぎる", "きる", "しゃべる", "しる", "いる"];
    var groupThree = ["くる", "する"];
    var existence = [["いる", "ある"], ["です"]];

    var verb = {
        //put an if check here for masu? LATER
        group: "",
        u: "",
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
        nakereba: "",
        eru: "",
        eruEnd: "",
        erunai: "",
        seru: "",
        serunai: "",
        reru: "",
        rerunai: "",

        raw: "",
        isVerb: true,
        isKana: true,
        isExist: false,
        isDesu: false
    };

    verb.getRaw = function () {
        verb.raw = $("#input").val();
    };

    verb.getU = function () {
        //init verb.u for hiragana processing
        if (wanakana.isKana(verb.raw) === false) {
            verb.isKana = false;
            verb.u = wanakana.toHiragana(verb.raw);
        } else {
            verb.isKana = true;
            verb.u = verb.raw;
        }
    };

    verb.getSlice = function () {
        //do some initial slicing
        verb.end = verb.u.slice(-1);
        verb.endTwo = verb.u.slice(-2, -1);
        verb.withoutEnd = verb.u.slice(0, -1);
    };

    verb.init = function () {

        if (isInArray(hiragana.u, verb.end) === false) {
            verb.isVerb = false;

        } else {
            verb.isVerb = true;
        }

        if (isInArray(existence[0], verb.u)) {
            verb.isExist = true;

        } else {
            verb.isExist = false;
        }

        if (isInArray(existence[1], verb.u)) {
            verb.isDesu = true;
        } else {
            verb.isDesu = false;
        }

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
            verb.taEnd = verb.teEnd.slice(0, -1) + hiragana.change(verb.teEnd.slice(-1), "e", "a");
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

    verb.post = function () {
        var prop = "";
        //goes through verb object, checks for romaji and verb
        for (prop in verb) {
            if (typeof verb[prop] === "string") {
                if (verb.isKana === false) {
                    verb[prop] = wanakana.toRomaji(verb[prop]);
                }

                if (verb.isVerb === false) {
                    verb[prop] = "";
                }
            } //string
        } //for in
    }; //post

    return verb;
}); //define