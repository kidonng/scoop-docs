# Example Setup Scripts

Here are some example "get-all-my-stuff" scripts.

It's assumed that you have PowerShell 5 and you've already installed Scoop, e.g.

```powershell
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
set-executionpolicy unrestricted -s cu
```

## Example dev environment setup

```powershell
# utils
scoop install 7zip curl sudo git openssh coreutils grep sed less

# programming languages
scoop install python ruby go nodejs

# WAMP stack
scoop install apache mariadb php
iex (new-object net.webclient).downloadstring('https://gist.github.com/lukesampson/6546858/raw/apache-php-init.ps1')

# console theme
scoop install concfg pshazz
concfg import solarized small

# vim
scoop install vim
'
set ff=unix

set cindent
set tabstop=4
set shiftwidth=4
set expandtab
set backupdir=$TEMP
' | out-file ~/.vimrc -enc oem -append

```

## Example production environment setup

```powershell
scoop install sudo 7zip

# make these available to system processes
sudo scoop install git ruby postgres --global

# just for me
scoop install grep coreutils
```
