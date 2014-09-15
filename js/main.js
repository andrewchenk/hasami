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
                $("#input").attr("placeholder", "たべる");
            }

            if ($(this).val() === "Romaji") {
                wanakana.unbind(input);
                $("#input").attr("placeholder", "taberu");
            }
        });

        //Click the button to get the form value.
        $("#conjugate").click(function () {
            //clear callout
            printPage("callout", "");
            //clear table
            verb.getRaw();
            verb.getUAndSetKana();
            verb.getSlice();
            verb.setVerb();
            if (verb.isVerb === false) {
                printPage("callout", "<div class=\"bs-callout bs-callout-danger\"> It doesn't look like " + verb.u + " is a valid Japanese verb in plain form. Try something that ends with an \"u\".</div>");
            }
            if (verb.isExist === true) {
                printPage("callout", "<div class=\"bs-callout bs-callout-info\"> If you were referring to the existence construct " + verb.u + " (to be), refer <a href = \"existence.html#aru\">here.</a></div>");
            }
            if (verb.isDesu === true) {
                printPage("callout", "<div class=\"bs-callout bs-callout-info\"> If you were referring to the existence construct " + verb.u + " (is), refer <a href = \"existence.html#desu\">here.</a></div>");
            }
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
            verb.getReru();
            verb.getRerunai();
            verb.getSeru();
            verb.getSerunai();
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