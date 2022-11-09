#Pod API Key Example

This repository contains an example for setting up and using an API key with the Pod API.

##Prerequisites

To use this example you need an API key. If you haven't set one up yet, request one by sending 
the POD team the following information:

* A public key from a public/private key pair that will be used to create and verify API login requests
* The contract the API key should be attached to

```shell
# Example private/public key generation
# Generate private key
openssl genrsa -out private.pem 2048
# Extract public key from it
openssl rsa -in private.pem -pubout > public.pem
```

##Setup

First create a .env file with the following variables:

```dotenv
API_KEY=EnterYourPodApiKeyHere
API_URL=https://api.pod.annafreud.org
CONTRACT_ID=EnterYourContractIdHere
```

Then install the project dependencies:

```shell
npm install
```

##Run

Run the `authenticate.js` example file to see how the API key is used together with the private key to 
authenticate into the Pod API.

```shell
node authenticate.js
```
