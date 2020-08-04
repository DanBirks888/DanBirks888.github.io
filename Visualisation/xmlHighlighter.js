function highlightReasoning() {
        fetch("./language_wars.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                var article = new Mark(document.getElementById("articleInfo"));
                // var article = new Mark(document.querySelector(".text-justify"));
                var reasoning =
                        data[0].keyword_analysis.keyword_analysis.reasoning_86;
                // If Reason Toggle Is Checked
                var options = { className: "red", }
                if (document.getElementById("reCheck").checked) {
                    // Annotate Reasoning Elements
                    for (a in reasoning) {
                        var reason = reasoning[a].marker;
                        var regex_reason = new RegExp('(\\ |\\“|\\-)' + reason + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“)', "gmi");
                        article.markRegExp(regex_reason, options);
                    }
                } 
                else {
                    article.unmark(options);
                }
            });
}

function highlightExperience() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var article = new Mark(document.getElementById("articleInfo"));
            var options = { className: "blue1", }
            if (document.getElementById("expCheck").checked) {
                // Annotate Personal Experience Elements
                var exp =
                data[0].keyword_analysis.keyword_analysis.experience_9;
                for (b in exp) {
                    var exper = exp[b].marker;
                    var exp_regex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + exper + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                    
                    article.markRegExp(exp_regex, options);
                }
            } else {
                article.unmark(options);
            }   
        });
}

function highlightTimeEvents() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var article = new Mark(document.getElementById("articleInfo"));
            var options = { className: "blue2", }
            if (document.getElementById("timeCheck").checked) {
                // Annotate Time Events    
                var timex =
                data[0].event_analysis.event_analysis.timex_events;
                for (c in timex) {
                    var ti = timex[c];
                    var regex_timex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;\\“|\\*)\\' + ti + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                    
                    article.markRegExp(regex_timex, options);
                }
            } else {
                article.unmark(options);
            }   
        });
}

function highlightVerbEvents() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var article = new Mark(document.getElementById("articleInfo"));
            var options = { className: "blue3", }
            if (document.getElementById("verbCheck").checked) {
                // Annotate Verb Events
                var verb =
                data[0].event_analysis.event_analysis.verb_events;
                // const newVerb = Array.from(new Set(verb.map(a => a[0][0])))
                // .map(verb1 => {
                // return verb.find(a => a[0][0] === verb1)
                // })
                // console.log(newVerb);
                for (d in verb) {
                    var ve = verb[d];
                    var ver = ve[0];
                    var regex_verb = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + ver + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi"); 
                    article.markRegExp(regex_verb, options);
                }
            } else {
                article.unmark(options);
            }   
        });
}

function highlightNamedEntity() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var article = new Mark(document.getElementById("articleInfo"));
            var options = { className: "blue4", }
            if (document.getElementById("nameEnCheck").checked) {
                // Annotate NLTK Named Entities
                var nltk =
                data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
                const newNameEn = Array.from(new Set(nltk.map(a => a[0])))
                .map(ent => {
                return nltk.find(a => a[0] === ent)
                })
                for (e in newNameEn) {
                    var nl = newNameEn[e];
                    var regex_nltk = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + nl + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                    article.markRegExp(regex_nltk, options);
                }
            } else {
                article.unmark(options);
            }   
        });
}

function highlightPronouns() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var article = new Mark(document.getElementById("articleInfo"));
            var options = { className: "blue5", }
            if (document.getElementById("proCheck").checked) {
                // Annotated Pronouns
                var pronoun =
                data[0].named_entity_analysis.named_entity_analysis.pronouns;
                const newPronouns = Array.from(new Set(pronoun.map(a => a[0])))
                .map(pron => {
                return pronoun.find(a => a[0] === pron)
                })
                for (f in newPronouns) {
                    var pro = newPronouns[f];
                    var p = pro[0];
                    var regex_pronoun = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\*)\\" + p + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\*)", "gmi");
                    article.markRegExp(regex_pronoun, options);
                }
            } else {
                article.unmark(options);
            }   
        });
}

function highlightCitations() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var article = new Mark(document.getElementById("articleInfo"));
            var options = { className: "purple", }
            // If Citations Toggle Is Checked
            if (document.getElementById("citCheck").checked) {
                // Annotate Citations Elements
                var citations = 
                data[0].citations_analysis.citations_analysis.classified_external_uris;
                const newCitations = Array.from(new Set(citations.map(a => a.domain)))
                .map(domain => {
                return citations.find(a => a.domain === domain)
                })
                for (g in newCitations) {
                    var domain = newCitations[g].domain;
                    var regex_cit = new RegExp(domain + ".+?(?= )", "gmi");
                    article.markRegExp(regex_cit, options);
                }
            } else {
                article.unmark(options);
            }
        });
}

      //     var wordStore = "";
                //     for (a1 in reasoning) {
                //         var reason = reasoning[a1].marker;
                //          wordStore += reason + ", ";
                //     }
                //     var splicedUnmark = wordStore.slice(" ",-2);
                //     var unmarkOptions = { "element": splicedUnmark };
                //     console.log(unmarkOptions);
                //     article.unmark(unmarkOptions);
                // }