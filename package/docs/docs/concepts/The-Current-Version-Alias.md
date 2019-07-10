# The "Current" Version Alias

The `current` directory for apps is a special alias directory which points to the currently installed version of that app.

It allows path references to remain the same across app updates, since paths refer to the `current` directory alias rather than a hardcoded version directory.

![How the 'current' alias works](https://raw.githubusercontent.com/lukesampson/scoop/gh-pages/images/Junctions%20Overview.png)

For example, if I run `ls ~/scoop/apps/git` now, I see this output:

```
$ ls ~/scoop/apps/git

    Directory: C:\Users\luke\scoop\apps\git


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d-----         24/11/16   8:17 am                2.10.2.windows.1
d-----           3/1/17   9:42 am                2.11.0.windows.1
d----l           3/1/17   9:42 am                current
```

The `2.10.2.windows.1` and `2.11.0.windows.1` directories are the installed versions of Git.

The `current` directory is not an additional directory, but a **Directory Junction**, pointing to the 2.11.0.windows.1 directory.

If you're paying close attention, you might notice the extra `l` in the `Mode` column of the output. But apart from that, you won't see much indication that it's any different from a normal directory.

## What are Directory Junctions?

If you're not familiar with directory junctions, you can think of them as similar to symbolic links, or even shortcuts. They are pointers to other locations in the file system. There are some important implementation differences between junctions and symbolic links, which you can read about [here](<https://msdn.microsoft.com/en-us/library/windows/desktop/aa365006(v=vs.85).aspx>) if you're interested.

The reason Scoop uses junctions instead of symbolic links is that symbolic links require admin permissions to create (although this [looks set to change soon](https://blogs.windows.com/buildingapps/2016/12/02/symlinks-windows-10/#cpLA6xrKTwb5fOf7.97)).

### Why Use a Junction? Aren't Shims Enough?

The main problem being addressed here is how to keep programs working smoothly between updates, even though the new program is in a different directory to the previous one. Shims do solve some of the problems here, by staying in the same place and updating the version that they point to.

However, some programs need to set environment variables, registry settings or other configuration after installation that point to the actual install path. Before Scoop used `current` directory junctions, these variables and settings would be pointing to the old directory after an upgrade, which was not ideal. By using a `current` alias directory and updating the alias, the settings would continue to point to the right location.

![Why Junctions?](https://raw.githubusercontent.com/lukesampson/scoop/gh-pages/images/Junctions%20Comparison.png)
