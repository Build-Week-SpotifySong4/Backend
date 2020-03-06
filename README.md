# Backend

## Endpoints

### Auth

#### Register

Endpoint

`POST https://damp-hamlet-68165.herokuapp.com/api/auth/register`

Headers

`Content-Type application/json`

Body

```
{
	"username": "johndoe",
	"password": "somepassword"
}
```

---

#### Login

Endpoint

`POST https://damp-hamlet-68165.herokuapp.com/api/auth/login`

Headers

`Content-Type application/json`

Body

```
{
	"username": "johndoe",
	"password": "somepassword"
}
```

---

### Songs

#### Get a user's saved songs

Endpoint

`GET https://damp-hamlet-68165.herokuapp.com/api/songs`

Headers

`Authorization <token>`

---

#### Delete a song from user's saved songs

Endpoint

`DELETE https://damp-hamlet-68165.herokuapp.com/api/songs/:song_id`

Headers

`Authorization <token>`

---

#### Add a song to user's saved songs

Endpoint

`POST https://damp-hamlet-68165.herokuapp.com/api/songs`

Headers

`Content-Type application/json`

`Authorization <token>`

Body

```
{
	"spotify_id": "09opLVMX7cfKVKlP3iKZR1"
}
```

***

# Team

### [Christopher Oakes](https://github.com/oakes680)

### [Alex Gohorel](https://github.com/agohorel)