# System-wide (global) installs

By default, Scoop installs apps just for your user account. Apps are installed under `~\scoop\apps`, and only your environment variables are modified. This is usually fine, especially in your dev environment.

In some cases you might want to install an app system-wide so that it's accessible to other users, including the local system account. Scoop provides a `--global` switch to support this case.

Global installs require admin permissions, because they install to `%SYSTEMDRIVE%\ProgramData\scoop`, and set system environment variables. For this reason, this example uses the `sudo` command, which is a rough equivalent of the UNIX command to run a command with superuser privileges. You can install this by running:

```powershell
scoop install sudo
```

Otherwise, you can just open a normal PowerShell console using Run As Administrator.

## Examples

To install an app:

```powershell
sudo scoop install git --global
```

::: tip
If you want the app to be available to the local system account, you will need to restart the system after you install your first app globally. This is because changes made to environment variables don't take affect for the local system account until you restart Windows (see [here](https://support.microsoft.com/kb/821761)).
:::

You can also use the short form for `--global`, `-g`.

E.g. to update a globally installed app using the short form:

```powershell
sudo scoop update git -g
```
