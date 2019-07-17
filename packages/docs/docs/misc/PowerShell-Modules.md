# PowerShell modules

PowerShell modules are installed like other apps, but they are also linked under `~\scoop\modules`.

The `~\scoop\modules` directory will be added to your `$env:PSModulePath` environment variable, and PowerShell should automatically detect the modules you install here using Scoop.

The directories under `~\scoop\modules` aren't normal directories. Each is a **directory junction** which points to the currently installed version of the app/module, which is itself a directory junction pointing to the actual versioned directory. So for a module named `MyPSModule` you might have something like this:

`~\scoop\modules\MyPSModule`<br>
&nbsp;&nbsp;&rarr; _points to_ `~\scoop\apps\mypsmodule\current`<br>
&nbsp;&nbsp;&nbsp;&nbsp;&rarr; _points to_ `~\scoop\apps\mypsmodule\1.16.0.rc2`

The key part of the [Scoop manifest](../concepts/App-Manifests.md) for a PowerShell module is this:

```json
{
  "psmodule": {
    "name": "NameOfTheModule"
  }
}
```

The `name` property is required if you use `psmodule`, and it should match the name of the `.psd1` manifest for the PowerShell module for PowerShell to consider it "well-formed" and automatically detect the module (see [here](<https://msdn.microsoft.com/en-us/library/dd878350(v=vs.85).aspx>) for more.)
