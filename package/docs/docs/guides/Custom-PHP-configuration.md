# Customize PHP configuration

If you want to customize the settings of your PHP Installation you should never edit the `php.ini` file inside the PHP directory. This file will not survive updates.

Always create you own custom configuration files inside the configuration scan dir.
The directory is located at `~/scoop/persist/php/cli/conf.d`. You can create as many `.ini` files as you like.

## Examples

Some basic settings like the timezone and limits (`custom.ini`)

```ini
date.timezone = Europe/Berlin
max_execution_time = 60
memory_limit = 256M
post_max_size = 128M
upload_max_filesize = 128M
```

Enabling debugging (`debug.ini`)

```ini
display_errors = On
display_startup_errors = On
error_reporting = E_ALL
html_errors = Off
```

Enabling PHP modules, those are the most commonly needed modules. Take a look inside the `php.ini` to know what is available (`extensions.ini`)

```ini
extension_dir=ext

extension=php_curl.dll
extension=php_fileinfo.dll
extension=php_gd2.dll
extension=php_gettext.dll
extension=php_intl.dll
extension=php_ldap.dll
extension=php_mbstring.dll
extension=php_exif.dll      ; Must be after mbstring as it depends on it
extension=php_mysqli.dll
extension=php_openssl.dll
extension=php_pdo_mysql.dll

extension=php_sqlite3.dll
extension=php_tidy.dll
```

::: tip
You can use git to store your configurations.
:::
