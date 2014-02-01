$(document).ready(function(){

var search_parameter = 0;
var timeout = 1500;
var search_term;
var url_book = "https://www.googleapis.com/books/v1/volumes?q=";
var url_author = "https://www.googleapis.com/books/v1/volumes?q=author:";
var url_subject = "https://www.googleapis.com/books/v1/volumes?q=subject:";
var url_book_detail = "https://www.googleapis.com/books/v1/volumes/";

$("#progress_search").hide();
	//open info
	$("#btn-info").click(function(){
		$("#info").addClass("current");
		$("[data-position='current']").addClass("ĺeft");
	});

	//returns to home
	$("#btn-info-back").click(function(){
		$("#info").addClass("right");
		$("[data-position='current']").addClass("current");
	});

	//open details
	$("#btn-details").click(function(){
		$("#details").addClass("current");
		$("[data-position='current']").addClass("ĺeft");
	});

	//returns to home
	$("#btn-details-back").click(function(){
		$("#details").addClass("right");
		$("[data-position='current']").addClass("current");
	});

	$("").prop("");

	$("#book_tab").click(function(){
		search_parameter = 0;
		$("#search").attr("placeholder", "Search by Book...");
		$("#search").val("");
		$(".books").html("");


	});

	$("#author_tab").click(function(){
		search_parameter = 1;
		$("#search").attr("placeholder", "Search by Author...");
		$("#search").val("");
		$(".books").html("");


	});

	$("#subject_tab").click(function(){
		search_parameter = 2;
		$("#search").attr("placeholder", "Search by Subject...");
		$("#search").val("");
		$(".books").html("");

	});

	$("#search").keypress(function(){

		if(($(this).val().length > 3) && ($(this).val() != search_term)){

			console.log("length " + $(this).val().length);
			console.log("this " + $(this).val());
			console.log("search_term " + search_term);

			search_term = $(this).val();
			
		    setTimeout(search, 3000, search_term, search_parameter);

		}else{
			if($(this).val().length == 0){
				$(".books").html("");
				$(this).val("");
			}
		}

	});

	function search(search_term, search_parameter){

		$("#progress_search").show();
		$(".books").hide();

		console.log("termo " + search_term + " parametro " + search_parameter);
		var correct_search_term = space_replace(search_term);
	    var url;
	      switch(search_parameter){
	      		case 0:
	      			url = url_book + correct_search_term;
	      			break;
	      		case 1:
	      			url = url_author + correct_search_term;
	      			break;
	      		case 2:
	      			url = url_subject + correct_search_term;
	      			break;	
	      }

		    var xhr = new XMLHttpRequest({mozSystem: true}); //define que a conexão será feita com XMLHttpRequest, usando XHR para funcionar no Firefox OS
		    xhr.open("GET", url, true); // abre a conexão
		    //método responsável por escutar o status da conexão e retornar as informações do Webservice acessado
		    xhr.onreadystatechange = function(response) {
		        

			    var all_books = "";

			    if(response.items == undefined){
			   		$(".books").html("Not found");	
			    }else{

			    	for (var i = 0; i < response.items.length; i++) {

				        var item = response.items[i];
				        var small_thumbnail = "";
				        if(item.volumeInfo.imageLinks.smallThumbnail != undefined){
				        	small_thumbnail = item.volumeInfo.imageLinks.smallThumbnail;
				        }

				        console.log("id " + item.id);

				        var book_html = "<li id='btn-details' id_book='" + item.id + "'><aside class='pack-end'>";
		                book_html += "<img id='#book_small_thumbnail' src='" + small_thumbnail + "'>";
		                book_html += "</aside><a href='#'>";
		                book_html += "<p id='#book_title'><b>" + item.volumeInfo.title +"</b></p>";
		                book_html += "<p id='#book_author'>" + item.volumeInfo.authors +"</p></a></li>";

				        all_books += book_html;
				        
				    }
			    }

			    //$(".books").html(all_books);
			    document.getElementById('books').innerHTML= all_books;


		    };
		    //dispara a conexão
		    xhr.send();

	      /*$.getJSON(url, function (response) {

			    var all_books = "";

			    if(response.items == undefined){
			   		$(".books").html("Not found");	
			    }else{

			    	for (var i = 0; i < response.items.length; i++) {

				        var item = response.items[i];
				        var small_thumbnail = "";
				        if(item.volumeInfo.imageLinks.smallThumbnail != undefined){
				        	small_thumbnail = item.volumeInfo.imageLinks.smallThumbnail;
				        }

				        //console.log("id " + item.id);

				        var book_html = "<li id='btn-details' id_book='" + item.id + "'><aside class='pack-end'>";
		                book_html += "<img id='#book_small_thumbnail' src='" + small_thumbnail + "'>";
		                book_html += "</aside><a href='#'>";
		                book_html += "<p id='#book_title'><b>" + item.volumeInfo.title +"</b></p>";
		                book_html += "<p id='#book_author'>" + item.volumeInfo.authors +"</p></a></li>";

				        all_books += book_html;
				        
				    }
			    }

			    //$(".books").html(all_books);
			    document.getElementById('books').innerHTML= all_books;
			});*/

		$("#progress_search").hide();
		$(".books").show();
	}

	function space_replace(search_term){

		var correct_search_term = search_term.split(" ").join("+");
		return correct_search_term;
	}

	function bCallback(data){

	}

	  //Notificacao
  function notificarUsuario(mensagem) {

    if ("Notification" in window) {
                // Firefox OS 1.1 and higher
                if (Notification.permission !== 'denied') {
                    Notification.requestPermission(function (permission) {
                        if(!('permission' in Notification)) {
                            Notification.permission = permission;
                        }
                    });
                }

                if (Notification.permission === "granted") {
                    var notification = new Notification("OpenShelf: ", {
                        body : mensagem
                    });    
                }
            } 
            else {
                // Firefox OS 1.0
                var notification = navigator.mozNotification.createNotification(
                    "OpenShelf: ",
                    mensagem
                );
                notification.show();
            }
  }

  function book_details(id){

  		var url = url_book_detail + id;
  		console.log(url);

  		$.getJSON(url, function (response) {

  				console.log("response" + response.items);
			    if(response.items == undefined){
			   		$("#details_div").hide();
			   		$("#message").val("Fail");	
			    }else{

				        if(item.volumeInfo.imageLinks.smallThumbnail != undefined){
				        	$("#thumbnail").attr("src", item.imageLinks.thumbnail);	
				        }else{
							$("#thumbnail").attr("src", "");	
				        }


				        $("#title").text(item.volumeInfo.title);
				        $("#subtitle").text(item.volumeInfo.subtitle);
				        $("#authors").text(item.volumeInfo.authors);
				        $("#description").text(item.volumeInfo.description);
				        $("#publisher").text(item.volumeInfo.publisher);
				        $("#publisher_date").text(item.volumeInfo.publisher_date);
				        $("#type").text(item.type);
				        $("#pageCount").text(item.pageCount);
				        $("#categorie").text(item.categories);
				        $("#average_rating").text(item.averageRating);
				        
				        if(item.pdf.isAvaliable == true){
				        	$("#pdf").attr("href", item.pdf.webReaderLink);	
				        }else{
				        	$("#pdf").text("PDF unavaliable");
				        }

				        var book_html = "<li id='btn-details' id_book='" + item.id + "'><aside class='pack-end'>";
		                book_html += "<img id='#book_small_thumbnail' src='" + small_thumbnail + "'>";
		                book_html += "</aside><a href='#'>";
		                book_html += "<p id='#book_title'><b>" + item.volumeInfo.title +"</b></p>";
		                book_html += "<p id='#book_author'>" + item.volumeInfo.authors +"</p></a></li>";

			    }

			});

  }

  //book_details("NydozxJmQ1cC");

});
