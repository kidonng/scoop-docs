# Apache with PHP

Install PHP and Apache:

```powershell
scoop install php apache
```

Register the PHP handler with Apache:

```powershell
iex (new-object net.webclient).downloadstring('https://gist.githubusercontent.com/nilkesede/c98a275b80b6d373131df82eaba96c63/raw/apache-php-init.ps1')
```

**To start Apache on the command line**, run:

```powershell
httpd
```

Apache will continue running until you press `Ctrl-C` to terminate it.

If you open `http://localhost` in your browser, you should see a page saying that “It works!”.

## The document root directory

Scoop configures Apache to serve web pages from the `htdocs` directory inside the Scoop install directory.

You can get to this directory by running:

```powershell
pushd "\$(scoop which httpd | split-path)\..\htdocs"
```

If you would like to serve documents from somewhere else, you need to change the DocumentRoot inside the `conf/httpd.conf` file. You can find `httpd.conf` at

```powershell
"$(scoop which httpd | split-path)\..\conf\httpd.conf"
```

## Installing Apache as a service

Run:

```powershell
sudo httpd -k install -n apache
sudo net start apache
```

If you don't have `sudo`, you can install it with `scoop install sudo`.

To uninstall the Apache service

```powershell
sudo net stop apache
sudo httpd -k uninstall -n apache
```

For more information, see [Using Apache HTTP Server on Windows](https://httpd.apache.org/docs/current/platform/windows.html).
