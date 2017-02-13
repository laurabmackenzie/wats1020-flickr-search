// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){

  function searchImages(tags) {
  //calling flicker API
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON( flickerAPI, {
    tags: tags,
    tagmode: "any",
    format: "json"
  })
  //getting images based on search criteria and dispaying in grid with extra information.
    .done(function( data ) {
      $('#images').empty();
      $('h1.search-title').html(tags + " images....");
      $.each( data.items, function( i, item ) {
        var newItem = $('<div class="col-sm-6 col-md-4">');
        var thumbnail = $('<div class="thumbnail">').appendTo(newItem);
        var link = $('<a>').attr("href", item.link).appendTo(thumbnail);
        $( "<img>" ).attr( "src", item.media.m ).appendTo(link);
        $('<div class="author">').html(item.author).appendTo(thumbnail);
        $('<div class="caption">').html(item.title).appendTo(thumbnail);
        $('<div class="label">').html(item.label).appendTo(thumbnail);
        $('<div class="date">').html(item.date_taken).appendTo(thumbnail);

        
        newItem.appendTo( "#images" );   

        //limiting number of photos
        if ( i === 11 ) {
          return false;
        }
      });
    });
  }
  
  
  //button event handler reads user input and calls searchImage function
  $('button.search').on('click', function(event) {
    event.preventDefault();
    var searchInfo = $(".navbar-form").find('input[name="searchText"]')[0];
    searchImages(searchInfo.value);
   });               
                
});
