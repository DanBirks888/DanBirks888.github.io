function generateXML1() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            // Gets the JSON file
            var article_text = data[0].extracted_article.extracted_article.pattern_extraction
                .extracted_html;
            // Declare XML string variable
            var output = '<?xml version="1.0" encoding="UTF-8"?> <article>'
            // Reasoning Words Location
            var reason =
                data[0].keyword_analysis.keyword_analysis.reasoning_86;
            // The annotation functionality
            for (word in article_text) {
                // If Reasoning Word is the same annotate it
                if (word.equals(reason[word].marker) == true) {
                    word.replace("<argumentation type='reasoning'>,", word, "</argumentation>")
                }
                // Add the word to the output file
                output += word;
            }
            // End of the string to close the XML document
            output += "</article>";
            // Final variable which can be exported
            return output;
        });
}

            // var a;
            // for (a = 0; a < exp.length; a++) {
            //     var exper = [exp[a].marker];
            // }
            // var b;
            // for (b = 0; b < timex.length; b++) {
            //     var tim = timex[b];
            // }
            // var c;
            // for (c = 0; c < verb.length; c++) {
            //     var vb = verb[c];
            //     var vb2 = vb[c];
            // }
            // var d;
            // for (d = 0; d < nltk.length; d++) {
            //     var nk = nltk[d];
            // }
            // var e;
            // for (e = 0; e < pronoun.length; e++) {
            //     var pn = pronoun[e];
            //     var pn2 = pn[e]
            // }
            // var f;
            // for (f = 0; f < pronoun.length; f++) {
            //     var ex = exp[e];
            // }
            // var f;
            // for (f = 0; f < reason.length; f++) {
            //     var rea = reason[e];
            // }
            // var g;
            // for (g = 0; f < w_score.length; g++) {
            //     var ws = w_score[e];
            // }
            // var w_score =
            // data[0].clarity_of_writing_analysis.clarity_of_writing_analysis.readability.flesch_reading_ease;
            // var reason =
            // data[0].keyword_analysis.keyword_analysis.reasoning_86;
            // var exp =
            // data[0].keyword_analysis.keyword_analysis.experience_9;
            // var timex =
            // data[0].event_analysis.event_analysis.timex_events;
            // var verb =
            // data[0].event_analysis.event_analysis.verb_events;
            // var nltk =
            // data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
            // var pronoun =
            // data[0].named_entity_analysis.named_entity_analysis.pronouns;

            // for (word in reason) {
            //     var re = reason[word].marker
            //     if (article_text.equals(word)) {
            //     console.log(re);
            //     }
            // }

            // Store the entire article in this variable
            // output += article_text;