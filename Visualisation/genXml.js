function generateXML() {
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
            
            // Annotate Citations Elements
            var citations = 
            data[0].citations_analysis.citations_analysis.classified_external_uris;
            for (g in citations) {
                var domain = citations[g].domain;
                var regex_cit = new RegExp(domain + ".+?(?= )", "gmi");
                var clif = citations[g].classifications;
                var citList = "'[";
                for (cl in clif) {
                    var cite = clif[cl][0] + ", ";
                    citList += cite;
                    var splicedCit = citList.slice(" ",-2);
                }
                // console.log("<evidence type='citation' sub-type='external' classification=" + splicedCit + "]'>" + "</evidence>");
                citList = "";
                // var xml_cit = "<evidence type='citation' sub-type='external' classification=" + splicedCit + "]'>" + domain + "</evidence>";
                // var xml_cit = "<test>" + domain + "</test>";
                // output = output.replace(regex_cit,xml_cit);
            }

             // console.log(citations);

            // function removeDuplicates(array) {
            //     return array.filter((a, b) => array.indexOf(a) === b)
            //   };
            
            var citations = 
            data[0].citations_analysis.citations_analysis.classified_external_uris;

            const newCitations = Array.from(new Set(citations.map(a => a.domain)))
            .map(domain => {
            return citations.find(a => a.domain === domain)
            })
            console.log(newCitations);

            // console.log(citations);
            // citations.filter((a, b) => citations.indexOf(a) === b);
            // console.log(citations);
            
            //   citations.filter((a, b) => 
            //     {
            //     console.log(a.domain + " " + citations[b].domain);
            //     return a.domain === b.domain;
            //     });
            //   var test = removeDuplicates(citations);
            //   console.log(test);

            // for (g in citations) {
            //     var domain = citations[g].domain;
            //     var regex_cit = new RegExp(domain, "gmi");
            //     var xml_cit = "<test>" + domain + "</test>";
            //     output = output.replace(regex_cit,xml_cit);
            // }


            // Annotate Reasoning Elements
            // Only returns the right amount without the bracket before the variable
            // Outcasts any array word which doesnt only show up once in the array

            var reasoning =
                data[0].keyword_analysis.keyword_analysis.reasoning_86;
            for (a in reasoning) {
                var reason = reasoning[a].marker;
                var regex_reason = new RegExp('(\\ |\\“|\\-)' + reason + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“)', "gmi");
                var xml_reason = "<argumentation type='reasoning'>" + reason + "</argumentation>";
                output = output.replace(regex_reason,xml_reason);
            }

            // Annotate Personal Experience Elements
            // Only 41 In JSON but returns 48
            // Adding in the quotation marks has decreased search result to 38

            var exp =
                data[0].keyword_analysis.keyword_analysis.experience_9;
            for (b in exp) {
                var exper = exp[b].marker;
                var exp_regex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + exper + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                var xml_evidence = "<citation type='experience' sub-type='self'>" + exper + "</citation>";
                output = output.replace(exp_regex,xml_evidence);
            }
                
            // Annotate Time Events

            var timex =
                data[0].event_analysis.event_analysis.timex_events;
            for (c in timex) {
                var ti = timex[c];
                var regex_timex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;\\“|\\*)\\' + ti + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                var xml_timex = "<evidence type='experience' sub-type='timex-event'>" + ti + "</evidence>";
                output = output.replace(regex_timex, xml_timex);
            }

            // Annotate Verb Events
            // The reason it wasnt working was because some verbs were class as ' or * which confused regex without a \\ to confirm
           
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

            // Annotate NLTK Named Entities

            var nltk =
                data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
            for (e in nltk) {
                var nl = nltk[e];
                var regex_nltk = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + nl + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                var xml_nltk = "<evidence type='experience' sub-type='named-entity'>" + nl + "</evidence>";
                output = output.replace(regex_nltk, xml_nltk);
            }

            // Annotated Pronouns

            var pronoun =
                data[0].named_entity_analysis.named_entity_analysis.pronouns;
            for (f in pronoun) {
                var pro = pronoun[f];
                var p = pro[0];
                var regex_pronoun = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\*)\\" + p + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\*)", "gmi");
                var xml_pronoun = "<evidence type='experience' sub-type='pronoun'>" + p + "</evidence>";
                output = output.replace(regex_pronoun, xml_pronoun);
            }


            // End of XML File
            output += "</article>";
            // Show In Console
            console.log(output);

        });
}



            // Different REGEX Patterns Used to remove HTML

            // var count_header = (output.match(/(<h1>|\/1>|)/g) || []).length;
            // var count_hr = (output.match(/<a href=("http:|"https:)\/\//g) || []).length;
            // var test = new RegExp(head, "g");
            // var test = new RegExp(hr, "g");
            // var hr2 = /(<a href="#tab-[1-9]">|\* <a href="#tab-[1-9]">|*<a href="#[a-z])/g;
            

