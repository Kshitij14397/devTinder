# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:toUserId
- POST /request/send/ignored/:toUserId

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected