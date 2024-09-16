let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let searchResultsEl = document.getElementById("searchResults");

function createAndAppendSearchResults(result) {
    spinnerEl.classList.add("d-none");
    let {
        link,
        description,
        title
    } = result;
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResultsEl.appendChild(resultItem);

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItem.appendChild(titleEl);

    let brEl = document.createElement("br");
    resultItem.appendChild(brEl);

    let linkEl = document.createElement("a");
    linkEl.classList.add("result-url");
    linkEl.href = link;
    linkEl.target = "_blank";
    linkEl.textContent = link;
    resultItem.appendChild(linkEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItem.appendChild(descriptionEl);



}

function displayresults(searchResults) {

    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let options = {
            method: "GET",
        }
        let urlEl = "https://apis.ccbp.in/wiki-search?search=" + searchInputEl.value;
        fetch(urlEl, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayresults(search_results)
            })
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);