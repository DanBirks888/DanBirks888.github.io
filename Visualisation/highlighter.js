// function highlightReasoning() {
//     if (document.getElementById("reCheck").checked) {
//         fetch("./language_wars.json")
//             .then(function (resp) {
//                 return resp.json();
//             })
//             .then(function (data) {
//                 var article =
//                     data[0].keyword_analysis.keyword_analysis.reasoning_86;

//                 var instance = new Mark(document.getElementById("articleInfo"));



//                 // instance.mark(article[0].marker)
//                 var i;
//                 for (i = 0; i < article.length; i++) {
//                     instance.mark([article[i].marker], {
//                         accuracy: "exactly",
//                         separateWordSearch: false,
//                     });
//                 }
//             });
//     }
//     if (document.getElementById("reCheck").checked == false) {
//         var instance = new Mark(document.getElementById("articleInfo"));
//         instance.unmark();
//     }
// }

