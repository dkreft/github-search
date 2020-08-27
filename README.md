# github-search

This is a technical interview homework problem given by MasterCard.

## Assignment

Write a small web app that consumes the GitHub repositories API and displays a searchable filtered list on the screen.
The task is to display the repositories and allow the user to filter through the repositories. Use the [GitHub V4 API](https://developer.github.com/v4/) to fetch repositories per user.

### For example

Imagine you have a simple UI with a search field and a list that is rendered below the search field. When you type in a given users name, you will get a list of repositories that may match the search query.

You can structure the UI any way you want. Bonus points will be given for use of custom CSS which gives us insight to your CSS skills athe addition of dark mode would also be a nice indication of the above).

### IMPORTANT

* This exercise is a take-home assignment.
* You can use your framework (or lack thereof) of choice however, React or Vue would be ideal as we use Vue.js for many Mastercard products.
* Use Github as a repository for your solution. The completed assignment
should be emailed back to myself in the form of the GitHub URL.
* This challenge needs to be completed within 1-3 days from the Date/Time of your first commit.
* Impress us with:
    * A well-documented project that utilizes front end best practices.
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
* NextJS aReact)
* `eslint`
* `jest`
* `enzyme`
* `sass`
* CSS modules - every component that needs styling has its own `styles.module.sass` file living right next to the owning component. This makes CSS maintenance and management trivial.

## About the Directory Structure

This application is structured using a modular hierarchy, which focuses on where components are used, rather than on the type of files they are. This makes it trivially easy to determine the scope of use of any given file.

Please read https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1 for more information on how this works.

## Author

Dan Kreft &lt;dan@kreft.net&gt;
