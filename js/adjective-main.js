requirejs.config({
    shim: {
        "bootstrap": {
            "deps": ['jquery']
        },
        "wanakana": {},
        "adjective-conjugate": {}
    },
    paths: {
        "jquery": "lib/jquery-2.1.1.min",
        "bootstrap": "lib/bootstrap.min",
        "wanakana": "lib/wanakana",
        "adjective": "adjective"
    }
});

require(['jquery', 'adjective', 'bootstrap'], function ($, adjective) {

    // DOM ready
    $(document).ready(function () {
        $("input").keyup(function (event) {
            if (event.keyCode == 13) {
                $("#conjugate").click();
            }
        });
        //check if in array
        function isInArray(array, search) {
                return array.indexOf(search) >= 0;
            }
            //print page
        function printPage(id, value) {
                $("#" + id).replaceWith("<div id = " + id + ">" + value + "</span>");
            }
            //bind input to wanakana on page load
        var input = document.getElementById("input");
        wanakana.bind(input);

        //check radio buttons and enact changes on enter form
        $("input:radio[name=input-method]").change(function () {
            if ($(this).val() === "Hiragana") {
                //wanakana support
                wanakana.bind(input);
                $("#input").attr("placeholder", "すき");
            }

            if ($(this).val() === "Romaji") {
                wanakana.unbind(input);
                $("#input").attr("placeholder", "suki");
            }
        });

        $("input:radio[name=adjective-group]").change(function () {
            adjective.groupOverride = true;
            if ($(this).val() === "na") {
                adjective.group = "na";
            } else if ($(this).val() === "i") {
                adjective.group = "i";
            } else {
                adjective.groupOverride = false;
            }
        });


        adjective.isKana = true;

        //Click the button to get the form value.
        $("#conjugate").click(function () {
            //clear callout
            printPage("callout", "");
            //clear table
            //Get raw input
            adjective.raw = $("#input").val();
            adjective.initial();

            if (adjective.isAdjective === false) {
                printPage("callout", "<div class=\"bs-callout bs-callout-danger\"> It doesn't look like \"" + adjective.plain + "\" is a valid Japanese adjective. Check your spelling.</div>");
            }

            adjective.getGroup();
            adjective.getPlainN();
            adjective.getPredicate();
            adjective.getPredicateN();
            adjective.getAdverb();
            adjective.getAdverbN();
            adjective.getPast();
            adjective.getPastN();
            adjective.getTe();
            adjective.getTeN();
            adjective.post();
            //print table
            for (prop in adjective) {
                if (typeof adjective[prop] === "string") {
                    printPage(prop, adjective[prop])
                }
            }
        }); //submit click
    });
});