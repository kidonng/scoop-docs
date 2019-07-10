# Persistent data

## Data directory

If you need to store data which should persist between updates you should use `~/scoop/persist/<app>/`.
Inside the manifest, the path to the data directory is available in the `$persist_dir` variable.

The [PHP](https://github.com/ScoopInstaller/Main/blob/master/bucket/php.json) package uses it for the configuration files.

## App manifest

Directories and files can be added to the `persist` definition inside the app manifest.
Persist data is linked from the installed application directory to the data directory with directory conjunctions or hard links.

During the installation, any persistent data is copied into the data directory and linked to.

### Definition

The `persist` definition can be string if only one item is needed or an array for multiple items.

Optionally an item can have a different name inside the data directory:

```json
{
  "persist": [
    "keeps_its_name",
    ["original_name", "new_name_inside_the_data_dir"]
  ]
}
```

### Examples

- [MySQL](https://github.com/ScoopInstaller/Main/blob/master/bucket/mysql.json)
- [MariaDB](https://github.com/ScoopInstaller/Main/blob/master/bucket/mariadb.json)
- [Nginx](https://github.com/ScoopInstaller/Main/blob/master/bucket/nginx.json)
- [Node.js](https://github.com/ScoopInstaller/Main/blob/master/bucket/nodejs.json)
- [PHP](https://github.com/ScoopInstaller/Main/blob/master/bucket/php.json)

## Uninstall

There is a flag to purge all persist data when you uninstall an app. By default, the data will be kept until you remove it.

    scoop uninstall -p nodejs
