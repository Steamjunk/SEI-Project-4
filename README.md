# SEI-Project-4
Capstone project for the Software Engineering Immersive

## Magic the Gathering Commander deck builder
Users may create an account to build and track a collection of Commander decks of Magic the Gathering (MTG) cards. Commander is a game format of MTG where decks consist of 99 cards plus one Commander on the side. Card data will come from an external API and be stored in a database connected to the app. The app will display an analysis of a particular deck based on its composition and allow the user to draw sample hands.

## Features
### MVP
- User account features
  - A user may create an account if they have not already.
  - A user may log into their account if they have created one.
  - A user may delete their account.
  - A user may modify their account information: username, password, etc.
  
- User deck collection features
  - A user may create a new, empty deck and define some information about it. Name, description
  - A user may maintain a set of many Commander decks
  - A user may rename a deck in their collection
  - A user may remove a deck from their collection
  
- Card search page features
  - A user may search or browse for a card by multiple attributes including:
    - Name
    - Set
    - Color(s)
    - Card type
  - A user may add a card to a deck they have already created from the search page
  - A user may click on a card from search results and go to a show page for that card
  
- Card show page features
  - This page shows information available about a card including:
    - Artwork
    - Text and data printed on the card
    - Rulings and clarifications provided
  - A user may add or remove a card from a deck from here

- Deck page features
  - A user may remove a deck from their collection from this page
  - A user may modify deck information (Name, description) on this page
  - A user may select a Legendary creature to be the Commander for a deck if that is the chosen deck format.
  - A user may draw a sample hand of 7 cards from this deck.
  - A user may draw additional cards to simulate the first turns of a game
  - A list of cards in the deck is displayed.
  - Use a data visualization tool to plot deck analysis:
    - Display mana curve (bar chart would be effective)
    - Display makeup of card types (pie chart would be effective)
  - Display whether a deck is legal or not for a the format. Some cards are banned


### Stretch
- A user may select a deck or list to display alongside search results and update in real time when a card is added
- A user may select a legendary creature from the search page and create a new empty deck with it as Commander
- Add animations for when a card is selected or moved
- Limit the cards a user may add to the deck based on Commander format rules
  - A deck may only have one of each card except for basic lands (there are a few exceptions)
  - A deck may only contain cards matching its Commander's color identity

- Card page stretch features
  - If a card is in one or more decks, those decks are listed from the card's show page
  - If there are multiple printings of a card from different sets they are accessible from this page.
  - A card from a particular set may be added to a deck. Cards may be reprinted with different art or text depending on set, but functionally they are the same.

- Deck page stretch features
  - Animate the drawing of a sample hand for a deck
  - A user may sort or filter listed cards by:
    - Name
    - Converted Mana Cost
    - Card type


### Gold
- Include market price data from tcgplayer.com, this may be displayed on search, card show, and deck show pages. (requires approval for API key)
- Allow user to mulligan their sample hand. (Select multiple cards to discard then draw that many minus 1. May be repeated multiple times)
- Allow user to export decklist to file or email
- Allow user to import decklist from file
- A user may specify up to 15 cards in a deck to be part of a sideboard that is not part of the normal 99 card deck


## ERD

## Wireframes
### Account page

### Collection page

### Card search page

### Individual show page

### Deck show page



## Technology
- Express back-end
- React front-end
- PostGres Database


### Links/Documentation
- [Project 4](https://git.generalassemb.ly/jd-seir-4/project-4)
- [MTG Card API](https://docs.magicthegathering.io/)
- [Card API JavaScript SDK](https://github.com/MagicTheGathering/mtg-sdk-javascript)
- [React/Express App Tutorial](https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/)
