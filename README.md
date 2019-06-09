# FrenchStream Unofficial Api (OUTDATED)

/!\ french-stream.co is now closed and splitted into 3 differents websites : french-serie.co, french-film.co and french-manga.co. Their structure is different, so this api is unusable at the moment. I will fix it as soon I have some time.

Webscraper for the website [french-stream.co](http://french-stream.co/)

### Install
> git clone https://github.com/iambluedev1/fs-api.git

> npm install

### Usage
> npm start

or

> npm run dev

The webscraper is listening on the port 8080.

### RESTful API

|  Path | Example | Description
| ------------ | ------------ | ------------ |
| /get/{flag}/{id}  |  /get/movies/1  | Get Items displayed in the home page |
| /fetch/boxoffice/{page}  |  /fetch/boxoffice/154  | Get Items stored in the box-office |
| /fetch/{flag}/{page}  |  /fetch/movies/154  | Get Items indicated as flag type|
| /fetch/genres/{flag}/{genre_id}/{page}  |  /fetch/genres/movies/1/5  | Return a list of items corresponding to a specific genre and flag values
| /raw/{video_id}/{tag}  |  /raw/16550/{comment}  | Get datas of a video
| /link/{code} | no example | Get link behind redirection |

#### Params

|  Param  | Possible values |
| ------------ | ------------ |
| flag  | can be movies, series or mangas |
| id  | Refers to the differents categories in the home page such as "Défaut", "HDLight", "Vostfr" etc..., see more at the categories.js file |
| page  | This is an optionable parameter, by default is value is 1  |
| genre_id  | Refers to the differents genres in the website. See more at the genres.js file|
| video_id  | This is the video is, for example for the movie [Racific Rim Uprising](http://french-stream.co/16550-pacific-rim-uprising.html), the id is 16550 (it can be viewed in the url) |
| tag  |  Right now, the only tag you can use is "comments", it's used to display comments of a video  |
| code | French-Stream not expose the video's url publicly, so this code refers to the set of parameters which are used in order to get clear url |

#### Responses

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
For */fetch/boxoffice/154* :
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

For */fetch/series/15* :
```json
[{
  "title":"3 pourcent -  Saison 2",
  "episodes":"10",
  "lang":"VOSTFR",
  "id":"17198",
  "img":"http://french-stream.co//img/french-stream.com.php?src=https://i.imgur.com/dMOaVpE.jpg&w=190&h=280"
},
```

For */fetch/mangas/5* :
```json
[{
  "title":"Naruto Shippuden - Saison 9",
  "episodes":"25",
  "lang":"VF",
  "id":"165511",
  "img":"http://french-stream.co//img/french-stream.com.php?src=https://i.imgur.com/huZkuGG.jpg&w=190&h=280"
},
```

For */raw/16550* (movie) :
```json
{
  "title":"Pacific Rim Uprising",
  "poster":"http://french-stream.co//img/french-stream.com.php?src=https://i.imgur.com/f66MSQj.jpg?1&w=190&h=270",
  "description":"Le conflit planétaire qui oppose les Kaiju, créatures extraterrestres, aux Jaegers, robots géants pilotés par des humains, n’était que la première vague d’une attaque massive contre l’Humanité. Jake Pentecost, un jeune pilote de Jaeger prometteur dont le célèbre père a sacrifié sa vie pour sauver l’Humanité des monstrueux Kaiju a depuis abandonné son entraînement et s’est retrouvé pris dans l’engrenage du milieu criminel.  Mais lorsqu’une menace, encore plus irrésistible que la précédente, se répand dans les villes et met le monde à feu et à sang, Jake obtient une dernière chance de perpétuer la légende de son père aux côtés de sa sœur, Mako Mori – qui guide une courageuse génération de pilotes ayant grandi dans l’ombre de la guerre. Alors qu’ils sont en quête de justice pour leurs camarades tombés au combat, leur unique espoir est de s’allier dans un soulèvement général contre la menace des Kaiju. Jake est rejoint par son rival, le talentueux pilote Lambert et par Amara, une hackeuse de Jaeger âgée de 15 ans, les héros du Corps de Défense du Pan Pacific devenant la seule famille qui lui reste. S’alliant pour devenir la plus grande force de défense que la Terre n’ait jamais connue, ils vont paver un chemin vers une extraordinaire nouvelle aventure.",
  "trailer":"http://www.youtube.com/watch?v=t8pWnwVFQ-Y",
  "comments":114,
  "sort":"film",
  "genres":[
    "Aventure",
    "Science fiction"
  ],
  "realisators":[
    "Steven S. DeKnight"
  ],
  "actors":[
    "John Boyega",
    "Scott Eastwood",
    "Jing Tian",
    "Cailee Spaeny"
  ],
  "date":"2018",
  "voting":{
    "likes":{
      "count":12831084,
      "average":8.4
    },
    "dislikes":{
      "count":199,
      "average":1.5999999999999996
    }
  },
  "players":[
    "/link/eyJmaWxlIjoiZi5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVFVWNFZGRnFhRWxUYXpsVlZsUkNSRXh0YURCaVYzYzkifQ==","/link/eyJmaWxlIjoieXkucGhwIiwicGxheWVyX2lkIjoyLCJ2aWRlb19pZCI6IlVWY3hVR1ZFYkhwYU1HeERZa2ROUFE9PSJ9","/link/eyJmaWxlIjoieXkucGhwIiwicGxheWVyX2lkIjozLCJ2aWRlb19pZCI6IllUTkdNV1Z1Y0hGT2FteHlZMVJWZWc9PSJ9"
  ],
  "lang":"TrueFrench",
  "type":"HDLight"
}
```

For */raw/16550* (serie) :
```json
{
  "title":"The 100 - Saison 5",
  "poster":"http://french-stream.co//img/french-stream.com.php?src=https://i.imgur.com/pltx0bE.jpg&w=190&h=260",
  "description":"Après une apocalypse nucléaire causée par l'Homme lors d'une troisième Guerre Mondiale, les 318 survivants recensés se réfugient dans des stations spatiales et parviennent à y vivre et à se reproduire, atteignant le nombre de 4000. Mais 97 ans plus tard, le vaisseau mère, l'Arche, est en piteux état. Une centaine de jeunes délinquants emprisonnés au fil des années pour des crimes ou des trahisons sont choisis comme cobayes par les autorités pour redescendre sur Terre et tester les chances de survie. Dès leur arrivée, ils découvrent un nouveau monde dangereux mais fascinant...",
  "comments":131,
  "sort":"série",
  "genres":[
    "Aventure",
    "Drame",
    "Science fiction"
  ],
  "realisators":[
    "Jason Rothenberg"
  ],
  "actors":[
    "Eliza Taylor",
    "Paige Turco",
    "Bob Morley"
  ],
  "voting":{
    "likes":{
    "count":756732,
    "average":9.7
    },
    "dislikes":{
      "count":24,
      "average":0.3000000000000007
    }
  },
  "plus":"/xfsearch/genre-serie/Après une apocalypse",
  "lang":"VOSTFR",
  "episodes":{
    "vf":[],
    "vostfr":[{
        "name":"Episode 1",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVFhwQmVFOVZhR0ZVTUdkM1ZHeHZNdz09In0="
      },{
        "name":"Episode 2",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVVRCYVlWWnNTbUZOVlUxNVUydFdSZz09In0="
      },{
        "name":"Episode 3",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVTJ0MFIxSlVXazVUYTFKWlVtcG9WQT09In0="
      },{
        "name":"Episode 4",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVWpCS1VGUXdWbEJWYTNoTlV6QjBVQT09In0="
      },{
        "name":"Episode 5",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVXpBeFNWZEVXa1JQUldSRVZFUlNSUT09In0="
      },{
        "name":"Episode 6",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVTJ4bk1sRnJNVlZWYkZWNlUwWk9ZUT09In0="
      },{
        "name":"Episode 7",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVW14T1QwNUZkRlZUYTA1UlUydEdVQT09In0="
      },{
        "name":"Episode 8",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVlVSTk0wNXNRa0pYYWtVelZtdFdWUT09In0="
      },{
        "name":"Episode 9",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVWxaVmVWVjZVWGRPYW10M1ZteEdRZz09In0="
      },{
        "name":"Episode 10",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVFZVNVYwOUZkRU5XUm10NVVqQlJNUT09In0="
      },{
        "name":"Episode 11",
        "link":"/link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVGxaYVVrOUdSWHBPTVdoSFZVVm9SQT09In0="
      }
    ]
  }
}
```

For */raw/16550/comments* :
```json
{
  "comments":[{
    "id":53030,"avatar":"http://french-stream.co//templates/FRVDEV/dleimages/noavatar.png",
    "username":"Isodu13",
    "message":"A quand le prochain le 1 et 2 je les ai kiffer","date":"Aujourd hui, 00:15",
    "rate":0}
  , ... ]
}
```

For */link/eyJmaWxlIjoicy5waHAiLCJwbGF5ZXJfaWQiOjEsInZpZGVvX2lkIjoiVFhwQmVFOVZhR0ZVTUdkM1ZHeHZNdz09In0=* :
```json
{
  "from":"http://french-stream.co/s.php?p_id=1&&c_id=TXpBeE9VaGFUMGd3VGxvMw==",
  "target":"http://cloudvid.co/embed-3019HZOH0NZ7.html"
}
```

## Demo

You can view a demo at : http://fs-api.cf

## Disclaimers

This is an unofficial api of the website [french-stream.co](http://french-stream.co/). I'm not the owner of this website, and I don't know its owners.
