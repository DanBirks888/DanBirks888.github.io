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
            output += "<article='readability_score'=" + score + ">"
            // Add Full Article
            output += article;

            //     var regex_html = new RegExp('a href="', "gmi");
            //     var testingg = "testingg"
            //     output.replace(regex_html, "");

            

            // console.log(output);

            // Annotate Citations Elementsz
            // var citations = 
            //        data[0].citations_analysis.citations_analysis.classified_external_uris;
            //        for (g in citations) {
            //         var domain = citations[g].domain;
            //         var regex_cit = new RegExp(domain, "gmi");
            //         var class_array = citations[g].classifications;
            //         var cit = class_array[g];
            //         var classify = cit[0];
            //         console.log(classify);
                    // for (cl in citations[g].classifications[cl[0]]) {
                    //     var synt = "'" + cl + "'; ";
                    //     var classify;
                    //     classify += synt;
                    // }
                    // console.log(classify);
                    // var xml_cit = "<evidence type='citation' sub-type='external' classification='" + classify + "'" + domain + "</evidence>"
                    // output = output.replace(regex_cit,xml_cit);
                    // console.log(domain);
                // }

            // Code for iterating through citations and classifications 
            // Gets stuck at array 12 because it provides a ' or " as a word
            // var citations1 = 
            //        data[0].citations_analysis.citations_analysis.classified_external_uris;
            //         for (g in citations1) {
            //             var domain = citations1[g].domain;
            //             var cit = citations1[g].classifications[0];
            //             console.log(cit[g]);
            //         }


            // Annotate Reasoning Elements
            var reasoning =
                data[0].keyword_analysis.keyword_analysis.reasoning_86;
            for (a in reasoning) {
                var reason = reasoning[a].marker;
                var regex = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;)\\" + reason + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;)", "gmi");
                var xml_reason = "<argumentation type='reasoning'>" + reason + "</argumentation>"
                output = output.replace(regex,xml_reason);
            }

            // Annotate Personal Experience Elements
            var exp =
                data[0].keyword_analysis.keyword_analysis.experience_9;
            for (b in exp) {
                var exper = exp[b].marker;
                var regex1 = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;)\\" + exper + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;)", "gmi");
                var xml_evidence = "<evidence type='experience' sub-type='personal-experience'>" + exper + "</evidence>"
                output = output.replace(regex1,xml_evidence);
            }
                
            // Annotate Time Events

            var timex =
                data[0].event_analysis.event_analysis.timex_events;
            for (c in timex) {
                var ti = timex[c];
                var regex_timex = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;)\\" + ti + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;)", "gmi");
                var xml_timex = "<evidence type='experience' sub-type='timex-event'>" + ti + "</evidence>"
                output = output.replace(regex_timex, xml_timex);
            }

            // Annotate Verb Events
            // The reason it wasnt working was because some verbs were class as ' or * which confused regex without a \\ to confirm
            var verb =
                data[0].event_analysis.event_analysis.verb_events;
            for (d in verb) {
                var ve = verb[d];
                var ver = ve[0];
                var regex_verb = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;)\\" + ver + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;)", "gmi");
                var xml_verb = "<evidence type='experience' sub-type='verb-event'>" + ver + "</evidence>"
                output = output.replace(regex_verb, xml_verb);
                }

            // Annotate NLTK Named Entities
            var nltk =
                data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
            for (e in nltk) {
                var nl = nltk[e];
                var regex_nltk = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;)\\" + nl + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;)", "gmi");
                var xml_nltk = "<evidence type='experience' sub-type='named-entity'>" + nl + "</evidence>"
                output = output.replace(regex_nltk, xml_nltk);
            }

            // Annotated Pronouns
            var pronoun =
                data[0].named_entity_analysis.named_entity_analysis.pronouns;
            for (f in pronoun) {
                var pro = pronoun[f];
                var p = pro[0];
                var regex_pronoun = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;)\\" + p + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;)", "gmi");
                var xml_pronoun = "<evidence type='experience' sub-type='pronoun'>" + p + "</evidence>"
                output = output.replace(regex_pronoun, xml_pronoun);
            }


            // End of XML File
            output += "</article>";
            // Show In Console
            console.log(output);

        });
}



