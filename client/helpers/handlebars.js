Handlebars.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});
Handlebars.registerHelper('removeImgTag', function(text) {
	
	if(text.indexOf("<img") > 0) {
		return text.split('<')[0];
	}
	});