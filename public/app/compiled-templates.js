Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', hashTypes, hashContexts, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"navbar navbar-fixed-top\">\n    <div class=\"navbar-inner\">\n        <div class=\"container\">\n            <a class=\"brand\">GlassPlace</a>\n            <ul class=\"nav pull-right\">\n\n                <div id=\"signinButton\">\n				  <span class=\"g-signin\"\n                        data-scope=\"https://www.googleapis.com/auth/glass.timeline https://www.googleapis.com/auth/userinfo.profile\"\n                        data-clientid=\"340409559435.apps.googleusercontent.com\"\n                        data-accesstype=\"offline\"\n                        data-approvalprompt=\"force\"\n                        data-cookiepolicy=\"single_host_origin\"\n                        data-callback=\"signInCallback\">\n					</span>\n                </div>\n                <div id=\"profile\" class=\"nav dropdown\">\n                    <img id=\"avatar\" />\n                </div>\n            </ul>\n        </div>\n    </div>\n</div>\n\n<script type=\"text/javascript\">\n    /*\n   * Step 3: Include the Google+ script on your page\n   */\n    (function () {\n        var po = document.createElement('script');\n        po.type = 'text/javascript';\n        po.async = true;\n        po.src = 'https://plus.google.com/js/client:plusone.js?onload=start';\n        var s = document.getElementsByTagName('script')[0];\n        s.parentNode.insertBefore(po, s);\n    })();\n</script>\n<div class=\"container\">\n    <div class=\"hero-unit\">\n\n		");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\n    </div>\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<h2>Welcome to Glaze</h2>\n<p>Glaze is a glass client for pulse.  To begin, sign in with google above.</p>\n");
  
});

Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<p>OK, next Login to pulse.</p>\n<div class=\"row\">\n	");
  hashContexts = {'type': depth0,'id': depth0};
  hashTypes = {'type': "STRING",'id': "STRING"};
  options = {hash:{
    'type': ("text"),
    'id': ("username")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n</div>\n<div class=\"row\">\n	");
  hashContexts = {'type': depth0,'id': depth0};
  hashTypes = {'type': "STRING",'id': "STRING"};
  options = {hash:{
    'type': ("password"),
    'id': ("password")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n</div>\n<div class=\"row\">\n	<button class=\"btn btn-primary\" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "loginToPulse", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Login</button>\n</div>");
  return buffer;
  
});