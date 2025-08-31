# Mafia Game

## **Link** - [Mafia Game](https://mafia-game-murex.vercel.app/)

This is a lightweight web-based **Mafia game**, built with **Svelte v4**, created for the sole purpose of having fun with friends. It allows you to recreate the classic party game, remember the rules, and laugh at some custom characters.

## Purpose

The project was made to enjoy the Mafia game in a digital format with friends. It provides a simple interface where each participant draws a card with their role, and the next player continues until the game setup is complete.

## Language

Currently, the game is available only in **Ukrainian**.

## Features

- Automatic game generation with random role assignment.
- Each participant sees their role card before passing to the next.
- Rules and detailed descriptions of all characters, including special ones like the **Lawyer**.
- Each character comes with an image to add a humorous touch.
- Supports up to **21 players**.
- Easy customization by editing a single data file.

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `yarn install`.
4. Start the development server using `yarn dev`.

Then open `http://localhost:5173` in your browser.

> Requirements: Node.js and Yarn installed on your system.

## Customization

You can modify the roles, descriptions, and images to fit your group by editing:

```
src/lib/data.js
```

No other configuration is needed.

## License

This is a hobby project. Feel free to fork, modify, and adapt it for your own use.

---

Have fun and enjoy the game with your friends!
