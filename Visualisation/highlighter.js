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
                var verb =
                    data[0].event_analysis.event_analysis.verb_events;
                var nltk =
                    data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
                var pronoun =
                    data[0].named_entity_analysis.named_entity_analysis.pronouns;


                var instance = new Mark(document.getElementById("articleInfo"));

                var a;
                for (a = 0; a < exp.length; a++) {
                    instance.mark([exp[a].marker], {
                        "accuracy": {
                            "value": "exactly",
                            "limiters": [",", "."],
                        },
                        separateWordSearch: false,
                        className: "blue1",
                    });
                }
                var b;
                for (b = 0; b < timex.length; b++) {
                    instance.mark([timex[b]], {
                        "accuracy": {
                            "value": "exactly",
                            "limiters": [",", "."],
                        },
                        separateWordSearch: false,
                        className: "blue2",
                    });
                }
                var c;
                for (c = 0; c < verb.length; c++) {
                    var vb = verb[c];
                    instance.mark([vb[0]], {
                        "accuracy": {
                            "value": "exactly",
                            "limiters": [",", "."],
                        },
                        separateWordSearch: false,
                        className: "blue3",
                    });
                }
                var d;
                for (d = 0; d < nltk.length; d++) {
                    instance.mark([nltk[d]], {
                        "accuracy": {
                            "value": "exactly",
                            "limiters": [",", "."],
                        },
                        separateWordSearch: false,
                        className: "blue4",
                    });
                }
                var e;
                for (e = 0; e < pronoun.length; e++) {
                    var pn = pronoun[e];
                    instance.mark([pn[0]], {
                        "accuracy": {
                            "value": "exactly",
                            "limiters": [",", "."],
                        },
                        separateWordSearch: false,
                        className: "blue5",
                    });
                }
            });
    }
    if (document.getElementById("expCheck").checked == false) {
        var instance = new Mark(document.getElementById("articleInfo"));
        instance.unmark();
    }
}


