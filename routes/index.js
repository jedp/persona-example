const
md = require('node-markdown').Markdown,
utils = require('../lib/utils');

exports.index = function(req, res){
  var content = {
    md: md,
    content: utils.getContent('index'),
    loggedInUser: null
  };
  res.render('index', content);
};