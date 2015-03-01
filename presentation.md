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

<button data-action="rebase">Rebase</button>
<button data-action="merge">Merge</button>
<button data-action="reset">Reset</button>

<div id="mergeRebase" data-init="mergeRebase"></div>

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

## Master (master)

<div id="master" data-init="master"></div>

!


## Hotfix (hotfix-*)

- Very small, perhaps only a single commit
- Used to fix critical issues between releases
- Merged to multiple locations

!

## Hotfix

<div id="hotfix" data-init="hotfix"></div>

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

- Primary places for work
- Shared by a team
- With DVCs there may be additional structure on top of it

!

## What do we build?

- Everything!
- Development, master and release if your are poor

!

## Variants

- Put hot fixes directly into master
- Freeze develop as we approach release and don't have release branches (small teams)

!

## Github Flow

- Used by many OpenSource projects on github
- Lightweight, but easy to break things

!

## Where to use
- Good for continual release-style projects
- Smaller development teams
- Well architected, siloed code
- Need to rapidly release features

!

## Master

- Golden
- Always ready to release
- May, occasionally, be tagged with version numbers

!

## Features branches
- Short lived
- Self-stablized, fixes happen in that branch and not in a release branch

!

## What do we build?

- Everything

!

## Variants

- Multiple masters for major releases
- Development branch for stabilization

!

## Hydra
- Sounds cool
- Useful for libraries or components used in other systems
- Supports multiple concurrent releases

!

## Version master (8.0_master)

- The master branch for a specific version
- Merge into only

!

## Patch branch

- Contains a number of fixes to be applied to a master
- Released as a collection of binaries
- Strongly related to a version master

!

## Fix branches

- Contains fixes for issues
- No new features
- Merged to multiple places

!

## Features branches

- Contain net-new features
- Likely not merged into patches
- Merged into a single version master

!

## Variations

- Development branch for unknown version numbers
- Hotfix branches

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

!

# References

- GitHub Flow https://guides.github.com/introduction/flow/
- Comparison of revision control software http://en.wikipedia.org/wiki/Comparison_of_revision_control_software
