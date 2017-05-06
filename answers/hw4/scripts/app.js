(function(){
  $.ajax({
    method: "GET",
    url: "https://api.twitch.tv/kraken/streams/",
    data: { client_id: "oskt3sz9kwmv66y219diqklrvulipi", game: "League of Legends", limit: 20 }
  }).done(function( data ) {
    $("body").removeClass("loading");
    var list = data.streams;
    var template = $(".list > li:eq(0)");
    $.each( list, function( key, value ) {
      $(".list").append(template.clone().hide());
      var thisItem = $(".list > li").eq(key+1);
      thisItem.find("a").attr("href", value.channel.url);
      thisItem.find(".screenshot > img").attr("src", value.preview.medium);
      thisItem.find(".avatar > img").attr("src", value.channel.logo);
      thisItem.find("h2").text(value.channel.status);
      thisItem.find("h3").text(value.channel.display_name);
    });
    $(".list > li:eq(0)").remove();
    $(".list > li").fadeIn(500);
  });
})();