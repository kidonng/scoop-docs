# Uninstalling Scoop

If you've tried Scoop and it's not for you — no problem. You can uninstall Scoop and all the programs you've installed with Scoop by running:

```powershell
scoop uninstall scoop
```

This will let you know what's going to happen and ask if you're sure—just type `y` and press enter to confirm.

This command will delete the `~/scoop/persist` folder.

## Broken Install

If you delete `~/scoop` you should be able to reinstall. To do this, run this in PowerShell:

```powershell
del .\scoop -Force
```
