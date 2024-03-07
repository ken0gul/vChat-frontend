# Video Chat Application

This is a video chat application built using React, integrating various dependencies to enable real-time communication between users through peer-to-peer connections.

## Features

- **Real-time Video Chat**: Allows users to initiate video calls and communicate in real-time.
- **PeerJS Integration**: Utilizes PeerJS for establishing peer-to-peer connections between users.
- **Socket.IO Client**: Integrates Socket.IO Client for signaling and facilitating communication between peers.
- **React Copy to Clipboard**: Provides functionality to copy call links to the clipboard, making it easy to share call invitations.
- **Simple-Peer**: Utilizes Simple-Peer for handling WebRTC connections and enabling video streaming between participants.
- **WebRTC in Backend**: Backend implementation utilizes WebRTC for handling real-time communication and signaling between peers.

## Dependencies

- [PeerJS](https://peerjs.com/)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [Simple-Peer](https://github.com/feross/simple-peer)
- [React Copy to Clipboard](https://github.com/nkbt/react-copy-to-clipboard)

## Prerequisites

Before running this project locally, ensure you have the following:

- Node.js
- npm (Node Package Manager)

## Usage

  Upon accessing the application, users can initiate video calls by providing a unique call link to other participants.
  Participants can join video calls by clicking on the provided call links and granting access to their camera and microphone.
  During a call, users can communicate via real-time video streaming and have the option to copy the call link to the clipboard for sharing.
