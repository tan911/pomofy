# POMOFY: Pomodoro Tool

Welcome to Pomofy, an app designed to enhance your task management experience with the power of Pomodoro Technique! Stay focused and boost productivity with this simple and appealing tool.

## Features

-   ⌛ **Pomodoro Timer**: Utilize the proven Pomodoro Technique to manage your work sessions effectively.
-   🧾 **Task Management**: Organize your tasks efficiently to maximize productivity.
-   📱 **User-Friendly Interface**: Enjoy a simple and intuitive design for seamless navigation and usage.
-   🔒 **User Authentication**: Safeguard your account and data with secure user authentication.

## Development Setup

Go to this [guide](https://github.com/tan911/pomofy/wiki) and follow the step (1-2).
After cloning the repo, you can follow this commands:

```console
	// change directory
	your@pc:~$ cd pomofy

	// install necessary dependencies
	your@pc:~$ pnpm install

	// NOTE: before running the app
	// make sure you already set up your postgreSQL and pgAdmin database.
	// If not, you can watch this tutorial on youtube on how to install postgreSQL and pgAdmin to your machine.
	// - https://www.youtube.com/watch?v=uN0AfifH1TA
	your@pc:~$ pnpm run dev:all
```

## Tech stack

-   Nextjs
-   Express
-   Tailwindcss
-   postgreSQL ([NEON](https://neon.tech/))
-   Prisma
