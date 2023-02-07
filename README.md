# Cheat/Sheet

This is a full stack application powered by React, Node, Express and MongoDB that allows authenticated users to create cocktail information cards, and add to a database. Users can query said database for other user’s cocktails and add reviews, ratings and favourites.

> You can check out a live demo [here](https://cheat-sheet-app.vercel.app/)

> The back end code can be found [here](https://github.com/neilmbarry/CheatSheet-API)

![Add Cocktail Preview](https://i.imgur.com/zFCtBpf.png)

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Code Structure](#code-structure)
- [Setup](#setup)
- [Contact](#contact)

---

## Features

- Add, modify, delete cocktail recipe cards to/from online database
- Search database for cocktails and sort by name, rating etc.
- Rate and review cocktails
- Store favourites

---

## Screenshots

![Recipe Card](https://i.imgur.com/2YjeD1M.png)

![Search Database](https://i.imgur.com/VZl2W0M.png)

---

## Technologies Used

- React
- Redux
- reduxjs/toolkit
- Framer-motion
- CSS Modules

## Code structure

On the front end is a react application that implements Redux for state management, custom hooks for fetching data and CSS modules for styling. It has various routes to navigate through the application some of which are protected to allow only authenticated users access.

A react component
![Example screenshot](https://i.imgur.com/6LzFOps.png)
A custom hook
![Example screenshot](https://i.imgur.com/DKsAUjJ.png)

---

## Setup

- Clone repository to your local device
- Navigate to the ship-head folder
- Run `npm install` to install all the dependencies
- Run `npm start` to start the React project, this will open in a new browser window.

---

## Contact

Created by [@neilbarry](https://www.neilbarry.com/) - feel free to contact me!
