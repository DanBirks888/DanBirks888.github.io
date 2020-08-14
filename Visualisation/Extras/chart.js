// fetch("./language_wars.json")
//         .then(function (resp) {
//             return resp.json();
//         })
//         .then(function (data) {
//             var writing_score =
//                 data[0].clarity_of_writing_analysis.clarity_of_writing_analysis.readability.flesch_reading_ease;
//             var reasoning =
//                 data[0].keyword_analysis.keyword_analysis.reasoning_86;
//             var personal_experience =
//                 data[0].keyword_analysis.keyword_analysis.experience_9;
//             var named_entites =
//                 data[0].named_entity_analysis.named_entity_analysis.nltk_named_entities;
//             var verb_events =
//                 data[0].event_analysis.event_analysis.verb_events;
//             var timex_events =
//                 data[0].event_analysis.event_analysis.timex_events;
//             var pronouns =
//                 data[0].named_entity_analysis.named_entity_analysis.pronouns;

//             var store = [];
//             for (rWord in reasoning) {
//                 var r = "'" + reasoning[rWord].marker + "', ";
//                 store[rWord] = r;
//             }
//             console.log(store);
//             var tuple = [];
//             for (tWord in reasoning) {
//                 var r = reasoning[tWord].ngrams_count;
//                 tuple[tWord] = r;
//             }
//             console.log(tuple);

//            let myChart = document.getElementById('reasoningChart').getContext('2d');
//            let chartGeneric = new Chart(myChart, {
//                type:'bar',
//                data:{
//                    labels:store,
//                    datasets:[{
//                        label:'Reasoning in Article',
//                        data:tuple,
//                    }]
//                },
//                options:{
                   
//                    color:['red',
//                    'red',
//                    'red',
//                    'red',
//                    'red',
//                    'red',
//                    'red',
//                    'red',
//                    'red' ]
//                }
//            });
//            console.log(store);
//         });

