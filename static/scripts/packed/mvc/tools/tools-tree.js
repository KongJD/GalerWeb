define([],function(){return Backbone.Model.extend({initialize:function(a){this.app=a},refresh:function(){this.dict={};this.xml=$("<div/>");if(!this.app.section){return{}}this._iterate(this.app.section.$el,this.dict,this.xml)},finalize:function(){var a=this;this.job_def={};this.job_ids={};function c(f,e,d){a.job_def[f]=d;a.job_ids[f]=e}function b(j,m){for(var g in m){var e=m[g];if(e.input){var n=e.input;var h=j;if(j!=""){h+="|"}h+=n.name;switch(n.type){case"repeat":var d="section-";var q=[];var l=null;for(var p in e){var k=p.indexOf(d);if(k!=-1){k+=d.length;q.push(parseInt(p.substr(k)));if(!l){l=p.substr(0,k)}}}q.sort(function(r,i){return r-i});var g=0;for(var f in q){b(h+"_"+g++,e[l+q[f]])}break;case"conditional":var o=a.app.field_list[n.id].value();c(h+"|"+n.test_param.name,n.id,o);for(var f in n.cases){if(n.cases[f].value==o){b(h,m[n.id+"-section-"+f]);break}}break;default:c(h,n.id,a.app.field_list[n.id].value())}}}}b("",this.dict);return this.job_def},match:function(a){return this.job_ids&&this.job_ids[a]},matchResponse:function(c){var a={};var b=this;function d(j,h){if(typeof h==="string"){var f=b.app.tree.job_ids[j];if(f){a[f]=h}}else{for(var g in h){var e=g;if(j!==""){e=j+"|"+e}d(e,h[g])}}}d("",c);return a},references:function(c,e){var g=[];var b=this;function d(h,j){var i=$(j).children();var l=[];var k=false;i.each(function(){var o=this;var n=$(o).attr("id");if(n!==c){var m=b.app.input_list[n];if(m){if(m.name==h){k=true;return false}if(m.data_ref==h&&m.type==e){l.push(n)}}}});if(!k){g=g.concat(l);i.each(function(){d(h,this)})}}var f=this.xml.find("#"+c);if(f.length>0){var a=this.app.input_list[c];if(a){d(a.name,f.parent())}}return g},_iterate:function(d,e,b){var a=this;var c=$(d).children();c.each(function(){var i=this;var h=$(i).attr("id");if($(i).hasClass("section-row")){e[h]={};var f=a.app.input_list[h];if(f){e[h]={input:f}}var g=$('<div id="'+h+'"/>');b.append(g);a._iterate(i,e[h],g)}else{a._iterate(i,e,b)}})}})});