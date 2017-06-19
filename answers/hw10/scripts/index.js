import { getLocaleString } from './utils';

import Constants from './constants';

const $ = require('jquery');

(function () {
  let currentLang = 'zh-tw';
  const getLiveStreams = function () {
    const apiURL = 'https://api.twitch.tv/kraken/streams/';
    const clientId = 'oskt3sz9kwmv66y219diqklrvulipi';
    const game = 'League of Legends';
    const offset = $('.list > li').length - 1;
    $.ajax({
      method: 'GET',
      url: apiURL,
      data: {
        client_id: clientId,
        game,
        limit: 20,
        offset,
        language: currentLang,
      },
    }).done((data) => {
      $('body').removeClass('loading');
      const list = data.streams;
      const template = $('.list > li:eq(0)');
      $.each(list, (key, value) => {
        $('.list').append(template.clone());
        const thisItem = $('.list > li:last');
        thisItem.find('a').attr('href', value.channel.url);
        thisItem.find('.screenshot > img').hide().attr('src', value.preview.medium).on('load', function () {
          $(this).fadeIn(300);
        });
        thisItem.find('.avatar > img').hide().attr('src', value.channel.logo).on('load', function () {
          $(this).fadeIn(300);
        });
        thisItem.find('h2').text(value.channel.status);
        thisItem.find('h3').text(value.channel.display_name);
        thisItem.show();
      });
      $('.list > li:eq(0)').hide();
    });
  };

  getLiveStreams();

  let timer;
  $(window).scroll(() => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        getLiveStreams();
      }
    }, 100);
  });

  $('ul.lang-list a').on('click', function (e) {
    e.preventDefault();
    currentLang = $(this).data('lang');
    $('ul.lang-list a').removeClass('active');
    $(this).addClass('active');
    $('h1.title').text(getLocaleString(Constants.LOCALE_ID.TITLE, currentLang));
    $('.list > li:not(:eq(0))').remove();
    getLiveStreams();
  });
}());
