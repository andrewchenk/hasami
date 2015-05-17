define(['hiragana', 'wanakana'], function (hiragana) {
    var isInArray = function (array, search) {
        return array.indexOf(search) >= 0;
    };

    var GROUP_NA_EXCEPTIONS = ["きらい"];
    var GROUP_II = ["いい"];

    var adjective = {

        raw: "",
        groupOverride: false,
        isKana: true,
        isIi: false,
        isAdjective: true
    };

    adjective.initial = function () {
        //Get hiragana version of adjective.raw, make it adjective.plain
        if (wanakana.isKana(adjective.raw) === false) {
            adjective.isKana = false;
            adjective.plain = wanakana.toHiragana(adjective.raw);
        } else {
            adjective.isKana = true;
            adjective.plain = adjective.raw;
        };

        //Find if adjective is outside categories
        if (wanakana.isKana(adjective.plain) === true) {
            adjective.isAdjective = true;
        } else {
            adjective.isAdjective = false;
        }

        //Find if adjective is "いい"
        if (isInArray(GROUP_II, adjective.plain)) {
            adjective.isIi = true;
            adjective.plain = "よい";
        } else {
            adjective.isIi = false;
        }

        //Find slices
        adjective.endChar = adjective.plain.slice(-1);
        adjective.secondCharToEnd = adjective.plain.slice(-2, -1);
        adjective.withoutEnd = adjective.plain.slice(0, -1);
    };


    adjective.getGroup = function () {
        if (adjective.groupOverride === false) {

            if (adjective.endChar === "い") {
                if (isInArray(hiragana.E, adjective.secondCharToEnd)) {
                    adjective.group = "na";
                } else if (isInArray(hiragana.A, adjective.secondCharToEnd) || isInArray(hiragana.I, adjective.secondCharToEnd) || isInArray(hiragana.U, adjective.secondCharToEnd) || isInArray(hiragana.O, adjective.secondCharToEnd)) {
                    adjective.group = "i";
                }
            } else {
                adjective.group = "na";
            }

            if (isInArray(GROUP_NA_EXCEPTIONS, adjective.plain)) {
                adjective.group = "na"
            }
        }
    };

    adjective.getPlainN = function () {
        if (adjective.group === "na") {
            adjective.plainN = adjective.plain + "じゃない";
        }
        if (adjective.group === "i") {
            adjective.plainN = adjective.withoutEnd + "くない";
        }
    };

    adjective.getPredicate = function () {
        if (adjective.group === "na") {
            adjective.predicate = adjective.plain + "な";
        }
        if (adjective.group === "i") {
            adjective.predicate = adjective.plain;
        }
    };

    adjective.getAdverb = function () {
        if (adjective.group === "na") {
            adjective.adverb = adjective.plain + "に";
        }
        if (adjective.group === "i") {
            adjective.adverb = adjective.withoutEnd + "く";
        }
    };

    adjective.getAdverbN = function () {
        adjective.adverbN = adjective.plainN.slice(0, -1) + "く"
    };

    adjective.getPredicateN = function () {
        adjective.predicateN = adjective.plainN;
    };

    adjective.getPast = function () {
        if (adjective.group === "na") {
            adjective.past = adjective.plain + "だった";
        }
        if (adjective.group === "i") {
            adjective.past = adjective.withoutEnd + "かった";
        }
    };

    adjective.getPastN = function () {
        if (adjective.group === "na") {
            adjective.pastN = adjective.plain + "じゃなかった"
        }
        if (adjective.group === "i") {
            adjective.pastN = adjective.withoutEnd + "くなかった";
        }
    };

    adjective.getTe = function () {
        if (adjective.group === "na") {
            adjective.te = adjective.plain + "で";
        }
        if (adjective.group === "i") {
            adjective.te = adjective.plain.slice(0, -1) + "くて";
        }
    };

    adjective.getTeN = function () {
        adjective.teN = adjective.plainN.slice(0, -1) + "くて";
    };

    adjective.post = function () {
        //Deal with「いい」
        if (adjective.isIi === true) {
            adjective.plain = "いい";
            adjective.predicate = "いい";
        }
        //goes through adjective object, checks for romaji and adjective
        var prop = "";
        for (prop in adjective) {
            if (typeof adjective[prop] === "string") {
                if (adjective.isKana === false) {
                    adjective[prop] = wanakana.toRomaji(adjective[prop]);
                }

                if (adjective.isAdjective === false) {
                    adjective[prop] = "";
                }
            } //string
        } //for in
    }; //post

    return adjective;
}); //define