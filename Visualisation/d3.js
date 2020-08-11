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

//                 const dummy = [
//                     {id: 'd1', value: 10, region: 'USA' },
//                     {id: 'd2', value: 1, region: 'India' },
//                     {id: 'd3', value: 3, region: 'China' },
//                     {id: 'd4', value: 6, region: 'Germany' },
//                 ]


//             const xScale = d3.scaleBand().rangeRound([0, 250]).padding(0.1);
//             const yScale = d3.scaleLinear().domain([0,15]);

//             const container = d3.select('svg').classed('container', true)
//             .style('border', '1px solid red');

//             const bars = container
//             .selectAll('.bar')
//             .data(dummy)
//             .enter()
//             .append('rect')
//             .classed('bar', true)
//             .attr('width', 50)
//             .attr('height', data => (data.value * 15));


//             // d3.select('#reasonInfo')
//             // .selectAll('p')
//             // .data([1,2,3])
//             // .enter()
//             // .append('p')
//             // .text(dta => dta);
//         });

