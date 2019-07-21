# Dependencies

Scoop treats dependencies in a way you might not expect, especially if you're used to tools like NuGet or Bundler. These tools have to deal with complex problems around long chains of dependencies for specific versions of libraries. Scoop takes a simpler approach.

### Apps are self-contained units

They should keep their own copies of any libraries they need to run, and not rely on or interfere with any libraries outside their own install path.

### It's OK to just install the latest version

If you were to install Git manually on a new machine, would you go looking for the specific version you had on your last machine to make sure everything works correctly? Or would you just grab the latest version from their website? Scoop assumes you probably want to do the latter.

If this makes you uncomfortable, remember that unlike software libraries which can have breaking changes between minor version increments, this is less common with programs.

Of course there are some cases where an old version of a program is still widely used and the new one isn't backwards compatible, like Python versions 2 and 3. Scoop has these cases covered too: you can install the latest 2.7 version with `python27` and for the latest 3.x version it's just `python`.

## Apps Depending on Other Apps

Sometimes an app needs another app to install or run properly. For example:

```
rust
 |
 |—— innounp required (to install)
 |    |
 |    |—— 7zip required (to install)
 |
 |—— gcc45 required (to run)
      |
      |—— 7zip required (to install)
```

In this sort of case, when you install an app Scoop will assume you want to install anything required that you don't already have and install these automatically too.

### Install-time Dependencies vs Runtime Dependencies

Runtime dependencies are specified with the `depends` setting in the [app manifest](App-Manifests.md). Install-time dependencies are detected based on the file extensions of the `url`s in the app manifest.

Scoop treats these differently, e.g. `scoop status` only shows warnings for missing **runtime** dependencies.

## Version dependencies

- For **software library dependencies**, Scoop just side-steps the problem of version dependencies completely, as described above.
- For **app dependencies** when installing apps, Scoop assumes you want the latest stable version of any dependencies. _Again note that Scoop supports specific versions of apps too, e.g. an app could have a dependency on `python27` (Python v2.7), or `python` (the latest stable version of Python)._ For updating apps, Scoop just does the bare minimum—if a dependency is completely missing it will install it, but if it's on an older version Scoop will leave it alone.
