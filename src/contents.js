(function($, undefined) {
  var providers = {
    'bttiantang': function(body){
      var t = $('.moviedteail', body).text();
      var m = t.match(/imdb.+?tt\s*(\d+)?/i);
      return m ? 'tt' + m[1] : null;
    },
    'mp4ba': function(body){
      var t = $('.main', body).text();
      var m = t.match(/imdb.+?tt\s*(\d+)?/i);
      return m ? 'tt' + m[1] : null;
    }
  };

  function imdbIdMatcher(host){
    if(/bttiantang\.com$/.test(host)){
      return providers['bttiantang'];
    }
    if(/mp4ba\.com$/.test(host)){
      return providers['mp4ba'];
    }
    return function(){ return null; }
  }

  function parseData(data){
    return {
      rating: data.imdbRating,
      count: data.imdbVotes,
      title: data.Title
    };
  }

  function queryInfo(id){
    console.log('query IMDb Info by id:', id);
    if(!id || !/tt\d+/.test(id)){
      return;
    }

    $.ajax({
      type: 'GET',
      url: '//www.omdbapi.com/?i='+ id,
      dataType: 'json',
      success: function(data){
        chrome.runtime.sendMessage(parseData(data));
      },
      error: console.log.bind(console)
    });
  }

  $(function(){
    var id = imdbIdMatcher(window.location.host)(document.body);
    queryInfo(id);
  });

}(window.jQuery));
