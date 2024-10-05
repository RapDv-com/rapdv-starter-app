# RapDv - Starter App

The easiest way to start a new web app that uses [RapDv - Rapid Development Framework](https://rapdv.com).

## Demo
[https://starter.rapdv.com](https://starter.rapdv.com)  
  
## Before running it
- Install RapDv submodule: `git submodule update --init --recursive`.
- Install all dependencies: `npm install`  
- Start MongoDB
- Copy `.env.example` to `.env`, and set correct values in `.env files`

## Run application in development
`npm start`

## Run application in production
`npm run start-prod`

## Application structure
- Back-end code is in `server` folder
- Front-end code is in `client` folder. After modifying client code, you need to run `npm run build-prod` to rebuild it.
