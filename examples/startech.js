var scrappyDo = require('../lib/scrappy-do')
  , fs = require('fs');

var scrappy = scrappyDo.create({
    base: 'www.startechconf.com'
});
  
/* Set up the jobs, will be execute secuencially */
scrappy.get('/', function(data, $) {

  data.slogan = $('h2').html();
  data.title = $('h1').html();
  data.when = $('p.date').html();
  data.counter = $('p.numbers').html();

  //keynoters
  data.speakers = [];
  $('.allkeynoters').children().each(function(idx, el) { 
    var tmp = el.children; 
    data.speakers.push({
      name:    tmp[1].innerHTML,
      twitter: tmp[2].innerHTML.split('@')[1],
      image:   tmp[0].children[0].src, 
      desc:    tmp[3].innerHTML
    });
  });

  //prices
  data.prices = [];
  $('.price-numbers').each(function(idx, el) {
    data.prices.push({type: this.children[1].innerHTML, price: this.children[0].innerHTML});
  });

  //sponsors
  data.sponsors = [];
  $('.grupo-sponsors > div > * > * > * > * a').children().each(function(idx, el) {
    data.sponsors.push({name: el.parentNode.title, link: el.parentNode.href, image: data.base + '/' + el.src});
  });

  //twitter link
  data.twitter = $('.twitter_followus > a')[0].href;

});

scrappy.on('end', function(data) {
	
  Object.keys(data).forEach(function(k) {
    fs.writeFile('data/'+k+'.json', JSON.stringify(data[k]), function(err) {
      if (err) console.log(err.message);
    });
  });

});

scrappy.do();
