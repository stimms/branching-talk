# Development Fundamentals

!

# Source Control and Branching

!

## Level Set

 - Who is using source control?
 - Which source control solutions are you using?

!

## Popular responses

- Git
- Subversion
- TFS (in some communities)
- None

!

## Other options

- bazzar
- Perforce
- Mercurial
- Visual Source Safe
- Accurev
- Vault
- ClearCase
- CVS (hello, OpenBSD)
- and on and on and on

!

## Why are we using source control?

- Provides history
- Auditable
- Sharable (it's a word)
- Allows for developers to work on multiple things at once

!

## Classifying source control systems

- By locking model
- By centralization
- By the usual criteria: operating system support, UI, transport protocol

!

## Branches

- The mechanism through which isolation is provided
- Introduces a divergence in the source

!

## The mechanism of branching

- Inter-File branching (Perforce, Subversion, VSS)
- Single Directory branching (git, mercurial)
- ClearCase (ClearCase, nobody else)

!

## Merging

- Opposite of a branch
- Recombines the contents of a branch with its parent
- Merge vs rebase

!

## Local and remote branches

- DVCS
- Cheap!

!

## Picking the right branching strategy for you

- No single "right" answer
- Factors include the team, the product release cycle and the support

!

## Investigating branching strategies

- Gitflow
- Github flow
- Hydra

!

## Gitflow

- Vincent Driessen
- Comprehensive but heavy weight

!

## Where to use

- Single release
- Well defined development objectives
- Releases contain a variety of features
- No development freezes

!

## Branch types from most to least stable

- Master
- Hotfix
- Release
- Development
- Feature

!

## Master (master)

- Golden
- Each commit is a release
- Always contains the last released version
- Lives forever

!

## Hotfix (hotfix-*)

- Very small, perhaps only a single commit
- Used to fix critical issues between releases
- Merged to multiple locations

!

## Release branches (release-*)

- Created from dev
- Never merged into once created
- Used to stabilize before merging with master

!

## Development (develop)

- May or may not be ready for release
- Holding branch for multiple features
- No work done directly

!

## Features branches (no real naming scheme)

-

## Github Flow

!

## Branch lifetimes

- Short
- Long

!


## I don't need your branches, you hippie

I've got feature flags

!


# References

- Source control adoption https://www.openhub.net/repositories/compare http://eclipse.dzone.com/articles/eclipse-community-survey-2014
- Inter-File Branching https://classes.soe.ucsc.edu/cmps290g/Fall03/summary/InterFileBranchingSummary.pdf
- Git Flow http://nvie.com/posts/a-successful-git-branching-model/
