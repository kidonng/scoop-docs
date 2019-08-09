# Theming Powershell

![](https://github.com/lukesampson/scoop/raw/gh-pages/images/docs/shell-theme.png)

This is how my command line looks, running Powershell in the built-in Windows Console. You can see the [Solarized](http://ethanschoonover.com/solarized) color theme, and a custom prompt including Git info. You can't see Git tab completions or support for SSH keys, but those are there too.

I used [Concfg](https://github.com/lukesampson/concfg) for the font and color theme, and [Pshazz](https://github.com/lukesampson/pshazz) for the custom prompt and Git and SSH features.

Here's my script to get this setup:

```powershell
scoop install 7zip git openssh concfg

# back-up current console settings
concfg export console-backup.json

# use solarized color theme
concfg import solarized-dark

# You'll see this warning:
#     overrides in the registry and shortcut files might interfere with
#     your concfg settings.
#     would you like to search for and remove them? (Y/n):
# Enter 'n' if you're not sure yet: you can always run 'concfg clean' later

scoop install pshazz
```

If you install Pshazz and you already have an SSH key, you'll see a popup asking for your password.
![](https://github.com/lukesampson/scoop/raw/gh-pages/images/docs/askpass.png)

There's [more info on setting up SSH with Scoop](SSH-on-Windows.md), if you're interested.

Now you should have a nicer looking command prompt, with some helpful Git and SSH enhancements. If you want to customize your prompt even more, check out the [Concfg](https://github.com/lukesampson/concfg) and [Pshazz](https://github.com/lukesampson/pshazz) projects on GitHub.

It's worth pointing out that concfg works in ye olde cmd.exe as well, but with Powershell you get the extra prompt enhancements, plus a great dynamic and functional programming language at your fingertips as well.

If you don't like your new color theme and want to go back, run `concfg import console-backup.json`. If you start a new console and find your color settings are gone, re-run `concfg import solarized small` and enter 'y' when it asks if you'd like to clean registry settings.
