![Splash Image](https://res.cloudinary.com/mrtommyliang/image/upload/v1612532016/bg_i8kjuw.png)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/oslabs-beta/LucidQL/blob/master/LICENSE) ![GitHub package.json version](https://img.shields.io/github/package-json/v/oslabs-beta/LucidQL?color=blue) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/oslabs-beta/LucidQL/issues)

# DraQLa 

DraQLA is a GraphQL migration assistance tool that empowers developers to build GraphQL schemas by introspecting existing PostGreSQL databases, all without writing any code. 


<!-- REST has been the dominant API style for building backends for a long time but it iss notorious for its waterfall requests. Problems include over fetching and multiple requests for multiple resources which is why GraphQL has been gaining so much momentum over the years. GraphQL is a query language that allows you to ask for what you want in a single query which saves bandwidth by specifying the exact types and fields and reduces waterfall requests. Despite GraphQL’s attractive query flexibility, companies have trouble migrating from their legacy REST API framework to GraphQL as it is time-consuming to learn a new language and can require extensive overhead, all with the risk of potentially  -->


Accelerated by [OS Labs](https://github.com/oslabs-beta/)

## Getting Started
Visit ..site.. to sink your teeth into the tool. 

## Features
* Exportable custom GraphQL schema (including resolvers, and mutations) 
* Visual interactive diagram of current PostgreSQL database
* Advice Console that provides high level breakdown of the generated boilerplate
* Temporary dummy server and sample query/mutation to test the personalized schema with GraphQL's Playground GUI
<!-- mention how our app is surface level. doesn't penetrate through and tap into real data-->
<!-- all while mainintaing your database's privacy? -->

## How does DraQLa work? 
First, start by importing the desired PostgreSQL database that you want to convert into a GraphQL API and enter the URI as prompted. (If you don't have one, feel free to test with our Sample Database!) 

DraQLa will immediately start by extracting all of your database's tables and relationships, and will generate compatible GraphQL schemas, which consists of types and their corresponding resolvers.
<!-- image here -->

DraQLa also features a user friendly visual representation that depicts the parts of your database that can now be queried and manipulated via GraphQL. 
<!-- image here -->

The Advice Console provides an overview on:
* GraphQL 
* how you and your clients can access and manipulate your database
* a sample query and mutation 

In addition to your new schema, DraQLa spins up a temporary GraphQL server to allow you to test out the sample query via GraphQL's Playground.

When you're ready to adopt your schema, click "Export" to receieve the code and further integration instructions.

## Contributors
* [Daniel Dolich](https://github.com/danieldolich)
* [Emily Krebs](https://github.com/emilykrebs)
* [Heidi Kim](https://github.com/heidiyoora)
* [Ross Sarcona](https://github.com/RossRSarc)
* [Tommy Liang](https://github.com/mrtommyliang)

## License
This project is licensed under the MIT License