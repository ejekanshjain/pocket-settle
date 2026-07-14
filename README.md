# Pocket Settle

Pocket Settle is a mobile expense-sharing prototype for creating groups, tracking shared expenses, and recording transfers between members.

## Features

- Firebase-backed sign-in and user profiles
- Create groups and add members
- Track expenses and settlement transfers
- Subscribe to group, member, expense, and transfer changes in real time
- Expo Router navigation with dedicated auth, loading, profile, and main app flows
- Local session persistence

## Stack

- Expo and React Native
- TypeScript and Expo Router
- Firebase Authentication and Firestore
- React Native Paper
- Zod

## Local development

    npm install
    cp .env.example .env
    npm start

Then launch the app with Expo Go or a local Android/iOS simulator. Configure the Firebase project values listed in .env.example.

## Status

This repository is an early mobile prototype. The core group and real-time data foundations are present; production use would require completed settlement logic, security-rule review, validation, and automated tests.
