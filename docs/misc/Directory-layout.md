# Directory layout
Scoop has a specific directory layout which includes installed applications, cache, configuration files and generated shim executables.

The main scoop directory is `C:\Users\user\scoop`, but can be changed before installation with the `SCOOP` environment variable. Global installs are in `C:\ProgramData\scoop`.

See [Persistent data](../concepts/Persistent-data.md) for more info on the user configuration files which live under these directories.

## Directories
These folders exist under the scoop installation directory:
- `apps`: contains installed software
  - `apps/<app>/current/`: a junction to an app's currently installed version. Generally points to latest.
  - `apps/<app>/<version>/`: a specific version of an app. There can be multiple versions installed.
- `buckets`: All currently added buckets. One folder per bucket.
  - `buckets/<bucket>/`: a single Git repository containing app manifests.
- `cache`: Installation files downloaded from the internet.
  - `cache/<app>#<version>#<url>.zip`: A downloaded installation file.
- `persist`: User configuration files, kept between different app versions.
  - `persist/<app>/<config file>`: General location of an app's config file.
- `shims`: Generated executable files, sort of wrappers of the real apps. This folder is added to `PATH`.
  - `shims/<app>.exe`
