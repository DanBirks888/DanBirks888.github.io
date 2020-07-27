function highlightReasoning() {
        fetch("./language_wars.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
                var article = new Mark(document.getElementById("articleInfo"));
                var reasoning =
                        data[0].keyword_analysis.keyword_analysis.reasoning_86;
                // If Reason Toggle Is Checked
                if (document.getElementById("reCheck").checked) {
                    // Annotate Reasoning Elements
                    for (a in reasoning) {
                        var reason = reasoning[a].marker;
                        var regex_reason = new RegExp('(\\ |\\“|\\-)' + reason + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“)', "gmi");
                        var options = { className: "red", }
                        article.markRegExp(regex_reason, options);
                    }
                } else {
                    var wordStore = "";
                    for (a1 in reasoning) {
                        var reason = reasoning[a1].marker;
                         wordStore += reason + ", ";
                    }
                    var splicedUnmark = wordStore.slice(" ",-2);
                    var unmarkOptions = { "element": splicedUnmark };
                    console.log(unmarkOptions);
                    article.unmark(unmarkOptions);
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
            if (document.getElementById("expCheck").checked) {
                // Annotate Personal Experience Elements
                var exp =
                data[0].keyword_analysis.keyword_analysis.experience_9;
                for (b in exp) {
                    var exper = exp[b].marker;
                    var exp_regex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + exper + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                    var options = { className: "blue1", }
                    article.markRegExp(exp_regex, options);
                }
                // Annotate Time Events    
                var timex =
                data[0].event_analysis.event_analysis.timex_events;
                for (c in timex) {
                    var ti = timex[c];
                    var regex_timex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;\\“|\\*)\\' + ti + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                    var options = { className: "blue2", }
                    article.markRegExp(regex_timex, options);
                }
                // Annotate Verb Events
                var verb =
                data[0].event_analysis.event_analysis.verb_events;
                for (d in verb) {
                    var ve = verb[d];
                    var ver = ve[0];
                    var regex_verb = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + ver + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi"); 
                    var options = { className: "blue3", }
                    article.markRegExp(regex_verb, options);
                }
                // Annotate NLTK Named Entities
                var nltk =
                data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
                for (e in nltk) {
                    var nl = nltk[e];
                    var regex_nltk = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + nl + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                    var options = { className: "blue4", }
                    article.markRegExp(regex_nltk, options);
                }
                // Annotated Pronouns
                var pronoun =
                data[0].named_entity_analysis.named_entity_analysis.pronouns;
                for (f in pronoun) {
                    var pro = pronoun[f];
                    var p = pro[0];
                    var regex_pronoun = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\*)\\" + p + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\*)", "gmi");
                    var options = { className: "blue5", }
                    article.markRegExp(regex_pronoun, options);
                }
            } else {
                article.unmark();
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
                    var options = { className: "purple", }
                    article.markRegExp(regex_cit, options);
                }
            } else {
                article.unmark();
            }
        });
}