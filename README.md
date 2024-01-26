[![CI](https://github.com/bihealth/reev-frontend-lib/actions/workflows/main.yml/badge.svg)](https://github.com/bihealth/reev-frontend-lib/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/bihealth/reev-frontend-lib/graph/badge.svg?token=Cu4ym12yM0)](https://codecov.io/gh/bihealth/reev-frontend-lib)
[![Documentation Status](https://readthedocs.org/projects/reev/badge/?version=latest)](https://reev.readthedocs.io/en/latest/?badge=latest)

# REEV Frontend Reuseable Components

Refactored reuseable components for REEV.

This README file describes how to setup your dev environment for this library.
For everything else, see the [REEV Project](https://github.com/bihealth/reev).

## Setup

```
git clone git@github.com:bihealth/reev-frontend-lib.git
cd reev-frontend-lib
npm ci
make serve
# hack away!
```

## Generating TS for Protobuf

Fetch protobuf files from main, and re-generate the TS files, and format them.

```
make proto
```
