# GitHub with SSH Key

::: tip
Based on [this guide from GitHub](https://help.github.com/articles/generating-ssh-keys#platform-windows).
:::

Git for Windows comes with a **Git Bash** that gives you good Git functionality over SSH. But what if you want to use PowerShell instead of Bash? This guide shows you how to do just that, **without needing to re-type your password each time you connect**.

This guide uses Github as an example, but the same principals apply for any SSH-accessible Git repo.

This assumes you have [installed Scoop](../getting-started/Quick-Start.md), and have a basic knowledge of Git.

## Install

First up, install the programs you need:

```powershell
scoop install git openssh
```

## Create a private key

If you don't already have an SSH key, you can create one like this:

```
PS> ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/<b>you</b>//.ssh/id_rsa): <b>[press enter]</b>
Enter passphrase (empty for no passphrase): <b>[type your password]</b>
Enter same passphrase again: <b>[and once more]</b>
...
```

Then [add your SSH key to GitHub](https://help.github.com/en/articles/adding-a-new-ssh-key-to-your-github-account).

## Use `Pshazz` to remember your password

`Pshazz` includes a plugin for SSH that can save your SSH key password in Windows Credential Manager so you don't need to re-type it every time you push to your Github repo. Install it like this:

```powershell
scoop install pshazz
```

And you can set up git client to store your GitHub access token to Windows Credential Manager by:

```powershell
git config --global credential.helper manager
```

You should see a popup asking for your SSH key password: enter it and check the box to save your password. Back in your PowerShell session, you should see an `Identity Added` message. Whenever you start a PowerShell session from now on, `Pshazz` will make sure the `ssh-agent` is running and load your private key using your saved password.

## Test it out

To make sure everything's working, run:

```powershell
ssh -T git@github.com
```

After a warning or two, you should see a message like this:

```
Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
```
