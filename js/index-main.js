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



});