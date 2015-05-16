requirejs.config({
    shim: {
        "bootstrap": {
            "deps": ['jquery']
        },
        "wanakana": {},
        "verb-conjugate": {}
    },
    paths: {
        "jquery": "lib/jquery-2.1.1.min",
        "bootstrap": "lib/bootstrap.min",
        "wanakana": "lib/wanakana",
        "verb": "verb"
    }
});

require(['jquery', 'verb', 'bootstrap'], function ($, verb) {

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
                $("#input").attr("placeholder", "する");
            }

            if ($(this).val() === "Romaji") {
                wanakana.unbind(input);
                $("#input").attr("placeholder", "suru");
            }
        });

        $("input:radio[name=verb-group]").change(function () {
            verb.groupOverride = true;
            if ($(this).val() === "Group 1") {
                verb.group = "1";
            } else if ($(this).val() === "Group 2") {
                verb.group = "2";
            } else {
                verb.groupOverride = false;
            }
        });


        verb.isKana = true;

        //Click the button to get the form value.
        $("#conjugate").click(function () {
            //clear callout
            printPage("callout", "");
            //clear table
            //Get raw input
            verb.raw = $("#input").val();
            verb.initial();

            if (verb.isVerb === false) {
                printPage("callout", "<div class=\"bs-callout bs-callout-danger\"> It doesn't look like \"" + verb.plain + "\" is a valid Japanese verb in plain form. Try something that ends with an \"u\".</div>");
            }
            if (verb.isExist === true) {
                printPage("callout", "<div class=\"bs-callout bs-callout-info\"> If you were referring to the existence construct " + verb.plain + " (to be), refer <a href = \"existence.html#aru\">here.</a></div>");
            }
            if (verb.isDesu === true) {
                printPage("callout", "<div class=\"bs-callout bs-callout-info\"> If you were referring to the existence construct " + verb.plain + " (is), refer <a href = \"http://www.guidetojapanese.org/learn/grammar/stateofbeing\">here.</a></div>");
            }
            verb.getGroup();
            verb.getStem();
            verb.getTe();
            verb.getPlainN();
            verb.getPast();
            verb.getPastN();
            verb.getVolitional();
            verb.getVolitionalN();
            verb.getConditional();
            verb.getConditionalN();
            verb.getPotential();
            verb.getPotentialN();
            verb.getCommand();
            verb.getCommandN();
            verb.getPassive();
            verb.getPassiveN();
            verb.getCausative();
            verb.getCausativeN();
            verb.post();
            //print table
            for (prop in verb) {
                if (typeof verb[prop] === "string") {
                    printPage(prop, verb[prop])
                }
            }
        }); //submit click
    });
});