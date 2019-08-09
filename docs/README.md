---
home: true
actionText: Quick Start →
actionLink: docs/getting-started/Quick-Start.md
features:
  - title: Get comfortable on the Windows command line
    details: Looking for familiar Unix tools? Tired of PowerShell’s Verb-Noun verbosity? Scoop helps you get the programs you need, with a minimal amount of point-and-clicking.
  - title: Say goodbye to permission pop-ups
    details: Scoop installs programs to your home directory by default. So you don’t need admin permissions to install programs, and you won’t see UAC popups every time you need to add or remove a program.
  - title: Scoop reads the README for you
    details: Not sure whether you need 32-bit or 64-bit? Can’t remember that command you have to type after you install to get that other thing you need? Scoop has you covered. Just "scoop install" and you’ll be ready to work in no time.
footer: This site is unofficial. Contents' copyright belongs to their author.
---

## Scoop installs the tools you know and love

```powershell
scoop install curl
```

## Demo

<div class="wrapper">
  <iframe src="https://www.youtube.com/embed/a85QLUJ0Wbs?rel=0" allowfullscreen></iframe>
</div>

## Installs in seconds

Make sure [PowerShell 5](https://aka.ms/wmf5download) (or later, include [PowerShell Core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-6)) and [.NET Framework 4.5](https://www.microsoft.com/net/download) (or later) are installed. Then run:

```powershell
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

**Note:** if you get an error you might need to change the execution policy (i.e. enable PowerShell) with `Set-ExecutionPolicy RemoteSigned -scope CurrentUser`.
