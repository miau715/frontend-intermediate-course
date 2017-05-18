(function(){
  var getLiveStreams = function() {
    var apiURL = "https://api.twitch.tv/kraken/streams/";
    var client_id = "oskt3sz9kwmv66y219diqklrvulipi";
    var game = "League of Legends";
    var offset = document.querySelectorAll(".list > li").length - 1;
    var requestData = "?client_id="+client_id+"&game="+game+"&limit=20&offset="+offset;
    var request = new XMLHttpRequest();
    request.open("GET", apiURL+requestData, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        if (document.querySelector("body").classList) {
          document.querySelector("body").classList.remove("loading");
        }
        else {
          document.querySelector("body").className = document.querySelector("body").className.replace(new RegExp('(^|\\b)' + "loading".split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
        var data = JSON.parse(request.responseText);
        var list = data.streams;
        var template = document.querySelector(".list > li");
        for(var key in list) {
          var value = list[key];
          document.querySelector(".list").appendChild(template.cloneNode(true));
          var thisItem = document.querySelector(".list").lastChild;
          thisItem.querySelector("a").setAttribute("href", value.channel.url);
          thisItem.querySelector(".screenshot > img").style.opacity = 0;
          thisItem.querySelector(".screenshot > img").setAttribute("src", value.preview.medium);
          thisItem.querySelector(".screenshot > img").onload = function(){
            this.style.opacity = 1;
          };
          thisItem.querySelector(".avatar > img").style.opacity = 0;
          if (value.channel.logo) {
            thisItem.querySelector(".avatar > img").setAttribute("src", value.channel.logo);
            thisItem.querySelector(".avatar > img").onload = function(){
              this.style.opacity = 1;
            };
          }
          thisItem.querySelector("h2").textContent = value.channel.status;
          thisItem.querySelector("h3").textContent = value.channel.display_name;
          thisItem.style.display = "block";
        }
        document.querySelector(".list > li").style.display = "none";

      }
      else {
        console.log("error");
      }
    };
    request.send();
  }

  getLiveStreams();

  var timer;
  window.onscroll = function() {
    if(timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(function() {
      var windowScrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      if (windowScrollTop + window.innerHeight > document.body.scrollHeight - 100) {
        getLiveStreams();
      }
    }, 100);
  };
})();