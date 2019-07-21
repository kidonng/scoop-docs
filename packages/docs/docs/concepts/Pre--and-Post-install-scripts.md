# Pre- and post-install Scripts

## Variables

These variables are available for use in `pre_install` / `post_install` scripts:

| Variable        | Example                                                                                                             | Description                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `$dir`          | `C:\Users\username\scoop\apps\$app\current`                                                                         |
| `$original_dir` | `C:\Users\username\scoop\apps\$app\1.2.3`                                                                           |
| `$persist_dir`  | `C:\Users\username\scoop\persist\$app`                                                                              |
| `$manifest`     | `@{homepage=https://example.com/; description=Example app; version=2.4.1; url=http://example.com/app-setup.exe;...` | Deserialized manifest (PowerShell object)   |
| `$version`      | `1.2.3`                                                                                                             | Version being installed                     |
| `$app`          | `exampleapp`                                                                                                        | Name of application (name of manifest file) |
| `$architecture` | `64bit`                                                                                                             |
| `$scoopdir`     | `C:\Users\username\scoop`                                                                                           | Base Scoop install dir                      |
| `$oldscoopdir`  | `C:\Users\username\AppData\Local\scoop`                                                                             |
| `$globaldir`    | `C:\ProgramData\scoop`                                                                                              |
| `$cachedir`     | `C:\Users\username\scoop\cache`                                                                                     |
| `$bucketsdir`   | `C:\Users\username\scoop\buckets`                                                                                   |
| `$modulesdir`   | `C:\Users\username\scoop\modules`                                                                                   |
| `$cfgpath`      | `~/.scoop`                                                                                                          | Path to Scoop configuration                 |
| `$cfg`          | `{SCOOP_BRANCH, SCOOP_REPO, lastupdate}`                                                                            | Scoop configuration (PowerShell object)     |

::: tip
Check the [`lib/install`](https://github.com/lukesampson/scoop/blob/master/lib/install.ps1) script for more details.
:::

## Functions

### `appdir`

Reference another scoop application. Eg, to check if another application is installed you can use:

`"post_install": [ "if (Test-Path \"$(appdir otherapp)\\current\\otherapp.exe\") { <# .. do something .. #> }"`
