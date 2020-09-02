
fetch("./language_wars.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            // References From the Article
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
            var article =
                data[0].extracted_article.extracted_article.pattern_extraction.extracted_html;       
            var oldCitations = 
            data[0].citations_analysis.citations_analysis.classified_external_uris;


            // None Duplicated Citations Method
            const citations = Array.from(new Set(oldCitations.map(a => a.domain)))
            .map(domain => {
            return oldCitations.find(a => a.domain === domain)
            });

            // Number Of None-Duplicated Citations in Article
            var citationsSize = citations.length;

            // Citations Names
            var citNames = [];
            for (citName in citations) {
              var c = citations[citName].domain;
              citNames[citName] = c;
            }

            // Make new array of Just Domain Names
            var justDomain = [];
            for (domName in oldCitations) {
              var d = oldCitations[domName].domain
              justDomain[domName] = d;
            }

            // Count Array of Citations to Check for Duplicates
            var count = {};
            justDomain.forEach(function(i) { count[i] = (count[i]||0) + 1;});

            // Citations Largest Number First
            var citationCount = [];
            for(var o in count) {
                citationCount.push(count[o]);
            }

            // Reasoning Count
            var reaAmount = 0;
            for (reCount in reasoning) {
              reaAmount += reasoning[reCount].ngrams_count;
            }
            // Experience Count
            var expAmount = 0;
            for (expCount in personal_experience) {
              expAmount += personal_experience[expCount].ngrams_count;
            }
            // Named Entities Count
            var entityAmount = 0;
            for (entCount in named_entites) {
              entityAmount ++;
            }
            // Verb Count
            var verbAmount = 0;
            for (verbCount in verb_events) {
              verbAmount ++;
            }
            // Time Count
            var timeAmount = 0;
            for (timeCount in timex_events) {
              timeAmount ++;
            }
            var proAmount = 0;
            for (claimCount in pronouns) {
              proAmount ++;
            }
            var citAmount = 0;
            for (citCount in oldCitations) {
              citAmount ++;
            }
            var codeAmount = 0;

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
            // Add Filtered Article to output
            var wholeArticle = "";
            wholeArticle += oldArticle;
            // Divide Article into Array Line by Line
            var linesArticle = wholeArticle.split(/[\r\n]+/g);
            // Count Total Lines and Name them For Chart
            var sentence = [];
            for (line in linesArticle) {
              sentence[line] = "Sentence " + line;
            }
            // Reasoning Count per Line
            var numberReasoningMarkers = new Array(linesArticle.length).fill(0);
            var numberPExperienceMarkers = new Array(linesArticle.length).fill(0);
            var numberEntityMarkers = new Array(linesArticle.length).fill(0);
            var numberVerbMarkers = new Array(linesArticle.length).fill(0);
            var numberTimeMarkers = new Array(linesArticle.length).fill(0);
            var numberPronounMarkers = new Array(linesArticle.length).fill(0);
            var numberCitationsMarkers = new Array(linesArticle.length).fill(0);
            var numberCodeMarkers = new Array(linesArticle.length).fill(0);
            // For Loops which store the amount of markers Per Line
            for (line in linesArticle) {
              for (r in reasoning) {
                var regex_reason = new RegExp('(\\ |\\“|\\-)' + reasoning[r].marker + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“)', "gmi");
                if (linesArticle[line].match(regex_reason)) {
                  numberReasoningMarkers[line] += 1;
                }
              } 
              for (p in personal_experience) {
                var exp_regex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + personal_experience[p].marker + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                if (linesArticle[line].match(exp_regex)) {
                  numberPExperienceMarkers[line] += 1;
                }
              }
              for (n in named_entites) {
                var regex_nltk = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + named_entites[n] + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                if (linesArticle[line].match(regex_nltk)) {
                  numberEntityMarkers[line] += 1;
                }
              }
              for (v in verb_events) {
                var regex_verb = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)\\' + verb_events[v][0] + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi"); 
                if (linesArticle[line].match(regex_verb)) {
                  numberVerbMarkers[line] += 1;
                }
              }  
              for (t in timex_events) {
                var regex_timex = new RegExp('(\\ |\\,|\\.|\\!|\\?|\\:|\\;\\“|\\*)\\' + timex_events[t] + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“|\\*)', "gmi");
                if (linesArticle[line].match(regex_timex)) {
                  numberTimeMarkers[line] += 1;
                }
              }  
              for (p in pronouns) {
                var regex_pronoun = new RegExp("(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\*)\\" + pronouns[p][0] + "(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\*)", "gmi");
                if (linesArticle[line].match(regex_pronoun)) {
                  numberPronounMarkers[line] += 1;
                }
              }  
              for (ci in oldCitations) {
                var domain = oldCitations[ci].domain;
                var regex_cit = new RegExp(domain + ".+?(?= )", "gmi");
                if (linesArticle[line].match(regex_cit)) {
                  numberCitationsMarkers[line] += 1;
                }
              }  
           } // Lines In Article Full For Loop

            // Mean Of The Sentence Count
            var meanAmount = 0;
            for (mean in linesArticle) { meanAmount += linesArticle[mean].split(" ").length; }
            var me = meanAmount / linesArticle.length;
            var finalMeanAmount = Math.round(me);
            document.getElementById("sentenceAverage").innerHTML = "Average Sentence Length: " + finalMeanAmount + " Words";

            // Sentences Less Than 5 Words
            var senAmount = 0;
            for (sen in linesArticle) { 
              if (linesArticle[sen].split("").length <= 10) {
                senAmount++;
              }
              var smallSen = linesArticle.length / senAmount;
              document.getElementById("lessThanAmount").innerHTML = "No. Short Sentences: " + smallSen + "%";
            }

            // Data for the Charts
            var chartData = {
              overviewData:{
                reasonData:numberReasoningMarkers,
                pExpData:numberPExperienceMarkers,
                entityData:numberEntityMarkers,
                verbData:numberVerbMarkers,
                timeData:numberTimeMarkers,
                proData:numberPronounMarkers,
                citData:numberCitationsMarkers,
                codeData:numberCodeMarkers
              },
              active_scores:{
                this_feb: [65, 59, 90, 81, 56, 55, 40],
                last_feb: [28, 48, 40, 19, 96, 27, 100]
              },
              citationTypes:{
                labels:citNames,
                data:citationCount
              },
              goals:{
                labels: ["Pronouns", "Evidence"],
                data: [proAmount,citationsSize]
              },
              reasoningEvidenceCheck:{
                labels: ["Reasoning", "Evidence"],
                data: [reaAmount,citationsSize]
              },
              allElements:{
                labels: ["Reasoning", "Personal Experience", "Named Entities", "Verb Events", "Time Events", "Pronouns", "Citations", "Code"],
                data:[reaAmount,expAmount,entityAmount,verbAmount,timeAmount,proAmount,citAmount,codeAmount]
              }
            }
                
            // Overview Chart
            var ctxL = document.getElementById("overviewChart").getContext('2d');
            var myLineChart = new Chart(ctxL, {
            type: 'line',
            data: {
            labels: sentence,
            datasets: [
            {
              label: "Reasoning",
              data: chartData.overviewData.reasonData,
              backgroundColor: [
              'rgba(231, 43, 29, .2)',
              ],
              borderColor: [
              'rgba(231, 43, 29, .7)',
              ],
              borderWidth: 2
            },
            {
              label: "Personal Experience",
              data: chartData.overviewData.pExpData,
              backgroundColor: [
              'rgba(0, 137, 132, .2)',
              ],
              borderColor: [
              'rgba(0, 137, 132, .7)',
              ],
              borderWidth: 2
            },
            {
              label: "Named Entities",
              data: chartData.overviewData.entityData,
              backgroundColor: [
              'rgba(255, 0, 234, .2)',
              ],
              borderColor: [
              'rgba(255, 0, 234, .7)',
              ],
              borderWidth: 2
              },
            {
              label: "Verb Events",
              data: chartData.overviewData.verbData,
              backgroundColor: [
              'rgba(57, 156, 0, .2)',
              ],
              borderColor: [
              'rgba(57, 156, 0, .7)',
              ],
              borderWidth: 2
            },
            {
              label: "Time Events",
              data: chartData.overviewData.timeData,
              backgroundColor: [
              'rgba(255, 145, 0, .2)',
              ],
              borderColor: [
              'rgba(255, 145, 0, .7)',
              ],
              borderWidth: 2
            },
            {
              label: "Pronouns",
              data: chartData.overviewData.proData,
              backgroundColor: [
              'rgba(172, 175, 0, .2)',
              ],
              borderColor: [
              'rgba(172, 175, 0, .7)',
              ],
              borderWidth: 2
            },
            {
              label: "Citations",
              data: chartData.overviewData.citData,
              backgroundColor: [
              'rgba(99, 0, 180, .2)',
              ],
              borderColor: [
              'rgba(99, 0, 180, .7)',
              ],
              borderWidth: 2
            },
            {
              label: "Code",
              data: chartData.overviewData.codeData,
              backgroundColor: [
              'rgba(0, 255, 179, .2)',
              ],
              borderColor: [
              'rgba(0, 255, 179, .7)',
              ],
              borderWidth: 2
            },
            ] // Datasets Ending
            }, // MyLineChart
            options: {
            responsive: true
            }
            });

            // Chart to List All Elements Vertical Bar Chart
            new Chart(document.getElementById("allElementsBar"), {
            "type": "bar",
            "data": {
            "labels":chartData.allElements.labels,
            "datasets": [{
            "label": ["All Elements"],
            "data": chartData.allElements.data,
            "fill": false,
            "backgroundColor": ["rgba(231, 43, 29, 0.2)", "rgba(0, 137, 132, 0.2)",
            "rgba(255, 0, 234, 0.2)", "rgba(57, 156, 0, 0.2)", "rgba(255, 145, 0, 0.2)",
            "rgba(172, 175, 0, 0.2)", "rgba(99, 0, 180, 0.2)", "rgba(0, 255, 179, 0.2)"
            ],
            "borderColor": ["rgb(231, 43, 29)", "rgb(0, 137, 132)", "rgb(255, 0, 234)",
            "rgb(57, 156, 0)", "rgb(255, 145, 0)", "rgb(172, 175, 0)", "rgb(99, 0, 180)", "rgb(0, 255, 179)"
            ],
            "borderWidth": 1
            }]
            },
            "options": {
            "legend": {
              "display": false
            },
            "scales": {
            "xAxes": [{
            "ticks": {
            "beginAtZero": true
            }
            }]
            }
            }
            });

            // Citations Bar Chart To List Duplicates
            new Chart(document.getElementById("citationsBar"), {
            "type": "horizontalBar",
            "data": {
            "labels": chartData.citationTypes.labels,
            "datasets": [{
            "label": "Citation Uses",
            "data": chartData.citationTypes.data,
            "fill": false,
            "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"
            ],
            "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)",
            "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"
            ],
            "borderWidth": 1
            }]
            },
            "options": {
            "legend": {
              "display": false
            },
            "scales": {
            "xAxes": [{
            "ticks": {
            "beginAtZero": true
            }
            }]
            }
            }
            });

            // Crazy Pie Chart
            

            // Doughnut Chart
            var ctxD = document.getElementById("doughnutChart").getContext('2d');
            var myLineChart = new Chart(ctxD, {
            type: 'doughnut',
            data: {
              labels: chartData.goals.labels,
              datasets: [{
                data: chartData.goals.data,
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                }]
            },
            options: {
            responsive: true
            }
            });

            // Pie Chart
            var ctxP = document.getElementById("pieChart").getContext('2d');
            var myPieChart = new Chart(ctxP, {
            plugins: [ChartDataLabels],
            type: 'pie',
            data: {
              labels: chartData.reasoningEvidenceCheck.labels,
              datasets: [{
                data: chartData.reasoningEvidenceCheck.data,
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                }]
              },
            options: {
            responsive: true,
            legend: {
            position: 'right',
            labels: {
            padding: 20,
            boxWidth: 10
            }
            },
            plugins: {
            datalabels: {
            formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map(data => {
            sum += data;
            });
            let percentage = (value * 100 / sum).toFixed(2) + "%";
            return percentage;
            },
            color: 'white',
            labels: {
            title: {
            font: {
            size: '16'
            }
            }
          }
        }
      }
    }
  });
 });

       