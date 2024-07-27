#!/bin/bash

cd nestjs-wallet
yarn start:dev &

cd ../react-wallet
yarn start &

wait