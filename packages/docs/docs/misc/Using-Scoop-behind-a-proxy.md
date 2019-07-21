# Using Scoop behind a proxy server

## Do you need this?

If your proxy is already configured in Internet Options and it doesn't require authentication, you shouldn't need to do anything else for Scoop to use it.

These instructions are for people who

1. need to authenticate with their proxy, either using their Windows credentials or another username/password
2. want to use a proxy server for Scoop that isn't configured in Internet Options.

## Installation

Normally, Scoop is installed with:

```powershell
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

If you're behind a proxy you might need to run one or more of these commands first:

```powershell
# If you want to use a proxy that isn't already configured in Internet Options
[net.webrequest]::defaultwebproxy = new-object net.webproxy "http://proxy.example.org:8080"

# If you want to use the Windows credentials of the logged-in user to authenticate with your proxy
[net.webrequest]::defaultwebproxy.credentials = [net.credentialcache]::defaultcredentials

# If you want to use other credentials (replace 'username' and 'password')
[net.webrequest]::defaultwebproxy.credentials = new-object net.networkcredential 'username', 'password'
```

These commands will affect any web requests using `net.webclient` until the end of your PowerShell session.

## Configuring Scoop to use your proxy

Once Scoop is installed, you can use `scoop config` to configure your proxy. Here's an excerpt from `scoop help config`:

> `scoop config proxy [username:password@]host:port`

By default, Scoop will use the proxy settings from Internet Options, but with anonymous authentication.

- To use the credentials for the current logged-in user, use `currentuser` in place of `username:password`
- To use the system proxy settings configured in Internet Options, use `default` in place of `host:port`
- An empty or unset value for proxy is equivalent to `default` (with no username or password)
- To bypass the system proxy and connect directly, use `none` (with no username or password)

## Config examples

### Use your Windows credentials with the default proxy configured in Internet Options

```powershell
scoop config proxy currentuser@default
```

### Use hard-coded credentials with the default proxy configured in Internet Options

```powershell
scoop config proxy user:password@default
```

### Use a proxy that isn't configured in Internet Options

```powershell
# anonymous authentication to proxy.example.org on port 8080:
scoop config proxy proxy.example.org:8080

# or, with authentication:
scoop config proxy username:password@proxy.example.org:8080
```

### Bypassing the proxy configured in Internet Options

```powershell
scoop config rm proxy
```

### Using a password containing `@` or `:`

If your proxy password contains `@` or `:` characters, you need to escape them using a `\`, e.g.:

```powershell
scoop config proxy 'username:p\@ssword@proxy.example.org:8080'
```
