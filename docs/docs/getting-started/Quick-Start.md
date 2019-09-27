# Quick Start

## Requirements

- Windows 7 SP1+ / Windows Server 2008+
- [PowerShell 5](https://aka.ms/wmf5download) (or later, including [PowerShell Core](https://docs.microsoft.com/en-us/powershell/scripting/install/installing-powershell-core-on-windows?view=powershell-6)) and [.NET Framework 4.5](https://www.microsoft.com/net/download) (or later)

::: tip
If you're on Windows 10 or Windows Server 2012 you should be all set, but Windows 7 and Windows Server 2008 might have older versions. You can run `$psversiontable.psversion.major` to get PowerShell version info.
:::

- PowerShell must be allowed to execute local scripts for your user account

::: tip
You can configure that by running `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` (`Unrestricted` will work too, but it is less secure, so stick with `RemoteSigned` if you're not sure).
:::

## Installing Scoop

Run the following command from your PowerShell to install Scoop to its default location (`C:\Users\<user>\scoop`):

```powershell
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')

# or shorter
iwr -useb get.scoop.sh | iex
```

Once installed, run `scoop help` for instructions.

The default setup is configured so all user installed programs and Scoop itself live in `C:\Users\<user>\scoop`.
Globally installed programs (`--global`) live in `C:\ProgramData\scoop`.
These settings can be changed through environment variables.

## Install Scoop to a custom directory by changing `SCOOP`

Assuming the target directory is `C:\scoop`, in a PowerShell command console, run:

```powershell
$env:SCOOP='C:\scoop'
[environment]::setEnvironmentVariable('SCOOP',$env:SCOOP,'User')
# run the installer
```

Assuming you didn't see any error messages, Scoop is now ready to run.

## Configure Scoop to install global programs to a custom directory by changing `SCOOP_GLOBAL`

Assuming the target directory is `C:\apps`, in an admin-enabled PowerShell command console, run:

```powershell
$env:SCOOP_GLOBAL='c:\apps'
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
scoop install -g <app>
```

## Using Scoop

Although Scoop is written in PowerShell, its interface is closer to Git and Mercurial than it is to most PowerShell programs.

To get an overview of Scoop's interface, run:

```powershell
scoop help
```

You'll see a list of commands with a brief summary of what each command does. For more detailed information on a command, run `scoop help <command>`, e.g. `scoop help install` (try it!).

Now that you have a rough idea of how Scoop commands work, let's try installing something.

```powershell
scoop install curl
```

You'll probably see a warning about a missing hash, but you should see a final message that cURL was installed successfully. Try running it:

```powershell
curl -L https://get.scoop.sh
```

You should see some HTML, probably with a 'document moved' message. Note that, like when you installed Scoop, you didn't need to restart your console for the program to work. Also, if you've installed cURL manually before you might have noticed that you didn't get an error about SSL—Scoop downloaded a certificate bundle for you.

### Finding apps

Let's say you want to install the `ssh` command but you're not sure where to find it. Try running:

```powershell
scoop search ssh
```

You'll should see a result for `openssh`. This is an easy case because the name of the app contains 'ssh'.

You can also find apps by the name of the commands they install. For example,

```powershell
scoop search hg
```

This shows you that the `mercurial` app includes `hg.exe`.

## Updating Scoop

To get the latest version of Scoop you have to run the command

```powershell
scoop update
```

This will download the latest version of scoop and updates the local app manifests.

After you updated Scoop you can update individual apps

```powershell
scoop update curl
```

If you want to update all your installed apps, you can run

```powershell
scoop update *
```
