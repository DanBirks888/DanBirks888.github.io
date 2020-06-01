function highlightReasoning() {
    if (document.getElementById("reCheck").checked) {
        fetch("./language_wars.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                var reasoning =
                    data[0].keyword_analysis.keyword_analysis.reasoning_86;

                var instance = new Mark(document.getElementById("articleInfo"));

                var i;
                for (i = 0; i < reasoning.length; i++) {
                    instance.mark([reasoning[i].marker], {
                        "accuracy": {
                            "value": "exactly",
                            "limiters": [",", "."],
                        },
                        separateWordSearch: false,
                        className: "red",
                    });
                }
            });
    }
    if (document.getElementById("reCheck").checked == false) {
        var instance = new Mark(document.getElementById("articleInfo"));
        instance.unmark();
    }
}

function highlightExperience() {
    if (document.getElementById("expCheck").checked) {
        fetch("./language_wars.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                var exp =
                    data[0].keyword_analysis.keyword_analysis.experience_9;
                var timex =
                    data[0].event_analysis.event_analysis.timex_events;

                var instance = new Mark(document.getElementById("articleInfo"));

                var i;
                for (i = 0; i < exp.length; i++) {
                    instance.mark([exp[i].marker], {
                        "accuracy": {
                            "value": "exactly",
                            "limiters": [",", "."],
                        },
                        separateWordSearch: false,
                        className: "blue1",
                    });
                }
                var a;
                for (a = 0; a < timex.length; a++) {
                    instance.mark([timex[a]], {
                        "accuracy": {
                            "value": "exactly",
                            "limiters": [",", "."],
                        },
                        separateWordSearch: false,
                        className: "blue2",
                    });
                }
            });
    }
    if (document.getElementById("expCheck").checked == false) {
        var instance = new Mark(document.getElementById("articleInfo"));
        instance.unmark();
    }
}


