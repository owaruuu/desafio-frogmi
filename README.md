# App Terremoto

## This app was developed and tested with the following:

-   Node.js v20.11.0.
-   npm 10.4.0.
-   ruby 3.2.3
-   Rails 7.1.3.2

### Prerequisites

#### Instructions

-   Install nvm:
    [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
    -   curl command:
        `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`
-   Install node and npm: `nvm install 20`
-   Install Ruby [link](https://www.ruby-lang.org/en/documentation/installation/)
-   Install SQLite3 [link](https://www.sqlite.org/download.html)
-   Install Rails: [link](https://guides.rubyonrails.org/getting_started.html)

### How to start

-   Start terminal in /backend folder, run 'ruby bundle' to install dependencies.
-   Run 'rails fetch_data' to populate the local db.
-   Run 'rails s' to start the backend server.
-   Start terminal in /frontend folder, run 'npm i' to install dependencies
-   Run 'npm run dev' to start vite.
-   open the vite app in the browser - [vite app](http://localhost:5173/).
