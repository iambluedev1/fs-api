# FrenchStream Unofficial Api

Webscraper for the website [french-stream.co](http://french-stream.co/)

### Install
> git clone https://github.com/iambluedev1/frenchstream-webscraper.git
> npm install

### Usage
> node index.js

The webscraper is listening on the port 8080.

###RESTful API

|  Path | Example | Description
| ------------ | ------------ | ------------ |
| /get/{flag}/{id}  |  /get/movies/1  | Get Items displayed in the home page |
| /fetch/boxoffice/{page}  |  /fetch/boxoffice/154  | Get Items stored in the box-office |
| /fetch/{flag}/{page}  |  /fetch/movies/154  | Get Items indicated as flag type|
| /fetch/genres/{flag}/{genre_id}/{page}  |  /fetch/genres/movies/1/5  | Return a list of items corresponding to a specific genre and flag values
| /raw/{video_id}/{tag}  |  /raw/16550/{comment}  | Get datas of a video

####Params

|  Param  | Possible values |
| ------------ | ------------ |
| flag  | movies or series  |
| id  | Refers to the differents categories in the home page such as "Défaut", "HDLight", "Vostfr" etc..., see more at the categories.js file |
| page  | This is an optionable parameter, by default is value is 1  |
| genre_id  | Refers to the differents genres in the website. See more at the genres.js file|
| video_id  | This is the video is, for example for the movie [Racific Rim Uprising](http://french-stream.co/16550-pacific-rim-uprising.html), the id is 16550 (it can be viewed in the url) |
| tag  |  Right now, the only tag you can use is "comments", it's used to display comments of a video  |

####Responses

For */get/movies/1* :
```json
[{
	"title":"Pacific Rim Uprising",
	"type":"DVDSCR",
	"lang":"TrueFrench",
	"id":"16550",
	"img":"http://french-stream.co//img/french-stream.com.php?src=http://fr.web.img6.acsta.net/c_215_290/pictures/18/01/24/17/09/1857016.jpg&w=190&h=260"
}, ... ]
```
For */fetch/boxoffice/154*
```json
[{
	"title":"Le scaphandre et le papillon",
	"type":"DVDRIP",
	"lang":"French",
	"id":"6743",
	"img":"http://french-stream.co//img/french-stream.com.php?src=http://fr.web.img5.acsta.net/r_1200_1600/medias/nmedia/18/63/78/45/18765089.jpg&w=190&h=260"
}, ... ]
````

For */fetch/genres/movies/1/5* :
```json
[{
	"title":"Par instinct",
	"type":"HDLight",
	"lang":"French",
	"id":"16526",
	"img":"http://french-stream.co//img/french-stream.com.php?src=http://fr.web.img6.acsta.net/c_215_290/pictures/17/09/11/17/25/3174750.jpg&w=190&h=260"
}, ... ]
```

For */fetch/movies/154* :
```json
[{
	"title":"Solstice",
	"type":"DVDRIP",
	"lang":"French",
	"id":"7870",
	"img":"http://french-stream.co//img/french-stream.com.php?src=http://fr.web.img6.acsta.net/r_1200_1600/medias/nmedia/18/71/31/28/19131371.jpg&w=190&h=260"
},
```

For */raw/16550* :
```json
{
	"title":"Pacific Rim Uprising",
	"poster":"http://french-stream.co//img/french-stream.com.php?src=http://fr.web.img6.acsta.net/c_215_290/pictures/18/01/24/17/09/1857016.jpg&w=190&h=260",
	"lang":"TrueFrench",
	"type":"DVDSCR",
	"date":"2018",
	"realisators":[
		"Steven S. DeKnight"
	],
	"genres":[
		"Aventure",
		"Science fiction"
	],
	"actors":[
		"John Boyega",
		"Scott Eastwood",
		"Jing Tian",
		"Cailee Spaeny"
	],
	"description":"Le conflit planétaire qui oppose les Kaiju, créatures extraterrestres, aux Jaegers, robots géants pilotés par des humains, nétait que la première vague dune attaque massive contre lHumanité.Jake Pentecost, un jeune pilote de Jaeger prometteur dont le célèbre père a sacrifié sa vie pour sauver lHumanité des monstrueux Kaiju a depuis abandonné son entraînement et sest retrouvé pris dans lengrenage du milieu criminel.Mais lorsquune menace, encore plus irrésistible que la précédente, se répand dans les villes et met le monde à feu et à sang, Jake obtient une dernière chance de perpétuer la légende de son père aux côtés de sa sur, Mako Mori  qui guide une courageuse génération de pilotes ayant grandi dans lombre de la guerre. Alors quils sont en quête de justice pour leurs camarades tombés au combat, leur unique espoir est de sallier dans un soulèvement général contre la menace des Kaiju.Jake est rejoint par son rival, le talentueux pilote Lambert et par Amara, une hackeuse de Jaeger âgée de 15 ans, les héros du Corps de Défense du Pan Pacific devenant la seule famille qui lui reste.Salliant pour devenir la plus grande force de défense que la Terre nait jamais connue, ils vont paver un chemin vers une extraordinaire nouvelle aventure.",
	"voting":{
		"likes":{
			"count":379318,
			"average":8.4
		},
		"dislikes":{
			"count":61,
			"average":1.5999999999999996
		}
	},
	"players":[
		"http://french-stream.co/f.php?p_id=1&&c_id=UkVoUk9GTkRSMU5GU0V4S0xtaDBiV3c9",
		"http://french-stream.co/yy.php?p_id=2&&c_id=UW10NGVGZE5UVnBTY0VrPQ==",
		"http://french-stream.co/yy.php?p_id=3&&c_id=WlhWeE0yVm5PR3RwWVdndw=="
	]}
```

For */raw/16550/comments* :
```json
{
	"comments":[{
		"id":29893,
		"avatar":"http://french-stream.co//templates/FRV4/dleimages/noavatar.png",
		"username":"guigui98",
		"message":"super sympa ce film",
		"date":"13 Avril 2018 18:15"
	}, ... ]
}
```

## Disclaimers

This is an unofficial api of the website [french-stream.co](http://french-stream.co/). I'm not the owner of this website, and I don't know there owners.