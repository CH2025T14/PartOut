# [PartOut](https://partoutwebapp.web.app/)

> [CalvinHacks 2025](https://devpost.com/software/partout)

#### Jason Chew, Daniel Kwon, Daniel Kim

---

## Inspiration

Many adult fans of LEGO regret dismantling their sets as children. Unfortunately, reassembling those sets is difficult without the ability to track parts that still need to be found. This app helps remedy that issue.

## What it does

Given a set number, the app creates a checklist of part images. The user can increment and decrement their count. Maxxed-out parts are automatically moved to a "completed" section. The app can save multiple checklists to local storage and encode the checklist data in a portable URL for backup and sharing.

## How we built it

The app only relies on local storage and base-36 encoding to store data, eliminating the need for a database. The app is hosted on Google Firebase. The frontend was built in React+Vite+TypeScript. Part and set data is sourced from the Rebrickable API.

## Challenges we ran into

- State management
- Encoding part count data for LocalStorage and sharing
- Correctly interpreting information from the Rebrickable API

## Accomplishments that we're proud of

- Portability of data between device or user
- 100% local storage, eliminating online privacy issues

## What we learned

- Using React and Vite together
- It's important to plan out the structure of an app's variables, interfaces, and relationships prior to implementing state management.
- URL manipulation/navigation in React
- Base36 encoding

## What's next for PartOut

- Refactoring state management and data formatting
- Improving aesthetic consistency
- Gracefully handling duplicate set entries with user prompts
- Potentially, AI auto-identification of parts
- Optimizing page rendering and state management for sets with an extremely large number of unique parts
