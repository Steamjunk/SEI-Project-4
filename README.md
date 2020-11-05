# SEI-Project-4
Capstone project for the Software Engineering Immersive

## Magic the Gathering collection tracker
Users may create an account to track their collection and decks of Magic the Gathering (MTG) cards. Card data will come from an external API and be stored in a database connected to the app. The app will display an analysis of a particular deck based on its composition and allow the user to draw sample hands.

## Features
### MVP
- User account features
  - A user may create an account if they have not already.
  - A user may log into their account if they have created one.
  - A user may delete their account.
  - A user may modify their account information: username, password, etc.
  
- User card collection features
  - A user may maintain a collection of cards they own and a collection of cards in their wishlist
  - A user may maintain a set of decks made up of cards they own
  - A user may move a card between owned cards, their wishlist or a deck
  - A user may remove a card from their collection
  - A user may remove a deck from their collection
  
- Card search page features
  - A user may search or browse for a card multiple attributes including:
    - Name
    - Set
    - Color(s)
    - Card type
  - A user may add a card to their collection or to their wishlist from search page
  - A user may add a card to a deck they have already created from the search page
  - A user may add multiple copies of a card to their collection, wishlist or a deck from the search page
  - A user may click on a card from search results and go to a show page for that card
  
- Card show page features
  - This page shows information available about a card including:
    - Artwork
    - Text and data printed on the card
    - Rulings and clarifications provided
  - If there are multiple printings of a card from different set they are accessible from this page
  - A user may add or remove a card from a list or deck from here

- Deck page features
  - A user may create a new, empty deck and define some information about it. Name, description, play format
  - A user may remove a deck from their collection from this page

### Stretch
- Display an active deck or list alongside search results and update in real time when a card is added



### Gold
- Include market price data from tcgplayer.com, this may be displayed on search, card show, and deck show pages. (requires approval for API key)




## ERD

## Wireframes
### Account page

### Card search page

### Individual show page

### Deck show page



## Technology
- Express back-end
- React front-end
- PostGres Database


### Links/Documentation
- [MTG Card API](https://docs.magicthegathering.io/)
- [Card API JavaScript SDK](https://github.com/MagicTheGathering/mtg-sdk-javascript)
- [React/Express App Tutorial](https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/)
