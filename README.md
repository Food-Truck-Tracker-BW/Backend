# Backend

Endpoints: 

API main: http://food-truck-tracker-be.herokuapp.com

________________________________________________________
AUTH(POSTS):
/api/register

{
"username": “testUser”,
"email": “user@gmail.com",
 "password": "password123",
 "is_operator": true 
} 

OR 

{
"username": “testUser”,
"email": “user@gmail.com",
 "password": "password123",
 "is_operator": false
}

 /api/login 

{
"username": “testUser”,
 "password": "password123"
}
__________________________________________________________
USERS(GET):

GET ALL REGISTERED USERS: 
/api/user

GET ALL REGISTERED DINERS:
/api/user/getDiners

GET ALL REGISTERED OPERATORS:
 /api/user/getOperators

GET USER BY ID:
/api/user/:id

GET ALL TRUCKS OWNED BY USER:
api/user/:id/trucks

(POST):

ADD TRUCK: 

/api/user/:id/trucks

{
	"name": string,
	"image": string",
	"cuisine_type": string,
	"location": {"long": string (EXAMPLE: "27.255710"), "lat": string (EXAMPLE: "-80.200195")},
	"departure": "HH:MM:SS"
}

(DELETE):

DELETE USER:

/api/user/:id

__________________________________________________________

TRUCKS(GET):

GET ALL TRUCKS:
/api/truck/

GET ALL TRUCK BY ID:
/api/truck/:id

GET MENUS: 
/api/truck/:id/menus

GET LOCATION:
/api/truck/:id/location

GET RATING:
/api/truck/:id/avgRating

GET MENU ITEM:
/api/truck/menu/:itemId

GET MENU ITEM RATING:
/api/truck/menu/:itemId/itemAvgRatings

(POST):

POST MENU ITEM(S):
/api/truck/:id

[
    { item_name: string, item_description: string, item_image: string(link), item_price: string, truck_id: integer },
    { item_name: string, item_description: string, item_image: string(link), item_price: string, truck_id: integer }
]

(PUT):

UPDATE TRUCK:

/api/truck/:id

{
	"name": string,
	"image": string",
	"cuisine_type": string,
	"location": {"long": string (EXAMPLE: "27.255710"), "lat": string (EXAMPLE: "-80.200195")},
	"departure": "HH:MM:SS"
}

(DELETE):

/api/truck/:id





