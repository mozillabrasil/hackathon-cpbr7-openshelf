/*var openlibrary = function (){
    var url_book = "http://openlibrary.org/search.json?title=";

    var _book = function (search_term, pCallback, pCallbackError){

      var url = url_book + search_term;
      var xhr = new XMLHttpRequest({mozSystem: true});
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function() {
          if (xhr.responseText) {
              var jsonReturned = JSON.parse(xhr.responseText);
              var result = jsonReturned["docs"]["title_suggest"]
              console.log(result);
              pCallback(result);
          }
      };
      xhr.send();

  };

    return {book:_book};

}();

function space_replace(search_term){

    var correct_search_term = search_term.split(" ").join("+");
    console.log("subs " + correct_search_term);
    return correct_search_term;
  }

function search(search_term){
  openlibrary.book(search_term, function (data)
  {
    console.log("retorno 1: ");
  }, function (data){});
}

window.onload = function(){
  // tryLogin(token);
  //setInterval(search, 2000, );
  search(space_replace("lord of rings"));
}
*/

//url: "openlibrary.org/search.json?&title=lord+of+rings",
