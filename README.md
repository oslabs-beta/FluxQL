![Splash Image](./client/assets/splashgif.gif) <br>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/oslabs-beta/DraQLa/blob/main/LICENSE) ![GitHub package.json version](https://img.shields.io/badge/version-v1.0.0-blue) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/oslabs-beta/DraQLa/issues) ![Stars](https://img.shields.io/github/stars/oslabs-beta/DraQLa?color=red)

# DraQLa 

DraQLa is a GraphQL migration assistance tool that empowers developers to build GraphQL schemas by introspecting existing PostGreSQL databases, all without writing any code. 


Accelerated by [OS Labs](https://github.com/oslabs-beta/)

## Getting Started
Visit [draqlabs.io](https://draqlabs.io) to sink your teeth into the tool. 

## Features
* Exportable custom GraphQL schema (including resolvers and mutations) 
* Visual interactive diagram of current PostgreSQL database
* Advice Console that provides high level breakdown of the generated boilerplate
* Temporary dummy server and sample query/mutation to test the personalized schema with GraphQL's Playground GUI
* Encrypted URI on client and server side to keep your data private

## How does DraQLa work? 
First, you enter the database URI that you want to convert into a GraphQL API. Then, DraQLa encrypts your URI to ensure your privacy. Or feel free to test with our Sample Database!<br>

DraQLa will immediately start by extracting all of your database's tables and relationships, and will generate compatible GraphQL schemas, which consists of types and their corresponding resolvers. <br><br>
![graph](./client/assets/modal.gif)

<br>
DraQLa also features a user friendly visual representation that depicts the parts of your database that can now be queried and manipulated via GraphQL. <br><br>

![graphgif](./client/assets/graphgif.gif)

The Advice Console provides an overview on:
  * GraphQL 
  * how you and your clients can access and manipulate your database
  * a sample query and mutation <br><br>
![advice.gif](./client/assets/advice.gif) 

<br>
In addition to your new schema, DraQLa spins up a temporary GraphQL server to allow you to test out the sample query via GraphQL's Playground. <br><br>

![playground.gif](./client/assets/playground.gif)

<br>
When you're ready to adopt your schema, click "Export" to receive the code and further integration instructions.
<br><br>

## How To Contribute
We would love for you to test our application and submit any issues you encouter. Please feel free to fork your own repository and submit your own pull requests.

Things you can do to contribute: 
* Bug fixes
* Implementing features
* Submitting or resolving GitHub issues
* Help market our application
<br><br>
## Developers
Daniel Dolich || [LinkedIn](https://www.linkedin.com/in/danieldolich/) | [GitHub](https://github.com/danieldolich)

Emily Krebs || [LinkedIn](https://www.linkedin.com/in/emilyrkrebs/) | [GitHub](https://github.com/emilykrebs)

Heidi Kim || [LinkedIn](https://www.linkedin.com/in/heidiykim/) | [GitHub](https://github.com/heidiyoora)

Ross Sarcona || [Linkedin](https://www.linkedin.com/in/rosssarcona/) | [GitHub](https://github.com/RossRSarc)

Tommy Liang || [LinkedIn](https://www.linkedin.com/in/mrtommyliang/) | [GitHub](https://github.com/mrtommyliang)


## License
This project is licensed under the [MIT License](https://github.com/oslabs-beta/DraQLa/blob/main/LICENSE)