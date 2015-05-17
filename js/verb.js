define(['hiragana', 'wanakana'], function (hiragana) {
    var isInArray = function (array, search) {
        return array.indexOf(search) >= 0;
    };

    var GROUP_ONE_EXCEPTIONS = ["はいる", "はしる", "かえる", "かぎる", "きる", "しゃべる", "しる"];
    var GROUP_THREE = ["くる", "する"];
    var GROUP_FOUR = [["いる", "ある"], ["です"]];

    var verb = {

        raw: "",
        groupOverride: false,
        isKana: true,
        isVerb: true,
        isExist: false,
        isDesu: false
    };

    verb.initial = function () {
        //Finding and setting properties of the verb.

        //Get hiragana version of verb.raw, make it verb.plain
        if (wanakana.isKana(verb.raw) === false) {
            verb.isKana = false;
            verb.plainRomaji = verb.raw;
            verb.plain = wanakana.toHiragana(verb.raw);
        } else {
            verb.isKana = true;
            verb.plainRomaji = wanakana.toRomaji(verb.raw);
            verb.plain = verb.raw;
        };

        //Find slices
        verb.endChar = verb.plain.slice(-1);
        verb.secondCharToEnd = verb.plain.slice(-2, -1);
        verb.withoutEnd = verb.plain.slice(0, -1);

        //Find if verb is outside categories
        verb.isExist = false;
        verb.isDesu = false;

        if (isInArray(hiragana.U, verb.endChar) === false) {
            verb.isVerb = false;
        } else {
            verb.isVerb = true;
        }

        if (isInArray(GROUP_FOUR[0], verb.plain)) {
            verb.isExist = true;
        }

        if (isInArray(GROUP_FOUR[1], verb.plain)) {
            verb.isDesu = true;
        }


    };


    verb.getGroup = function () {
        if (verb.groupOverride === false) {
            if (isInArray(GROUP_THREE, verb.plain)) {
                verb.group = "3";
            } else if (verb.endChar === "る" && (isInArray(hiragana.I, verb.secondCharToEnd) || isInArray(hiragana.E, verb.secondCharToEnd))) {
                verb.group = "2";
            } else if (isInArray(hiragana.U, verb.endChar)) {
                verb.group = "1";
            }

            if (isInArray(GROUP_ONE_EXCEPTIONS, verb.plain)) {
                verb.group = "1";
            }
        }
    };

    verb.getStem = function () {
        if (verb.group === "1") {
            verb.preMasu = hiragana.change(verb.endChar, "U", "I");
            verb.stem = verb.plain.slice(0, -1) + verb.preMasu;

        }
        if (verb.group === "2") {
            verb.stem = verb.plain.slice(0, -1);
        }

        if (verb.group === "3") {
            verb.stem = hiragana.change(verb.withoutEnd, "U", "I");
        }

    };

    verb.getPlainN = function () {
        if (verb.group === "3") {
            if (verb.plain === "する") {
                verb.plainN = "しない";
            }
            if (verb.plain === "くる") {
                verb.plainN = "こない";
            }
        }

        if (verb.group === "2") {
            verb.plainN = verb.stem + "ない";
        }

        if (verb.group === "1") {
            if (verb.preMasu === "い") {
                verb.plainNEnd = "わ";
            } else {
                verb.plainNEnd = hiragana.change(verb.preMasu, "I", "A") + "ない";
            }
            verb.plainN = verb.withoutEnd + verb.plainNEnd;

            if (verb.plain === "ある") {
                verb.plainN = "ない";
            }
        }

    };

    verb.getTe = function () {

        if (verb.group === "3" || verb.group === "2") {
            verb.te = verb.stem + "て";
        }
        if (verb.group === "1") {
            if (isInArray(hiragana.TE_ONE, verb.endChar)) {
                verb.teEnd = "んで";
            } else if (isInArray(hiragana.TE_TWO, verb.endChar)) {
                verb.teEnd = "って";
            } else if (verb.endChar === "く") {
                verb.teEnd = "いて";
            } else if (verb.endChar === "ぐ") {
                verb.teEnd = "いで";
            } else if (verb.endChar === "す") {
                verb.teEnd = "して";
            }

            //exception
            if (verb.plain === "いく") {
                verb.teEnd = "って";
            }

            verb.te = verb.withoutEnd + verb.teEnd;
        }

    };

    verb.getTeN = function () {
        verb.teN = verb.plainN.slice(0, -1) + "くて";
    };



    verb.getPast = function () {
        if (verb.group === "3" || verb.group === "2") {
            verb.past = verb.stem + "た";
        }
        if (verb.group === "1") {
            verb.pastEnd = verb.teEnd.slice(0, -1) + hiragana.change(verb.teEnd.slice(-1), "E", "A");
            verb.past = verb.withoutEnd + verb.pastEnd;
        }

    };

    verb.getPastN = function () {
        verb.pastN = verb.plainN.slice(0, -1) + "かった";

    };

    verb.getPotential = function () {
        if (verb.group === "3") {
            if (verb.plain === "する") {
                verb.potential = "できる";
            }
            if (verb.plain === "くる") {
                verb.potential = "こられる";
            }
        }
        if (verb.group === "2") {
            verb.potential = verb.withoutEnd + "られる";
        }
        if (verb.group === "1") {
            verb.potentialEnd = hiragana.change(verb.preMasu, "I", "E") + "る";
            verb.potential = verb.withoutEnd + verb.potentialEnd;
        }

    };

    verb.getPotentialN = function () {
        verb.potentialN = verb.potential.slice(0, -1) + "ない";
    };

    verb.getConditional = function () {
        if (verb.group === "3") {
            verb.conditional = verb.withoutEnd + "れば";
        }
        if (verb.group === "2") {
            verb.conditional = verb.stem + "れば";
        }
        if (verb.group === "1") {
            verb.conditionalEnd = hiragana.change(verb.preMasu, "I", "E") + "ば";
            verb.conditional = verb.withoutEnd + verb.conditionalEnd;
        }

    };

    verb.getConditionalN = function () {
        verb.conditionalN = verb.plainN.slice(0, -1) + "ければ";
    };

    verb.getVolitional = function () {
        if (verb.group === "3") {
            verb.volitional = verb.plainN.slice(0, -2) + "よう";
        }
        if (verb.group === "2") {
            verb.volitional = verb.stem + "よう";
        }
        if (verb.group === "1") {
            verb.volitionalEnd = hiragana.change(verb.preMasu, "I", "O") + "う";
            verb.volitional = verb.withoutEnd + verb.volitionalEnd;
        }

    };

    verb.getVolitionalN = function () {
        verb.volitionalN = verb.plainN + " だろう";

    };

    verb.getCommand = function () {
        if (verb.group === "3") {
            if (verb.plain === "する") {
                verb.command = "しろ";
            }
            if (verb.plain === "くる") {
                verb.command = "こい";
            }
        }
        if (verb.group === "2") {
            verb.command = verb.stem + "ろ";
        }
        if (verb.group === "1") {
            verb.commandEnd = hiragana.change(verb.preMasu, "I", "E");
            verb.command = verb.withoutEnd + verb.commandEnd;
        }
    };

    verb.getCommandN = function () {
        verb.commandN = verb.plain + "な";
    };

    verb.getPassive = function () {
        if (verb.group === "3") {
            if (verb.plain === "する") {
                verb.passive = "される";
            }
            if (verb.plain === "くる") {
                verb.passive = "こらせる";
            }
        }
        if (verb.group === "2") {
            verb.passive = verb.withoutEnd + "られる"; //same as potential
        }
        if (verb.group === "1") {
            verb.passive = verb.plainN.slice(0, -2) + "れる";
        }
    };

    verb.getPassiveN = function () {
        verb.passiveN = verb.passive.slice(0, -1) + "ない";
    };

    verb.getCausative = function () {
        if (verb.group === "3") {
            if (verb.plain === "する") {
                verb.causative = "させる";
            }
            if (verb.plain === "くる") {
                verb.causative = "こさせる";
            }
        }
        if (verb.group === "2") {
            verb.causative = verb.withoutEnd + "させる";
        }
        if (verb.group === "1") {
            verb.causative = verb.plainN.slice(0, -2) + "せる";
        }
    };

    verb.getCausativeN = function () {
        verb.causativeN = verb.causative.slice(0, -1) + "ない";
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