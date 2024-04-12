# App Terremoto

## This app was developed and tested with the following:

-   Node.js v20.11.0.
-   npm 10.4.0.
-   ruby 3.2.3
-   Rails 7.1.3.2

### Prerequisites

#### Windows Instructions

-   Install Node and npm: [link](https://nodejs.org/en)
-   Install ruby 3.2.3: [link](https://rubyinstaller.org/downloads/)

#### Linux Instructions

-   Install nvm:
    [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
    -   curl command:
        `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`
-   Install node and npm: `nvm install 20`
-   Install RVM(Ruby Version Manager): [link](https://rvm.io/rvm/install)
    -   Install ruby version 3.2.3 with rvm : `rvm install 3.2.3`
    -   Set ruby version: `rvm use 3.2.3 --default`

### How to start

-   Start terminal in /backend folder, run 'bundle install' to install dependencies.
-   Run 'rails fetch_data' to populate the local db.
-   Run 'rails s' to start the backend server.
-   Start terminal in /frontend folder, run 'npm i' to install dependencies
-   Run 'npm run dev' to start vite.
-   open the vite app in the browser - [vite app](http://localhost:5173/).
