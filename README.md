# deno fresh project

![deno test main](https://github.com/IshiKakesuFun/XtendIS3/actions/workflows/deno_test_main.yml/badge.svg)
![deno test develop](https://github.com/IshiKakesuFun/XtendIS3/actions/workflows/deno_test_develop.yml/badge.svg)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/IshiKakesuFun/XtendIS3?sort=semver)

## Prerequisites

- [x] Install Deno CLI [https://deno.land](https://deno.land)
- [x] Install [Docker](https://www.docker.com/) for DB (optional)

## Deno fresh boilerplate

- [x] Creater [GitHub](https://www.github.com/) repository using a
      [Deno](https://deno.land/) template on [Gitpod](https://www.gitpod.io/).

  Deno template configured for ephemeral development environments on Gitpod.

- [x] Clone repository and bootstrap new project using **deno-fresh** framework
      [https://fresh.deno.dev](https://fresh.deno.dev)

  ```
  deno run -A -r https://fresh.deno.dev ./
  ```

- [x] Extend VSCode recommended extensions and settings
  ```json
  .vscode/extensions.json:
  {
      "recommendations": [
          ...
          "vscodevim.vim",
          "ms-azuretools.vscode-docker"
      ]
  }

  .vscode/settings.json:
  {
      "deno.enable": true,
      "deno.lint": true,
      "deno.unstable": true,
      "editor.defaultFormatter": "denoland.vscode-deno",
      "editor.suggest.showStatusBar": true,
      "editor.quickSuggestions": {
        "strings": true
      },
      "[dockercompose]": {
        "editor.defaultFormatter": "ms-azuretools.vscode-docker"
      }
  }
  ```
- [x] Change default gitpod task command to deno-fresh server and add
      recommended extensions
  ```yml
  .gitpod.yml:
  ...
  tasks:
    - command: |
        deno task start
        # deno run --allow-net --unstable webserver.ts
  ...
  vscode:
    extensions:
      - "denoland.vscode-deno"
      - "vscodevim.vim"
      - "ms-azuretools.vscode-docker"
      #- "sastan.twind-intellisense"
  ...
  ```

- [x] Create `.gitignore` file
  ```
  .env
  ```

### Environment variables

- [x] Add `--allow-env` to _start task_ in `deno.json`
- [x] Crete environment files
  - [x] `.env`
  - [x] `.env.defaults`
  - [x] `.env.example`
- [x] Create `config.ts` for loading environment variables using
      [dotenv](https://deno.land/std/dotenv) standard library

### Database

- [x] Extend `Config` interface and environment variables for _postgres SQL_ db driver
- [x] Create `db.ts` using [postgres](https://deno.land/x/posgres) library
- [x] Prepare `docker-compose.yml` for used db server
- [x] Add `/db-data` directory to `.gitignore`
- [x] Add test case to `db.ts`

## Next Steps

- [ ] Project versioning system?
  

## Gitpod workspace

Click the button below to start a new development environment:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)
