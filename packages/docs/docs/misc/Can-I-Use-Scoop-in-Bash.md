# Can I use Scoop in Bash?

## Short Answer: Yes!

Add this line to your `~/.bashrc` (or `~/.bash_profile` if you're using `git bash`, or `~/.profile` if you're using `busybox`)

```sh
function scoop() { powershell -ex unrestricted scoop.ps1 "$@" ;} && export -f scoop
```

Restart bash or run `source ~/.bashrc` and Scoop will now work.

::: tip NOTE
functions are [preferred](https://askubuntu.com/a/98791) over aliases because aliases are only set in the current shell, whereas functions (once exported) [can be called from within scripts](https://unix.stackexchange.com/a/22867).
:::

## Long Answer

When you're in bash: if you use Scoop, PowerShell needs to be started up every time you call the alias. You'll notice that it can take a while. So the question is, should you use Scoop in bash?
