# ChairDevotee

## Browse our site on Render!
[Click here!](https://chairdevotee.onrender.com)

## What is ChairDevotee?

ChairDevotee is a website dedicated to finding and documenting chairs in the wild, letting users review and rent out places to sit!

## No really, why did you do this?

ChairDevotee is a clone of AirBnB that replicates all of your favorite functionality and styling*, except it was built by _me_--immediately making my mom prefer it more!

> "What's airBnB? What am I looking at, Isaac?" -- Momma Gamus

ChairDevotee is a solo project built using the following:
* React
* Redux
* Sequelize

*some of your favorite functionality and styling -- it's actually slightly more intense to implement than I thought it would be

## What can I do on ChairDevotee?
[
    Usage descriptions of features
- image of your site indicating additional functionality
]

On ChairDevotee, you can peruse a variety of listings (spots) and see what people think of them, by perusing average ratings and user-posted reviews. You can think of the functionality showcased on ChairDevotee in terms of technical features.

1. User accounts
2. Spots (full CRUD feature)
3. Reviews (CRD feature)

### 1. User accounts

![Screenshot of user login modal, featuring the demo user button.](./frontend/public/readme-still.jpg.jpg)

ChairDevotee uses JWT tokens as cookies and verifies user passwords saved in hashes, allowing for users to register and securely sign into accounts on ChairDevotee. Users without an account can see spot listings, but users with accounts gain access to more features on the site, gaining the ability to create, delete, and edit spots and reviews.

### 2. Spots

As representations of chairs in the world, ChairDevotee thinks of each chair as a 'Spot' and provides users with full CRUD interactivity with Spots, allowing them to

* Create spots (logged-in users only)
* Read/see spots
* Update their spots (logged-in users on their own spots only)
* Delete their spots (logged-in users on their own spots only)

### 3. Reviews

ChairDevotee provides users with the ability to

* Create reviews of other user's spots (logged-in users only)
* Read reviews on user spots
* Delete their own reviews (logged-in users on their own spots only)

## What are your future plans with this repo?

The roadmap includes

* Round out review functionality with the ability to **update reviews** and a **manage reviews panel**
* Implementing the Booking CRUD feature
* **Spots search**

and more!

## How to deploy locally

To get started

1. Clone the repo

```bash
git clone git@github.com:igamus/API-Project-AirBnB.git <local-repo-name>
```
2. Copy the `.envexample` file and save it as `.env`.
    * Fill out `JWT_SECRET=` with a secure code.
    * Fill out `JWT_EXPIRES_IN=` with a time (in seconds) representing how long you'd like your token to last.
3. Navigate into the `backend/` directory, and install dependencies, run the migrations, and seed the demo database
```bash
npm i && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all
```
4. You should be set to run the server! In the `backend/` directory, run the server using.
```bash
npm start
```
5. Open a new terminal, navigate into the `frontend/` directory, and run the same command. You should be set to peruse the site on your local host.


## Contact information
You can reach the developer (myself), Isaac Gamus, by
email at igamus@gmail.com.
