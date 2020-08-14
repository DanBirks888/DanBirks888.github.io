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


            // None Duplicated Citations Count  
            const citations = Array.from(new Set(oldCitations.map(a => a.domain)))
            .map(domain => {
            return oldCitations.find(a => a.domain === domain)
            });
            // Citations Count
            var citationsSize = citations.length;

            // Reasoning Count
            var reaAmount = 0;
            for (reCount in reasoning) {
              reaAmount += reasoning[reCount].ngrams_count;
            }
            // Claim Count
            var claimAmount = 0;
            for (claimCount in pronouns) {
              claimAmount ++;
            }

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
            // console.log(wholeArticle);
            // Divide Article into Array of Lines
            // var regexArticle = new RegExp(wholeArticle);
            // var result = [];
            // result = Regex.Split(regexArticle, "\r\n|\r|\n");
            // console.log(result);

            // Pie Chart Evidence Count

            // Data for the Charts
            var chartData = {
              steps:{
                this_feb: [8784, 9000, 9767, 3745, 9873, 9872, 7868, 12872, 8772, 9873, 10928, 7684, 9874, 3432, 9798, 20877, 8098, 9882, 7080, 9887, 11072, 9018, 7897, 11203, 10928, 10928, 8734, 8021, 13423],
                last_feb: [10845, 9876, 3252, 11045, 9432, 9453, 9999, 10845, 5869, 7898, 9342, 9222, 10001, 11789, 8989, 9999, 8989, 10222, 7777, 12300, 10111, 8798, 7087, 6769, 9808, 8985, 4584, 9999]
              },
              active_scores:{
                this_feb: [65, 59, 90, 81, 56, 55, 40],
                last_feb: [28, 48, 40, 19, 96, 27, 100]
              },
              friend_progress:{
                friends: ["Me", "Megan", "Euan", "Manuel", "Kate", "Hannah", "Josh"],
                scores: [1023, 1000,1198,200,678,432,878]
              },
              goals:{
                labels: ["Goals met", "Running", "Swimming", "Walking", "Drinking/Nutrition"],
                data: [300, 50, 100, 40, 120]
              },
              reasoningEvidenceCheck:{
                labels: ["Claims", "Evidence"],
                data: [claimCount,citationsSize]
              }
            }
                
            var ctxL = document.getElementById("reasoningChart").getContext('2d');
            var myLineChart = new Chart(ctxL, {
            type: 'line',
            data: {
            labels: ["01/02", "02/02", "03/02", "04/02", "05/02", "06/02", "07/02", "08/02", "09/02", "10/02", "11/02", "12/02", "13/02", "14/02", "15/02", "16/02", "17/02", "18/02", "19/02", "20/02", "21/02", "22/02", "23/02", "24/02", "25/02", "26/02", "27/02", "28/02", "29/02"],
            datasets: [{
            label: "February 2019",
            data: chartData.steps.last_feb,
            backgroundColor: [
            'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
            'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
            },
            {
            label: "February 2020",
            data: chartData.steps.this_feb,
            backgroundColor: [
            'rgba(0, 137, 132, .2)',
            ],
            borderColor: [
            'rgba(0, 10, 130, .7)',
            ],
            borderWidth: 2
            }
            ]
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

       