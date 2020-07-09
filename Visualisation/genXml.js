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
                var re = reasoning[a].marker;
                output = output.replace(" " + re + " ", "<argumentation type='reasoning'>" + re + "</argumentation>");
            }
            // Annotate Personal Experience Elements
            var exp =
                data[0].keyword_analysis.keyword_analysis.experience_9;
            for (b in exp) {
                var ex = exp[b].marker;
                output = output.replace(" " + ex + " ", "<evidence type='experience' sub-type='personal-experience'>" + ex + "</evidence>");
            }
            // Annotate Time Events
            var timex =
                data[0].event_analysis.event_analysis.timex_events;
            for (c in timex) {
                var ti = timex[c];
                output = output.replace(" " + ti + " ", "<evidence type='experience' sub-type='timex-event'>" + ti + "</evidence>");
            }
            // Annotate Verb Events
            var verb =
                data[0].event_analysis.event_analysis.verb_events;
            for (d in verb) {
                var ve = verb[d];
                output = output.replace(" " + ve[0] + " ", "<evidence type='experience' sub-type='verb-event'>" + ve[0] + "</evidence>");
            }
            // Annotate NLTK Named Entities
            var nltk =
                data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
            for (e in nltk) {
                var nl = nltk[e];
                output = output.replace(" " + nl + " ", "<evidence type='experience' sub-type='named-entity'>" + nl + "</evidence>");
            }
            // Annotated Pronouns
            var pronoun =
                data[0].named_entity_analysis.named_entity_analysis.pronouns;
            for (f in pronoun) {
                var pro = pronoun[f];
                output = output.replace(" " + pro[0] + " ", "<evidence type='experience' sub-type='pronoun'>" + pro[0] + "</evidence>");
            }
            // End of XML File
            output += "</article>";
            // Show In Console
            console.log(output);

        });
}



