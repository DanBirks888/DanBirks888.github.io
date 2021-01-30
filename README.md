# Visualisation Tool
This Visualisation Tool was my masters project at Manchester Met University




### Purpose

Assessing the credibility of Grey Literature is subjective. In order to assist in this process, this prototype tool manipulates a JSON file and visualises the data for users to make more informed judgements on the content of the text.

### Technology Used
* JavaScript
* HTML & CSS

### Libraries Used
* Bootstrap - https://getbootstrap.com/
* Chart.js - https://www.chartjs.org/
*Mark.js - https://markjs.io/

### Accessing the JSON File

The Json file would be accessed locally using the fetch API.
The project did not progress far enough in the time allocated to instead extract json through an API database.

```javascript
function highlightReasoning() {
        fetch("./language_wars.json")
            .then(function (resp) {
                return resp.json();
            })
            .then(function (data) {
            var article = new Mark(document.getElementById("articleInfo"));
                var reasoning =
                        data[0].keyword_analysis.keyword_analysis.reasoning_86;
```

### Highlighting Tool
In order to highlight using Mark.js, 

```javascript
                var options = { className: "red", }
                if (document.getElementById("reCheck").checked) {
                    for (a in reasoning) {
                        var reason = reasoning[a].marker;
                        var regex_reason = new RegExp('(\\ |\\“|\\-)' + reason + '(\\ |\\,|\\.|\\!|\\?|\\:|\\;|\\“)', "gmi");
                        article.markRegExp(regex_reason, options);
                    }
                } 
                else {
                    article.unmark(options);
```

### Export XML
Example method of the export algorithm which would extract citations from the JSON file. This would remove all HTML elements from the data and wrap custom elements of the users choice in XML for exporting and further manipulation to the users desire.

#### Removing Duplicates using Iterable Stream

```javascript
    var citations = data[0].citations_analysis.citations_analysis.classified_external_uris;
                  const newCitations = Array.from(new Set(citations.map(a => a.domain)))
                  .map(domain => {
                  return citations.find(a => a.domain === domain)})

```
#### Algorithm for filtering through Citations and their sources, and wrapping elements in XML

```javascript
          
            for (g in newCitations) {
                var domain = newCitations[g].domain;
                var regex_cit = new RegExp(domain + ".+?(?= )", "gmi");
                var clif = newCitations[g].classifications;
                var citList = "'[";
                for (cl in clif) {
                    var cite = clif[cl][0] + ", ";
                    citList += cite;
                    var splicedCit = citList.slice(" ",-2);
                }
                citList = "";
                var xml_cit = "<evidence type='citation' sub-type='external' classification=" + splicedCit + "]'>" + domain + "</evidence>";
                output = output.replace(regex_cit,xml_cit);
            }
        }

```

### Optimisations

* The project required a new fetch function to access the same JSON file via. With more time allocated, intergrating a framework like vue.js could have removed the reptition.
* The JSON file is local and was eventually intended to scale and itnegrate with a database and API so the user could select their own blog posts for assessing by the Visualisation Tool.
