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
  fetch("./language_wars.json")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      var score =
        data[0].clarity_of_writing_analysis.clarity_of_writing_analysis.readability.flesch_reading_ease;
      document.getElementById("credRating").innerHTML = "Credibility Rating:  " + score;
    });
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
