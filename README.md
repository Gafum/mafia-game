# Mafia Game

## Link - [Mafia Game](https://mafia-game-murex.vercel.app/)

This is a lightweight web-based **Mafia game**, built with Svelte v4, created for the sole purpose of having fun with friends. It allows you to recreate the classic party game, remember the rules, and laugh at some custom characters.

## Purpose

The project was made to enjoy the Mafia game in a digital format with friends. It provides a simple interface where each participant draws a card with their role, and the next player continues until the game setup is complete.

## Language

Currently, the game is available only in **Ukrainian**.

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `yarn install`.
4. Start the development server using `yarn dev`.

Then open `http://localhost:5173` in your browser.

> Requirements: Node.js and Yarn installed on your system.

## Tech Stack

- Frontend: Vite, Svelte v4 / SvelteKit, Vanilla CSS, Lucide Svelte.
- Backend: Node.js (SvelteKit server routes for file handling).
- Storage: Local JSON configurations and local device storage.

## Project Structure and Pages

The application is fully optimized for mobile screens, allowing a company of friends to pass a single smartphone around in a circle during the setup phase, keeping their drawn roles completely secret.

- Play Screen: The primary pre-game screen where players take turns opening their digital cards to secretly discover their assigned role, its description, and artwork. An information button on the card reveals the specific goals of that character.
- Settings: A dedicated configuration page to adjust player counts. Users can set the exact number of townspeople and mafia members, as well as toggle optional special roles such as the Sheriff, Doctor, or others. All configurations save automatically for the next matches.
- Rules and Characters: A section to read classic game rules and browse all integrated roles. Tapping a character card flips it to show their abilities and objectives, while subsequent taps cycle through different image variations of the same role. Standard cards are displayed first, followed by custom creations.
- Host Dashboard: A complete workspace for the game master to run matches smoothly. It lists all active characters, allows the host to take notes, change card order, edit the live lineup, and mark eliminated players. The panel automatically generates night-phase prompts, showing exactly who to wake up and in what order. It also includes an experimental mode to manually alter role distributions and create custom chaotic scenarios.
- Custom Cards: An interface where players can expand the default deck by creating entirely new cards. Users can enter a custom role name, write a humorous description, assign a base faction, and upload a custom image from their device gallery. These cards are saved locally within the browser.

## Local Admin Panel

When running the project locally, you can access a built-in Admin Dashboard in the custom cards page: `/custom-cards`.

Unlike the standard setup that only saves changes inside your current browser session, this dashboard permanently overwrites the project's master JSON files on your disk. This panel allows the project owner to modify the master data structures globally and permanently sync them directly with the project codebase. It provides a simple way to configure the game data without touching the code:

- Manage Roles: Easily create new character roles or modify existing ones. The system automatically handles validation to keep your data stable.
- Upload Card Assets: Directly upload PNG images for characters. The panel takes care of background asset naming and automatically deletes old, unused images from your physical folders to keep the repository light.
- Custom Sorting and Order: You don't have to worry about manual file ordering. The panel automatically reorders and groups all game cards to match the exact sequence of your main role configuration, keeping the files beautifully structured and easy to read.

## Customization

The game logic is entirely data-driven. You can configure roles, rules, limits, and images by using the local Admin Constructor or by manually editing the JSON files located in the `src/lib/data/` directory. No external database or complex backend setup is required.

### Saving Changes (For Developers)

After using the Admin Panel to update your roles, configurations, or images, the changes are saved directly to your local project files. To commit these updates and push them to your GitHub repository, simply run:

```bash
git add .
git commit -m "new role/card - CardName"
git push
```

## License

This is an open-source hobby project. Feel free to fork, modify, and adapt it for your own use.

Have fun and enjoy the game with your friends!
