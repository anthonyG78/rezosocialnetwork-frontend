# Contributing

If you would like to contribute code to this repository you must do so through GitHub by sending a pull request.
Github label are used (*#needReview*, *#awaitingQA*, ...) to quickly identify the nature of a PR.

Each pull request is associated to an item in the project's [issue tracker](https://genymobile.atlassian.net/secure/RapidBoard.jspa?rapidView=40).
Here are the rules you must follow when contributing. 

## Branching convention

Naming pattern: `<type>/<issue>-<description>`

* **type**: Information about the nature of the PR, determine which step of the workflow will be applied.
  * *'dev'*: A specific task inside a user story. The PR target the integration branch. (review step)
  * *'integration'*: Represent a user story, aggregate multiple dev branches (QA step).
  * *'hotfix'*: for quick and urgent fixes (require review + QA). 
* **issue**: issue tracker item id.
* **description**: short description of what the PR is about. 

Task lifecycle:
```
master <- integration/xxx <- dev/yyy 
```

> The integration branch should be created when the first task is started

Naming ex:
```
integration/CLOUD-1562-device-crash-resilience
dev/CLOUD-2618-restart-player-boot-timeout
...
```

See more information [here](https://docs.google.com/a/genymobile.com/document/d/1K4mtVJOGhjHvXnbscRrt7Pv3BgjicUWZQC_Nhsrk9Ks/edit?usp=sharing).

## Pull Request Process

##### Reference

| Type            | base            | Naming                                | Label                      |
| --------------- | --------------- | ------------------------------------- | -------------------------- |
| **dev**         | integration/xxx | `[<taskId>] <description>`            | *#needReview*              |
| **integration** | master          | `[INTEGRATION][<USId>] <description>` | *#integration #awaitingQA* |
| **hotfix**      | master          | `[HOTFIX][<taskId>] <description>`    | *#needReview #awaitingQA*  |

> *#awaitingQA* label on `integration` branch is added when the US is done (all the dev branch are merged)

##### Requirements 

* Update the README.md if necessary, including any new environment variables, ansible config template or any useful informations.
* Tests are passing localy.
* [Test plans](https://hiptest.net/app/) are updated if necessary.

##### Process

1. Make sure the requirements are ok.
2. Open the PR, set the name & label it according to the [convention](https://docs.google.com/a/genymobile.com/document/d/1K4mtVJOGhjHvXnbscRrt7Pv3BgjicUWZQC_Nhsrk9Ks/edit?usp=sharing).
3. [optional] Post the PR on slack to get quick review.


## Release

A releases is a git tag created from `master`. The git `master` branch represents the "production ready" source code. As soon as something is merged into `master`, the release process should start (not automaticaly triggered until we deal with eventual dependency). 
See the [release documentation](https://wiki.genymobile.com/index.php5/Production_release_process) for more information.

