var scrappyDo = require('../lib/scrappy-do');

var scrappy = scrappyDo.create({
    base: 'www.startechconf.com'
});
  
/* Set up the jobs, will be execute secuencially */
scrappy.get('/', 'body', function(res, data, $) {

  data.slogan = $('h2').html();
  data.title = $('h1').html();
  data.when = $('p.date').html();
  data.counter = $('p.numbers').html();

  //menu
  var menus = res.children('.#menu > * a').map(function(el) {
  	return {link: el.href, name: el.innerHTML};
  });

  //keynoters
  data.keynoters = [];
  $('.allkeynoters').children().each(function(idx, el) { 
    var tmp = el.children; 
    data.keynoters.push({name: tmp[1].innerHTML, image: tmp[0].children[0].src, desc: tmp[2].innerHTML});
  });

  //prices
  data.prices = [];
  $('.price-numbers').each(function(idx, el) {
    data.prices.push({type: this.children[1].innerHTML, price: this.children[0].innerHTML});
  });

  //sponsors
  data.sponsors = [];
  $('.grupo-sponsors > * a').each(function(idx, el) {
    data.sponsors.push({name: el.title, link: el.href});
  });

  //twitter link
  data.twitter = $('.twitter_followus > a')[0].href;

});

scrappy.on('end', function(data) {
	console.log(data);
});

scrappy.do();
