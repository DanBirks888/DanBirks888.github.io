function exportXML() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            // The The Article Location
            var article =
                data[0].extracted_article.extracted_article.pattern_extraction
                    .extracted_html; 
            // Place Article In Temporary Variable
            var oldArticle = "";
            oldArticle += article;

            // Remove and replace all Hyper References
            var hr = /(<a href="http:\/\/|<a href="https:\/\/|href="http:\/\/|href="https:\/\/|href=".+?(?=>))/gmi;
            var head = /(<h[1-6]>|<\/h[1-6]>|<a|<\/a>)/g;
            var remain = /(<|>|\*|\/">)/g;
            oldArticle = oldArticle.replace(hr, "");
            oldArticle = oldArticle.replace(head, "");
            oldArticle = oldArticle.replace(remain, " ");

            // Add XML Documentation
            var output = '<?xml version="1.0" encoding="UTF-8"?>'

            // Add Readability Score
            var score =
                data[0].clarity_of_writing_analysis.clarity_of_writing_analysis.readability.flesch_reading_ease;
            output += '<article readability_score="' + score + '">';

            // Add Filtered Article to output
            output += oldArticle;
            
            // If Reason Toggle Is Checked
            if (document.getElementById("reCheck").checked) {
            // Annotate Reasoning Elements
            var reasoning =
                data[0].keyword_analysis.keyword_analysis.reasoning_86;
            for (a in reasoning) {
                var reason = reasoning[a].marker;
                var regex_reason = new RegExp('(\\ |\\“|\\-)' + reason + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“)', "gmi");
                var xml_reason = "<argumentation type='reasoning'>" + reason + "</argumentation>";
                output = output.replace(regex_reason,xml_reason);
            }
        }

            // If Experience Toggle Is Checked
            if (document.getElementById("expCheck").checked) {
            // Annotate Personal Experience Elements
            var exp =
                data[0].keyword_analysis.keyword_analysis.experience_9;
            for (b in exp) {
                var exper = exp[b].marker;
                var exp_regex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + exper + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                var xml_evidence = "<citation type='experience' sub-type='self'>" + exper + "</citation>";
                output = output.replace(exp_regex,xml_evidence);
            }
        }
            // If Time Toggle Is Checked
            if (document.getElementById("timeCheck").checked) {
            // Annotate Time Events    
            var timex =
                data[0].event_analysis.event_analysis.timex_events;
            for (c in timex) {
                var ti = timex[c];
                var regex_timex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;\\“|\\*)\\' + ti + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                var xml_timex = "<evidence type='experience' sub-type='timex-event'>" + ti + "</evidence>";
                output = output.replace(regex_timex, xml_timex);
            }
        }
            // If Verb Toggle Is Checked
            if (document.getElementById("verbCheck").checked) {
            // Annotate Verb Events
            var verb =
                data[0].event_analysis.event_analysis.verb_events;
            for (d in verb) {
                var ve = verb[d];
                var ver = ve[0];
                var regex_verb = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + ver + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi"); 
                var xml_verb = "<evidence type='experience' sub-type='verb-event'>" + ver + "</evidence>";
                // console.log(regex_verb);
                output = output.replace(regex_verb, xml_verb);
            }
        }
            // If Named Entities Toggle Is Checked
            if (document.getElementById("nameEnCheck").checked) {
            // Annotate NLTK Named Entities
            var nltk =
                data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
            for (e in nltk) {
                var nl = nltk[e];
                var regex_nltk = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + nl + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                var xml_nltk = "<evidence type='experience' sub-type='named-entity'>" + nl + "</evidence>";
                output = output.replace(regex_nltk, xml_nltk);
            }
        }
            // If Pronoun Toggle Is Checked
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
                var xml_pronoun = "<evidence type='experience' sub-type='pronoun'>" + p + "</evidence>";
                output = output.replace(regex_pronoun, xml_pronoun);
            }
        }
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
                var clif = newCitations[g].classifications;
                var citList = "'[";
                for (cl in clif) {
                    var cite = clif[cl][0] + ", ";
                    citList += cite;
                    var splicedCit = citList.slice(" ",-2);
                }
                citList = "";
                var xml_cit = "<evidence type='citation' sub-type='external' classification=" + splicedCit + "]'>" + domain + "</evidence>";
                output = output.replace(regex_cit,xml_cit);
            }
        }
        
            // End of XML File
            output += "</article>";

            // Show In Console
            // console.log(output);

            // Export the XML file into a document
            var blob = new Blob([output], {
                type: "text/xml;charset=utf-8"
            });
            var fileName = document.getElementById("user").value;
            saveAs(blob, fileName);
        }, false);
}