 // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);
	

if (Posts.find().count() == 0) {
  Posts.remove({});

  console.log('Found more than 1 post');
  var parser = Meteor.require('feedparser');
  var request = Npm.require('request');
//  var parser = XML2js.parseString({explicitArray: true});
  
  //var xml = "<root>Hello xml2js!</root>"
  
    	var feed = request('http://feeds.cnevids.com/mrss/wired.xml');
  var repos = Meteor.sync(function(done) {
	  feed.pipe( (new parser()
	  .on('error', function(error) {
    // always handle errors
    console.log(error);
  })
  .on('meta', function (meta) {
    // do something
    console.log('===== %s =====', meta.title);
  })
  .on('readable', function () {
    // do something else, then do the next thing
      var stream = this, item;
       while (item = stream.read()) {
      var now = new Date().getTime();

      console.log('Title: %s', item.title);
      console.log('guid: ' + item.guid);
      console.log('link: ' + item.link);
      console.log('Categories: ' + item.categories);
      console.log('Description: ' + item.description);
      console.log('image: ' + item.image.url);
      console.log('enclosure : ' + item.enclosures.length);
      for (j=0;j<item.enclosures.length;j++)
      {
        console.log('In the enclosures function');
          var enclobj = item.enclosures[j];
          console.log(enclobj);
        console.log(enclobj.url);
      }
      console.log('Meta Title: ' + item.meta.title);
      console.log('Meta Link: ' + item.meta.link);
      console.log('**********************END***************************');
      
        var post = {
             title: item.title,
    		 userId: sacha._id,
    author:sacha.profile.name,
    content:item.summary,
    url: item.link,
    imgUrl: item.image.url,
    submitted: item.pubdate,
     commentsCount: 0,
     upvoters: [], votes: 0
            
            }
      Posts.insert(post);
    }
	  
	  })
	  )
	  , function(err,results) {
		done(err, results);
		});
		});
  
  if (repos.error) {
		throw new Meteor.error(501, repos.error,message);
	}
	else
	{
	 //console.log(repos.result);
	 
      
    }
  }
  
 
 
 
