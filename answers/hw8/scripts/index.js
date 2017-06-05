import {getLocaleString} from './utils';
import Constants from './constants';
var $ = require("jquery");

(function(){
  var currentLang = "zh-tw";
  var getLiveStreams = function() {
    var apiURL = "https://api.twitch.tv/kraken/streams/";
    var client_id = "oskt3sz9kwmv66y219diqklrvulipi";
    var game = "League of Legends";
    var offset = $(".list > li").length - 1;
    $.ajax({
      method: "GET",
      url: apiURL,
      data: {
        client_id: client_id,
        game: game,
        limit: 20,
        offset: offset,
        language: currentLang
      }
    }).done(function( data ) {
      $("body").removeClass("loading");
      var list = data.streams;
      var template = $(".list > li:eq(0)");
      $.each( list, function( key, value ) {
        $(".list").append(template.clone());
        var thisItem = $(".list > li:last");
        thisItem.find("a").attr("href", value.channel.url);
        thisItem.find(".screenshot > img").hide().attr("src", value.preview.medium).on("load", function(){
          $(this).fadeIn(300);
        });
        thisItem.find(".avatar > img").hide().attr("src", value.channel.logo).on("load", function(){
          $(this).fadeIn(300);
        });
        thisItem.find("h2").text(value.channel.status);
        thisItem.find("h3").text(value.channel.display_name);
        thisItem.show();
      });
      $(".list > li:eq(0)").hide();
    });
  }

  getLiveStreams();

  var timer;
  $(window).scroll(function() {
    if(timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(function() {
      if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        getLiveStreams();
      }
    }, 100);
  });

  $("ul.lang-list a").on("click", function(e){
    e.preventDefault();
    currentLang = $(this).data("lang");
    $("ul.lang-list a").removeClass("active");
    $(this).addClass("active");
    $("h1.title").text(getLocaleString(Constants.LOCALE_ID.TITLE, currentLang));
    $(".list > li:not(:eq(0))").remove();
    getLiveStreams();
  });
})();