# NodeJS Remix

Build Highly Scalable Backend with Zero Setup on NodeJS.

#### Typescript | Express | TypeORM | JWT | TypeDI | mySQL | Mongoose | Postgres | SocketIO | Winston

\
It all started as a problem, choosing a good architecture is a real pain and to make matter worse we have multiple options to choose from, There are around hundreds or thousands of boilerplates which are widely available and each follows a different pattern, so we have been researching and coming up with highly scalable architecture with best practices by both experience & by hands-on with top frameworks and also maintaining a good generic coding practice such as DRY, KISS, S.O.L.I.D to come up with something simple, clean framework and with support for essential stuff like User Management, Access Roles, Reset Passwords, OTP Verification, Payment Integration so that people can give priority on their use cases & problem-solving.

The goal is to make the developer's life easier so that they can focus more on centering a div. (CSS)

## Features

- Easy to Start
- Highly Scalable
- Supports all types of modern databases (TypeORM)
- Built using Typescript
- SSL / HTTPS

## Follows Best Practices

- 3 Layers Architecture - Routes/Controllers, Services & Repository (Data Layer)
- Clean Project Folder Structure
- Publisher Subscriber Models (Work in Progress)
- Clean Code & Easy Readability
- Write Asynchronous Code
- Configuration files and Environment Variables
- Logging & Error Handling
- Dependency Injection
- Unit Testing (Work In Progress)

## Tech

NodeJS Remix uses a number of open source projects to work properly.

- Typescript
- Express
- NodeJS
- dotEnv
- CORS
- Joi
- JWT
- mySQL
- TypeORM
- TypeDI
- SocketIO
- Winston

### Modules

- Twilio

## Installation

NodeJS Remix requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```
yarn
cp .example_env .env
yarn start
```

**Note: Update Environement Variables after creating .env to avoid Db Connection Error.**

---

#### Building for source

For production release:

```
yarn build
```

## Roadmap

- [x] Phone Number Verification
- [ ] Email Verification
- [ ] JWT Refresh Token Support
- [ ] Unit Testing (Test Cases)
- [ ] Publish / Subscribe using Event Emitters
- [ ] Social Logins (Google, Facebook, Apple - Sign In)
- [ ] Third Party Service Integration (Twilio, SendGrid, Slack) + Payment Integration
- [ ] Email / SMS Templates
- [ ] CRON Job Scheduling

## Notes

- Version - 0.0.1
- Check the Commits for the ChangeLog

## Development

Want to contribute? Great!
Feel free to raise bugs & PRs.

## License

MIT

## Credits

- https://github.com/V3N0ME/Node-Boilerplate
- https://github.com/strapi/strapi
- https://github.com/afteracademy/nodejs-backend-architecture-typescript/
- https://github.com/aaron5670/ExpressJS-SocketIO-Boilerplate
- https://scoutapm.com/blog/nodejs-architecture-and-12-best-practices-for-nodejs-development
- https://dev.to/arjhun777/video-chatting-and-screen-sharing-with-react-node-webrtc-peerjs-18fg
- https://github.com/Maheshkumar-Kakade/otp-generator#readme
- https://github.com/hagopj13/node-express-boilerplate/
