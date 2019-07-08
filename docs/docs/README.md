# Scoop

Scoop is a command-line installer for Windows inspired by [Homebrew](http://mxcl.github.io/homebrew/) and [sub](https://github.com/37signals/sub#readme).

## What does Scoop do?

Scoop installs programs from the command line with a minimal amount of friction. It tries to eliminate things like:

- Permission popup windows
- GUI wizard-style installers
- Path pollution from installing lots of programs
- Unexpected side-effects from installing and uninstalling programs
- The need to find and install dependencies
- The need to perform extra setup steps to get a working program

Scoop is very scriptable, so you can run repeatable setups to get your environment just the way you like, e.g.:

```powershell
scoop install sudo
sudo scoop install 7zip git openssh --global
scoop install aria2 curl grep sed less touch
scoop install python ruby go perl
```

If you've built software that you'd like others to use, Scoop is an alternative to building an installer (e.g. MSI or InnoSetup) — you just need to zip your program and provide a JSON manifest that describes how to install it.

## Demo

<iframe src="https://www.youtube.com/embed/a85QLUJ0Wbs?rel=0" frameborder="0" allowfullscreen></iframe>
