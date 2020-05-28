"use strict";

function getArticleName() {
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var all = data[0].extracted_article.extracted_article.html;
      var firstSplit = all.split("<title>");
      var secondSplit = firstSplit[1].split("</title>");
      var title = secondSplit[0];
      document.getElementById("artName").innerHTML = "Article Name: " + title;
    });
}

function topTitle() {
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var all = data[0].extracted_article.extracted_article.html;
      var firstSplit = all.split("<title>");
      var secondSplit = firstSplit[1].split("</title>");
      var title = secondSplit[0];
      document.getElementById("top").innerHTML = title;
    });
}

function getTitleName() {
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var all = data[0].extracted_article.extracted_article.html;
      var firstSplit = all.split("<title>");
      var secondSplit = firstSplit[1].split("</title>");
      var title = secondSplit[0];
      document.getElementById("hi").innerHTML = title;
    });
}

function getArticleUrl() {
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var url = data[0].url;
      document.getElementById("articleURL").innerHTML = "Article URL:  " + url;
    });
}

function getMimeType() {
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var mime =
        data[0].extracted_article.extracted_article.pattern_extraction
          .mime_type;
      document.getElementById("mimeType").innerHTML = "Mime Type:  " + mime;
    });
}

function getCredibilityRating() {
  // fetch("./language_wars.json")
  //   .then(function (resp) {
  //     return resp.json();
  //   })
  //   .then(function (data) {
  //     var mime =
  //       data[0].extracted_article.extracted_article.pattern_extraction
  //         .mime_type;
  //     document.getElementById("mimeType").innerHTML = "Mime Type:  " + mime;
  //   });
}

function getWholeArticle() {
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var article =
        data[0].extracted_article.extracted_article.pattern_extraction
          .extracted_html;
      document.getElementById("articleInfo").innerHTML = article;
    });
}

function getReasoning() {
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var article =
        data[0].keyword_analysis.keyword_analysis;
      document.getElementById("reasonInfo").innerHTML = article;
    });
}

function getEvidence() {
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var article =
        data[0].citations_analysis.citations_analysis.classified_citation_binary_counts;
      document.getElementById("evidenceInfo").innerHTML = article;
    });
}

function getCitations() {
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var article =
        data[0].citations_analysis.citations_analysis.external_uris;
      // var firstSplit = article.split("://");
      // var secondSplit = firstSplit[1].split(",");
      // var title = secondSplit[0];
      document.getElementById("citationInfo").innerHTML = article;
    });
}

function highlightReasoning() {
  if (document.getElementById("reCheck").checked) {
    fetch("./language_wars.json")
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        var article =
          data[0].keyword_analysis.keyword_analysis.reasoning_86;

        var instance = new Mark(document.getElementById("articleInfo"));



        // instance.mark(article[0].marker)
        var i;
        for (i = 0; i < article.length; i++) {
          instance.mark([article[i].marker], {
            accuracy: "exactly",
            separateWordSearch: false,
          });
        }
      });
  }
  if (document.getElementById("reCheck").checked == false) {
    var instance = new Mark(document.getElementById("articleInfo"));
    instance.unmark();
  }
}





