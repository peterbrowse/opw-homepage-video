# opw-homepage-video

This is the web worker for the [One Pixel Wide](http://www.onepixelwide.co.uk/) homepage interactive music video.

It uses spotify web api audio previews and echonest data to sync gifs to any song on spotify.

## Tasks
- [	] Add in auth flow for spotify authorization code
- [ ] Add in Spotify track request search call and return handler
- [ ] Add in track selection call handler
- [ ] Add in Echonest track details request handler
- [ ] Add in function that calculates bpm to fps
- [ ] Add in final object builder, which returns all the information required for the video to play and sync up animations etc.
- [ ] Add cron job from standalone OPW server to ping this work every few hours