/*

highlight v3

Highlights arbitrary terms.

<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>

MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>

*/

jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   if (pos >= 0) {
    var spannode = document.createElement('span');
    spannode.className = 'highlight';
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(pat.length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 });
};

jQuery.fn.highlight1 = function(pos, pos_type) {
 function innerHighlight1(node_root, pos, pos_type) {
  var cur_node = 0;
  var offset = 0;
  var node = node_root.childNodes[cur_node];
  if ((node.nodeType == 3 || node.nodeType == 1)) {
    var pos_array = pos.split("|");
    for (var i = 0; i < pos_array.length ; i++) {
	var pos_sub1 = pos_array[i].split(";");
	var pos_sub2 = pos_sub1[1].split("-");
      if (pos_sub1[0] == pos_type) {
        var spannode = document.createElement('span');
        spannode.className = 'highlight';
        while (pos_sub2[0]-offset > node.textContent.length) {
          offset += node.textContent.length ;
	  if (node.nodeType == 1) offset ++;
          cur_node ++;
          node = node_root.childNodes[cur_node]; 
        }
        var middlebit = node.splitText(pos_sub2[0]-offset);
        var endbit = middlebit.splitText(pos_sub2[1]-pos_sub2[0]);
        var middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spannode, middlebit);
        offset = parseInt(pos_sub2[1]);
        cur_node += 2; 
        node = node_root.childNodes[cur_node];
      }
   }
 }
}
 return this.each(function() {
  var node = this;
  while (node.childNodes[0].nodeType != 3) node = node.childNodes[0];
  innerHighlight1(node, pos, pos_type);
 });
}

jQuery.fn.removeHighlight = function() {
 return this.find("span.highlight").each(function() {
  this.parentNode.firstChild.nodeName;
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};
