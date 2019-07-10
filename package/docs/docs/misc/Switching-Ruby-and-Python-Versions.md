# Switching between Ruby and Python Versions

## `scoop reset`

If you need to run multiple versions of Ruby or Python on the same computer, you can use `scoop reset` to switch between versions.
If you're familiar with `rbenv` or RVM this is roughly similar, although with `scoop reset` you always need to switch version manually.

## Ruby

```powershell
scoop bucket add versions # add the 'versions' bucket if you haven't already

scoop install ruby ruby19
ruby --version # -> ruby 1.9.3p551 (2014-11-13) [i386-mingw32]

# switch to ruby 2.x
scoop reset ruby
ruby --version # -> ruby 2.3.3p222 (2016-11-21 revision 56859) [x64-mingw32]

# switch back to 1.9.x
scoop reset ruby19
ruby --version # -> ruby 1.9.3p551 (2014-11-13) [i386-mingw32]
```

`scoop reset` re-installs shims for the app and updates environment variables according to the app manifest.
You can switch between Ruby versions as many times as you like—both versions remain installed but one takes priority.

## Python

The same thing works for Python

```powershell
scoop bucket add versions # add the 'versions' bucket if you haven't already

scoop install python27 python
python --version # -> Python 3.6.2

# switch to python 2.7.x
scoop reset python27
python --version # -> Python 2.7.13

# switch back (to 3.x)
scoop reset python
python --version # -> Python 3.6.2
```
