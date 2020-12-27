# How is Scoop different from [Chocolatey](http://chocolatey.org)?

- **Installs to ~/scoop/ by default.** You can set up your own programs and not worry that they'll interfere with other users' programs (or theirs with yours, perhaps more importantly). You can optionally choose to install programs system-wide if you have administrator rights.
- **No UAC popups, doesn't require admin rights.** Since programs are installed just for your user account, you won't be interrupted by UAC popups.
- **Doesn't pollute your path.** Where possible, Scoop puts your program shims in a single directory and just adds that to your path.
- **Doesn't use NuGet.** NuGet is a great solution to the problem of managing software library dependencies. Scoop avoids this problem altogether: each program you install is isolated and independent.
- **Simpler than packaging.** Scoop isn't a package manager, rather it reads plain JSON manifests that describe how to install a program and its dependencies.
- **Simpler app repository.** Scoop just uses Git for its app repository. You can create your own repo, or even just a single file that describes an app to install.

::: tip NOTE
While it would be easy to install Skype with Scoop, this will probably never be in Scoop's main bucket (app repository). Scoop focuses on open-source, command-line developer tools. The [scoop extras](https://github.com/lukesampson/scoop-extras) bucket is for non developer tools.
:::
