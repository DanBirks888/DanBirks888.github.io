function generateXML() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var article =
                data[0].extracted_article.extracted_article.pattern_extraction
                    .extracted_html;
            // Add XML Documentation
            var output = '<?xml version="1.0" encoding="UTF-8"?>'

            // Add Readability Score
            var score =
                data[0].clarity_of_writing_analysis.clarity_of_writing_analysis.readability.flesch_reading_ease;
            output += "<article readability_score=" + score + ">"
            // Add Full Article
            output += article;
            // Annotate Reasoning Elements

            var reasoning =
                data[0].keyword_analysis.keyword_analysis.reasoning_86;
            for (a in reasoning) {
                var reason = reasoning[a].marker;
                var regex = new RegExp("\\b" + reason, "gmi");
                var xml_reason = "<argumentation type='reasoning'>" + reason + "</argumentation>"
                output = output.replace(regex,xml_reason);
            }

            // Annotate Personal Experience Elements
            var exp =
                data[0].keyword_analysis.keyword_analysis.experience_9;
            for (b in exp) {
                var exper = exp[b].marker;
                if (exper.length == 1) {
                    var single = exper + " ";
                    var regex1 = new RegExp("\\b" + single, "gmi");
                } else {
                    var regex1 = new RegExp("\\b" + exper, "gmi");
                }
                
                var xml_evidence = "<evidence type='experience' sub-type='personal-experience'>" + exper + "</evidence>"
                output = output.replace(regex1,xml_evidence);
            }
            // Annotate Time Events

            var timex =
                data[0].event_analysis.event_analysis.timex_events;
            for (c in timex) {
                var ti = timex[c];
                var regex_timex = new RegExp("\\b" + ti, "gmi");
                var xml_timex = "<evidence type='experience' sub-type='timex-event'>" + ti + "</evidence>"
                output = output.replace(regex_timex, xml_timex);
            }

            // Annotate Verb Events
            var verb =
                data[0].event_analysis.event_analysis.verb_events;
            for (d in verb) {
                var ve = verb[d];
                var ver = ve[0];
                if (ver.length > 1) {
                    var regex_verb = new RegExp("\\b" + ver, "gmi");
                    var xml_verb = "<evidence type='experience' sub-type='verb-event'>" + ver + "</evidence>"
                    output = output.replace(regex_verb, xml_verb);
                }
                
              
            }

            // Annotate NLTK Named Entities

            var nltk =
                data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
            for (e in nltk) {
                var nl = nltk[e];
                var regex_nltk = new RegExp("\\b" + nl, "gmi");
                var xml_nltk = "<evidence type='experience' sub-type='named-entity'>" + nl + "</evidence>"
                output = output.replace(regex_nltk, xml_nltk);
            }

            // Annotated Pronouns

            // var pronoun =
            //     data[0].named_entity_analysis.named_entity_analysis.pronouns;
            // for (f in pronoun) {
            //     var pro = pronoun[f];
            //     var p = pro[0];
            //     var regex_pronoun = new RegExp("\\b" + pro[0], "gmi");
            //     var xml_pronoun = "<evidence type='experience' sub-type='pronoun'>" + pro[0] + "</evidence>"
            //     output = output.replace(regex_pronoun, xml_pronoun);
            // }

            // var citations = 
            //        data[0].citations_analysis.citations_analysis.classified_external_uris;
            //        for (g in citations) {
            //            var domain = citations[g].domain;
            //            var cit = citations[g].classifications[0];
            //            console.log(cit[g]);
            //        }

                   
            
            // End of XML File
            output += "</article>";
            // Show In Console
            console.log(output);

        });
}



