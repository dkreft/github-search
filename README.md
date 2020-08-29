# github-search

This is a technical interview homework problem given by MasterCard—a single-page application that prompts the user to sign-in via GitHub OAuth, and once authenticated, provides a simple input that takes a GitHub username. If the entered username is valid, that user's avatar, name, and a paginated list of repsitories will be displayed.

## Assignment

Write a small web app that consumes the GitHub repositories API and displays a searchable filtered list on the screen.

The task is to display the repositories and allow the user to filter through the repositories. Use the [GitHub V4 API](https://developer.github.com/v4/) to fetch repositories per user.

### For example

Imagine you have a simple UI with a search field and a list that is rendered below the search field. When you type in a given user's name, you will get a list of repositories that may match the search query.

You can structure the UI any way you want. Bonus points will be given for use of custom CSS which gives us insight to your CSS skills (the addition of dark mode would also be a nice indication of the above).

### IMPORTANT

* This exercise is a take-home assignment.
* You can use your framework (or lack thereof) of choice however, React or Vue would be ideal as we use Vue.js for many Mastercard products.
* Use Github as a repository for your solution. The completed assignment
should be emailed back to myself in the form of the GitHub URL.
* This challenge needs to be completed within 1-3 days from the Date/Time of your first commit.
* Impress us with:
    * A well-documented project that utilizes front-end best practices.
    * Well-written unit tests (which need to pass) & comprehensive test coverage.
    * Display your architectural knowledge by structuring your code the way you would if you were writing it for your current job
    * Bonus points for:
        * Cypress integration tests, and
        * Multiple language support

Create a user signup form prototype. Preference is for the code to be done using ReactJS, but you can also feel free to use vanilla JS. TST is currently utilizing reactjs v16.8 for development.

## Installation

    $ git clone <repo url>
    $ npm install

## Usage

### Start a development server

    $ npm run dev

### Watch unit tests

    $ npm run test

### Code coverage

    $ npm run test:coverage

### Linting

    $ npm run lint

    $ npm run lint:fix

### Build

    $ npm run build

## Technologies &amp; Tools Used

* ES6+
* NextJS (React with server-side rendering)
* Apollo (GraphQL client)
* `eslint`
* `jest`
* `enzyme`
* `sass`
* CSS modules - every component that needs styling has its own `styles.module.sass` file living right next to the owning component. This makes CSS maintenance and management trivial.

## About the Directory Structure

This application is structured using a modular hierarchy, which focuses on where components are used, rather than on the type of files they are. This makes it trivially easy to determine the scope of use of any given file.

Please read [https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1) for more information on how this works.

## Notes

* In general, I found the instructions (see [Assignment](#Assignment)) to be somewhat unclear and poorly-organized. I sought clarification from the recruiter, but he seemed unwilling to relay my questions to you, so I did what I could. Points of confusion include:
    1. "The task is to display the repositories and allow the user to filter through the repositories."
        * What does it mean to "filter through the repositories"? Does this mean adding a second input to actually do filtering? Or does this imprecise language that means "read through"?
    2. "...you will get a list of repositories that may match the search query."
        * **may** match? I would hope that if GitHub's APIs are working correctly, the results absolutely **will** match the search query.
* I opted for "KISS" over fancy features, mostly because of time constraints. I feel that what I've presented here should demonstratte my attention to detail and good architectural decision-making. So you will not find:
    * "dark mode" or other CSS shenanigans
    * i18n support
* I opted not to implement Cypress tests, again, because of time considerations.
* I chose to use NextJS primarily because the `next-auth` package makes integration with third-party OAuth services (e.g. GitHub) easy, and it handles all of the messy login stuff. Since the apparent goal of this project was to create a simple GitHub search page (and not to demonstrate proficiency in setting up OAuth), this seemed a reasonable choice. For this reason, and again out of time considerations, I also opted not to style the login page.
* This was my very first use of GraphQL, and I'm sure it shows. I'm not super-thrilled with how I've used Apollo...it seems a bit messy and difficult to unit test `gql()`, and the pagination-handling code feels quite...involved. I suspect that as I gain experience with the library, cleaner solutions will present themselves, but again, time is a terrible master.

## Author

Dan Kreft &lt;dan@kreft.net&gt;
