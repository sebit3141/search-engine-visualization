//word cloud SERP
ns.sev.wordCloudSerp(ns.sev.resultSolrJSON.response.docs[i].url, parseHTML);

//From Jonathan Feinberg's cue.language, see lib/cue.language/license.txt.
var unicodePunctuationRe = "!-#%-*,-/:;?";
var stopWords = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/,
    punctuation = new RegExp("[" + unicodePunctuationRe + "]", "g"),
    wordSeparators = /[ \f\n\r\t\v\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
    discard = /^(@|https?:|\/\/)/,
    htmlTags = /(<[^>]*?>|<script.*?<\/script>|<style.*?<\/style>|<head.*?><\/head>)/g,
    matchTwitter = /^https?:\/\/([^\.]*\.)?twitter\.com/;

var words = [],
max,
complete = 0,
tags,
fontSize,
maxLength = 30;

//word cloud SERP
ns.sev.wordCloudSerp = function(url, callback) {
	//d3.text(url, callback);
	d3.text('/ajax?url=' + url, callback);
/*
	var resp;
	$.ajax({
		url: '/ajax?url=' + url,
		success: function(response){
			resp = response;
		},
		error: function (xhr, err) {
            console.log(xhr);
            console.log(err);
        }
	});
*/	
}

function parseHTML(d) {
	  parseText(d.replace(htmlTags, " ").replace(/&#(x?)([\dA-Fa-f]{1,4});/g, function(d, hex, m) {
	    return String.fromCharCode(+((hex ? "0x" : "") + m));
	  }).replace(/&\w+;/g, " "));
	}

function parseText(text) {
	  tags = {};
	  var cases = {};
	  text.split(wordSeparators).forEach(function(word) {
	    if (discard.test(word)) return;
	    word = word.replace(punctuation, "");
	    if (stopWords.test(word.toLowerCase())) return;
	    word = word.substr(0, maxLength);
	    cases[word.toLowerCase()] = word;
	    tags[word = word.toLowerCase()] = (tags[word] || 0) + 1;
	  });
	  tags = d3.entries(tags).sort(function(a, b) { return b.value - a.value; });
	  tags.forEach(function(d) { d.key = cases[d.key]; });
	  //generate();
    tags = tags.slice(0, Math.min(tags.length, 50));
    
 	  generate2(tags);
	}

function generate() {
    //size
	var width = parseInt(d3.select("div.cluster").style('width'), 10);
	var areaRatio = .2;
	var height = width * areaRatio;
    
 
    //layout
	d3.layout.cloud().size([width, height])
	.words(tags.slice(0, Math.min(tags.length, 20)))
        .padding(2)
        .rotate(function() { return 0; })
        .font("Impact")
        .fontSize(function(d) { return getFontSize(d); })
        .text(function(d) { return d.key; })
        .on("end", draw)
	    .start();


	function draw(words) {
		d3.select("#draw-tree").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(150,150)")
		.selectAll("text")
		.data(words)
		.enter().append("text")
		.style("font-size", function(d) { return  Math.log(d.value) + "px"; })
    			.style("font-size", function(d) { return getFontSize(d) + "px"; })
		.style("font-family", "Impact")
		.attr("text-anchor", "middle")
		.attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + 0 + ")";
		})
		.text(function(d) { return d.key; });
	}
    
   //-get font-size
	function getFontSize(d) {
		return ( 15 + 150 * Math.log(1 + d.value / tags[0].value) * (width / (width + 2000)) );
	} 
}


//---word cloud
//---arguements:
//----facetDocs (Object) (input data for define faceting (word cloud))
generate2 = function(facetDocs) {
	//size
	var width = parseInt(d3.select("div.cluster").style('width'), 10);
	var areaRatio = .2;
	var height = width * areaRatio;
	
	var root = facetDocs;
	
	var fill = d3.scale.category20();
		
	//remove old faceting tags
	$("div#faceting_tags").remove();
	
	//layout
	d3.layout.cloud().size([width, height])
		.words(root)
        .padding(2)
        .rotate(function() { return 0; })
        .font("Impact")
        .fontSize(function(d) { return getFontSize(d); })
        .text(function(d) { return d.key; })
        .on("end", draw)
	    .start();
	
	//inner functions (respective callbacks)
	//-draw words
	function draw(words) {
		d3.select("#draw-tree").append("svg")
			.attr("width", width)
			.attr("height", height)
		.append("g")
			.attr("transform", "translate( "+ width / 2 + "," + height / 2 + ")")
		.selectAll("text")
			.data(words)
		.enter().append("text")
			.style("font-size", function(d) { return getFontSize(d) + "px"; })
			.style("font-family", "Impact")
			.style("fill", function(d, i) { return fill(i); })
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.text(function(d) { return d.key; });
	}
	
	//-get font-size
	function getFontSize(d) {
 		return ( 15 + 150 * Math.log(1 + d.value / tags[0].value) * (width / (width + 2000)) );
	}
}