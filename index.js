var express = require('express');
var fs = require('fs');
var request = require('request');
var syncRequest = require('sync-request');
var cheerio = require('cheerio');
var cheerioAdv = require('cheerio-advanced-selectors')
var apicache = require('apicache');

cheerio = cheerioAdv.wrap(cheerio)
var app = express();
var cache = apicache.middleware;

var categories = require('./categories.js');
var genres = require('./genres.js');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

Object.keys(categories).map(function(objectKey, index) {
    var value = categories[objectKey];
	Object.keys(value.mappings).map(function(objectKey, index) {
		var mapping = value.mappings[objectKey];
		app.get('/get/' + value.flag + '/' + mapping.requestId, cache('1 day'), function(req, res){
			request.post({
				url: 'http://french-stream.co/engine/ajax/custom.php',
				form: {
					castom: "custom+category='" + mapping.fsCatId + "'+template='" + mapping.fsTemplate + "'+from='0'+limit='12'"
				}
			}, function(error, response, html){
				if(!error){
					var $ = cheerio.load(html);
					var json = [];
					$('.short-in').each(function (i, elem) {
						json.push({});
						if(value.flag == "movies") {
							json[i].title = $('.short-title', this).text().trim();
							json[i].type = $('.film-ripz', this).text().trim();
							json[i].lang = $('.film-verz', this).text().trim();
						} else if(value.flag == "series") {
							json[i].title = $('img', this).attr('alt');
							json[i].episodes = $('i', this).text().trim();
							if(mapping.fsTemplate == "shortserie"){
								json[i].lang = $('.film-verz', this).text().trim();
							}
						}
						var url = $('.short-poster', this).attr('href');
						url = url.match(/\/?[0-9]+/g)[0];
						url = url.replace("/", "");
						json[i].id = url;
						json[i].img = 'http://french-stream.co/' + $('img', this).attr('src');
					});
				}
				res.send(json);
			});
		})
	});
});

app.get('/fetch/boxoffice/:page?', cache('1 day'), function(req, res){
	var page = parseInt(req.params.page);
	var url = '';
	if(!page) {
		url = 'http://french-stream.co';
	}else{
		if(isNaN(page) || page < 0){
			res.send({
				error: 'Param not valid !'
			});
			return;
		}else{
			url = 'http://french-stream.co/page/' + page;
		}
	}
	request.get({
		url: url,
	}, function(error, response, html){
		if(!error) {
			var $ = cheerio.load(html);
			var json = [];
			var el = $(".pages").get($(".pages").length - 2);
			$('.short-in', el).each(function (i, elem) {
				json.push({});
				json[i].title = $('.short-title', this).text().trim();
				json[i].type = $('.film-ripz', this).text().trim();
				json[i].lang = $('.film-verz', this).text().trim();
				var url = $('.short-poster', this).attr('href');
				url = url.match(/\/?[0-9]+/g)[0];
				url = url.replace("/", "");
				json[i].id = url;
				json[i].img = 'http://french-stream.co/' + $('img', this).attr('src');
			});
			if(json.length == 0 && page){
				json = {
					error: $('.berrors').text().trim()
				}
			}
		}
		res.send(json);
	});
});

app.get('/fetch/movies/:page', cache('1 day'), function(req, res){
	var page = parseInt(req.params.page);
	if(isNaN(page) || page < 0){
		res.send({
			error: 'Param not valid !'
		});
		return;
	}
	request.get({
		url: 'http://french-stream.co/film/page/' + page,
	}, function(error, response, html){
		if(!error) {
			var $ = cheerio.load(html);
			var json = [];
			$('.short-in').each(function (i, elem) {
				json.push({});
				json[i].title = $('.short-title', this).text().trim();
				json[i].type = $('.film-ripz', this).text().trim();
				json[i].lang = $('.film-verz', this).text().trim();
				var url = $('.short-poster', this).attr('href');
				url = url.match(/\/?[0-9]+/g)[0];
				url = url.replace("/", "");
				json[i].id = url;
				json[i].img = 'http://french-stream.co/' + $('img', this).attr('src');
			});
			if(json.length == 0){
				json = {
					error: $('.berrors').text().trim()
				}
			}
		}
		res.send(json);
	});
});

app.get('/fetch/series/:page', cache('1 day'), function(req, res){
	var page = parseInt(req.params.page);
	if(isNaN(page) || page < 0){
		res.send({
			error: 'Param not valid !'
		});
		return;
	}
	request.get({
		url: 'http://french-stream.co/serie/page/' + page,
	}, function(error, response, html){
		if(!error) {
			var $ = cheerio.load(html);
			var json = [];
			$('.short').each(function (i, elem) {
				json.push({});
				json[i].title = $('img', this).attr('alt');
				json[i].title = $('.short-title', this).text().trim();
				json[i].episodes = $('i', this).text().trim();
				json[i].lang = $('.film-verz', this).text().trim();
				var url = $('.short-poster', this).attr('href');
				url = url.match(/\/?[0-9]+/g)[0];
				url = url.replace("/", "");
				json[i].id = url;
				json[i].img = 'http://french-stream.co/' + $('img', this).attr('src');
			});
			if(json.length == 0){
				json = {
					error: $('.berrors').text().trim()
				}
			}
		}
		res.send(json);
	});
});

Object.keys(genres).map(function(objectKey, index) {
	var values = genres[objectKey];
	Object.keys(values).map(function(objectKey2, index2) {
		var item = values[objectKey2];
		app.get('/fetch/genres/' + objectKey + '/' + item.id + '/:page?', cache('1 day'), function(req, res){
			var page = parseInt(req.params.page);
			var url = '';
			if(!page) {
				url = 'http://french-stream.co' + item.baseUrl;
			}else{
				if(isNaN(page) || page < 0){
					res.send({
						error: 'Param not valid !'
					});
					return;
				}else{
					url = 'http://french-stream.co' + item.baseUrl + 'page/' + page;
				}
			}

			request.get({
				url: url,
			}, function(error, response, html){
				if(!error) {
					var $ = cheerio.load(html);
					var json = [];
					$('.short-in').each(function (i, elem) {
						json.push({});
						if(objectKey == "movies") {
							json[i].title = $('.short-title', this).text().trim();
							json[i].type = $('.film-ripz', this).text().trim();
							json[i].lang = $('.film-verz', this).text().trim();
						} else if(objectKey == "series") {
							json[i].title = $('img', this).attr('alt');
							json[i].episodes = $('i', this).text().trim();
							json[i].lang = $('.film-verz', this).text().trim();
						}
						var url = $('.short-poster', this).attr('href');
						url = url.match(/\/?[0-9]+/g)[0];
						url = url.replace("/", "");
						json[i].id = url;
						json[i].img = 'http://french-stream.co/' + $('img', this).attr('src');
					});
					if(json.length == 0){
						json = {
							error: $('.berrors').text().trim()
						}
					}
				}
				res.send(json);
			});
		});
	});
});

app.get('/raw/:code/:comment?', cache('1 day'), function(req, res){
	var code = req.params.code;
	if(!code){
		res.send({
			error: 'Param not valid !'
		});
		return;
	}else{
		if(isNaN(code) || code < 0){
			res.send({
				error: 'Param not valid !'
			});
			return;
		}

		request.get({
			url: 'http://french-stream.co/' + code + '-.html',
		}, function(error, response, html){
			if(!error) {
				var $ = cheerio.load(html);
				var json = {};

				if(req.params.comment !== "comments"){
					json.title = $('h1').text().trim();
					json.poster = 'http://french-stream.co/' + $('.fposter > img').attr("src");
					json.lang = $('.short-qual > a').text().trim();
					json.type = $('.short-label > a').text().trim();
					tags = [];
					$('.flist-col > li').each(function (i, elem) {
						var tmp = $('span', this).text().trim();
						if(!tmp) return;
						
						tags.push({});
						tmp = tmp.split(':');
						tags[i].key = tmp[0].trim();
						if(tmp[1] !== ""){
							tags[i].value = tmp[1].trim();
						}else{
							var value = $(this).text().trim().replace(tmp[0], "").replace(":", "").trim();
							if(value.includes("|")){
								value = value.split("|");
								json.date = value[1].trim();
								value = value[0];
								tags[i].value = value.trim();
							}else{
								tags[i].value = value;
							}
						}
					});

					for(var z = 0; z < tags.length; z++){
						var tag = tags[z];
						if(tag.key == "Avec"){
							var tmp = tag.value.split(', ');
							json.actors = tmp;
						}

						if(tag.key == "Genre") {
							var tmp = tag.value.split(', ');
							json.genres = tmp;
						}

						if(tag.key == "Réalisé par") {
							var tmp = tag.value.split(', ');
							json.realisators = tmp;
						}

						if(tag.key == "Résumé du Film") {
							json.description = tag.value;
						}
					}

					$('.frate').each(function (i, elem) {
						var voteEl = $('.fr-votes', this);
						var rating = parseInt($('.ratingtypeplusminus', voteEl).text()); //+142
						var	votes = parseInt($('span[id]:last', voteEl).text()); //398

						if (votes >= rating && votes > 0) {
							var m = (votes - rating)/2; //128
							var	p = votes - m; //270
							var	averageLikes = (Math.round((votes - (votes - rating) / 2) / votes * 100)) / 10; //6.8
							var	averageDisLikes = 10 - averageLikes; //3.2
						} else {
							var m = 0;
							var	p = 0;
							var	averageLikes = 0;
							var	averageDisLikes = 0;
						}
						json.voting = {
							likes: {
								count: parseInt(votes + "" + p),
								average: averageLikes
							},
							dislikes: {
								count: m,
								average: averageDisLikes
							}
						}
					});	

					var tmp = $('#tmp').val();
					if(tmp != undefined){
						tmp = tmp.split('sig=705&&');
						tmp = Buffer.from(
							Buffer.from(tmp[1]).toString('base64')
						).toString('base64');
						json.players = [];
						json.players.push("http://french-stream.co/f.php?p_id=1&&c_id=" + tmp);

						tmp = $('#tmp2').val();
						tmp = tmp.split('nbsp');
						tmp = Buffer.from(
							Buffer.from(tmp[1]).toString('base64')
						).toString('base64');
						json.players.push("http://french-stream.co/yy.php?p_id=2&&c_id=" + tmp);

						tmp = $('#tmp4').val();
						tmp = tmp.split('nbsq');
						tmp = Buffer.from(
							Buffer.from(tmp[1]).toString('base64')
						).toString('base64');
						json.players.push("http://french-stream.co/yy.php?p_id=3&&c_id=" + tmp);		
					}
				}else{
					json.comments = [];
					var x = 0;
					$('#dle-comments-list > div').each(function (i, elem) {
						var el = $(this);
						if(!el.attr('id').startsWith("comment-id")){
							return;
						}

						json.comments.push({});
						json.comments[x].id = parseInt(el.attr('id').replace("comment-id-", ""));

						var avatar =  $('img', this).attr('src');
						if(!avatar.startsWith("//")){
							avatar = "http://french-stream.co/" + avatar;
						}

						json.comments[x].avatar = avatar;
						json.comments[x].username = $('img', this).attr('alt');
						json.comments[x].message = $('.full-text > span > div', this).html();
						json.comments[x].date = $('.comm-right > ul > li > b:last', this).text().trim();
						x++;
					});
				}
			}
			res.send(json);
		});
	}
});

app.listen('8080');
console.log('Listening on localhost:8080');
exports = module.exports = app;