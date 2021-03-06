var scrappyDo = require('../lib/scrappy-do')
  , fs = require('fs');

var scrappy = scrappyDo.create({
    base: 'www.startechconf.com'
});
  
scrappy.get('/', function(data, $) {

  

  data.main = [{
    slogan : $('h2').html(),
    when : $('p.when').html().split('/')[0],
    where : $('p.where').html().split('<')[0].trim(),
    counter : $('p.numbers').html(),
    twitter : 'startechconf',
    desc: $('#resume').children(0).children(0)[2].innerHTML,
    prices: []
  }];

  //keynoters
  data.speakers = [];
  $('.allkeynoters').children().each(function(idx, el) { 
    var tmp = el.children; 
    data.speakers.push({
      name:    tmp[1].innerHTML,
      twitter: tmp[2].innerHTML.split('@')[1].split('<')[0],
      image:   'http://' + data.base + '/' + tmp[0].src, 
      desc:    tmp[3].innerHTML
    });
  });

  //prices
  $('.price-numbers').each(function(idx, el) {
    data.main[0].prices.push({type: this.children[1].innerHTML, price: this.children[0].innerHTML});
  });

  //sponsors
  data.sponsors = [];
  $('.grupo-sponsors > div > * > * > * > * a').children().each(function(idx, el) {
    data.sponsors.push({name: el.parentNode.title, link: el.parentNode.href, image: 'http://' + data.base + '/' + el.src});
  });

});

scrappy.on('end', function(data) {
	
  Object.keys(data).forEach(function(k) {
    fs.writeFile('data/'+k+'.json', JSON.stringify(data[k]), function(err) {
      if (err) console.log(err.message);
    });
  });

});

scrappy.do();
