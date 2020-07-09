function createXML1() {
    fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {

            var writing_score =
                data[0].clarity_of_writing_analysis.clarity_of_writing_analysis.readability.flesch_reading_ease;

            var reasoning =
                data[0].keyword_analysis.keyword_analysis.reasoning_86;

            var personal_experience =
                data[0].keyword_analysis.keyword_analysis.experience_9;
            var named_entites =
                data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
            var verb_events =
                data[0].event_analysis.event_analysis.verb_events;
            var timex_events =
                data[0].event_analysis.event_analysis.timex_events;
            var pronouns =
                data[0].named_entity_analysis.named_entity_analysis.pronouns;
            document.getElementById("articleInfo").innerHTML = article;
        });

    var doc = document.implementation.createDocument("", "", null);
    var root = doc.createElement("article");

    var argumentation1 = doc.createElement("argumentation");
    argumentation1.setAttribute("type", "reasoning");

    var argumentation2 = doc.createElement("argumentation");
    argumentation2.setAttribute("type", "claim");

    var argumentation3 = doc.createElement("argumentation");
    argumentation3.setAttribute("type", "conclusion");


    var evidence = doc.createElement("evidence");
    evidence.setAttribute("type", "experience", "sub-type", "named-entity");
    evidence.setAttribute("type", "experience", "sub-type", "verb-event");
    evidence.setAttribute("type", "experience", "sub-type", "timex-event");
    evidence.setAttribute("type", "experience", "sub-type", "pronoun");

    evidence.setAttribute("type", "citation", "sub-type", "self");

    article.appendChild(argumentation1);
    article.appendChild(argumentation2);
    article.appendChild(argumentation3);
    peopleElem.appendChild(evidence);
    doc.appendChild(article);

    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "RESEARCH");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "RESEARCH_SEARCH");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "DEVELOPER");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "EDUCATION");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "NEWS_AND_MAGAZINES");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "SOCIAL_MEDIA");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "GOVERNMENT");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "Q_AND_A");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "REPOSITORY");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "SANDBOX");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "E_COMMERCE");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "FORUM");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "BLOG");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "JOB_BOARD");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "WIKI");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "JOEL");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "DOCUMENTATION");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "ASSETS");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "SHORT_URL");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "LEARNING");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "RESOURCES");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "SUPPORT");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "ADVERTS");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "EVENTS");
    // evidence.setAttribute("type", "citation", "sub-type", "external", "classification", "ORGANISATIONS_AND_TECHNOLOGIES");


}


for (var a = 0; a < writing_score; a++) {
}

