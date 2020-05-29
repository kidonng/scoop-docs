# Autoupdate

**Auto Update** is a tool for package maintainers. It automatically checks for new versions of an app and updates the manifest accordingly. It helps to eliminate much of the tedium of updating manifests, as well as reducing the risk of human error while doing so.

Here you will find an in-depth explanation of how the `autoupdate` part of an app manifest works.

## Using `checkver.ps1` to query and autoupdate

Use `checkver.ps1` to query the current version of either a specific app or all apps of a bucket. If an updated version existed, you can autoupdate manifest by `checkver.ps1` too.

### Querying current version

Open a PowerShell/CMD console, then `cd` into Scoop's root directory (`apps\scoop\current`) or the buckets repository directory and run the following commands:

- To query the current version of a specific app in the bucket, run:

  ```powershell
  .\bin\checkver.ps1 <app>
  # or .\bin\checkver.ps1 -App <app>
  ```

- To query the current version of all apps in the bucket, run:

  ```powershell
  .\bin\checkver.ps1 *
  # or .\bin\checkver.ps1 -App *
  ```

### Updating manifest

In the output of `checkver.ps1`, you can see if an outdated app has autoupdate available. If so, you can run the following command to automatically update the respective app's manifest (use `*` to update all apps)

```powershell
.\bin\checkver.ps1 <app> -u
# or .\bin\checkver.ps1 -App <app> -Update
```

To query apps that not in `bucket` directory (e.g. `.`, `.\TODO`, etc.), specify the directory as the second argument to `checkver.ps1`

```powershell
.\bin\checkver.ps1 <app> <dir> -u
# or .\bin\checkver.ps1 -App <app> -Dir <dir> -Update
```

It is recommended to verify that the updated manifest still works by installing the app with the following command

```powershell
scoop install bucket\<app>.json
```

### Parameters of `checkver.ps1`

- `-App` (`-a APP`)
  - Manifest name to search.
  - Placeholders (`*`) are supported.
- `-Dir` (`-d DIR`)
  - Where to search for manifest(s).
- `-Update` (`-u`)
  - Update given manifest.
- `-ForceUpdate` (`-f`)
  - Check manifest(s) and update, even if there is no new version.
- `-SkipUpdated` (`-s`)
  - Check given manifest(s), and list only outdated manifest(s).
- `-Version` (`-v VER`)
  - Check given manifest(s) using a given version `VER`.
  - Usually used with `-u` to update to a certain version.

## Adding `checkver` to a manifest

### Using RegEx in `checkver`

Simplest solution is to use an RegEx and it will match it to the source of `homepage`. Example: [go](https://github.com/ScoopInstaller/Main/blob/master/bucket/go.json)

```json
{
  "homepage": "<https://golang.org>",
  "checkver": "Build version go([\\d\\.]+)\\."
}
```

If you're not familiar with RegEx or want to test if your RegEx matches on the right text you can use an online tool ([RegEx101](https://regex101.com/) or [RegExr](https://regexr.com/)).

Use another url if the `homepage` doesn't contain the version. Example: [7zip](https://github.com/ScoopInstaller/Main/blob/master/bucket/7zip.json)

```json
{
  "homepage": "https://www.7-zip.org/",
  "checkver": {
    "url": "https://www.7-zip.org/download.html",
    "regex": "Download 7-Zip ([\\d.]+)"
  }
}
```

### Using JSONPath in `checkver`

Use a JSON endpoint with [JSONPath expressions](https://goessner.net/articles/JsonPath/) to retrieve the version. Either dot-notation or bracket-notation can be used. Example: [mro](https://github.com/ScoopInstaller/Main/blob/master/bucket/mro.json)

```json
{
  "checkver": {
    "url": "https://mran.microsoft.com/assets/configurations/app.config.json",
    "jp": "$.latestMicrosoftRVersion"
  }
}
```

If you're not familiar with JSONPath or want to test if your JSONPath matches on the right text you can use an online tool ([JSONPath Expression Tester](https://jsonpath.curiousconcept.com/)).

There could be a JSONPath query in `checkver.jsonpath`, and so does RegEx ([sample reference](https://www.newtonsoft.com/json/help/html/RegexQuery.htm)). Example: [nuget](https://github.com/ScoopInstaller/Main/blob/master/bucket/nuget.json)

```json
{
  "checkver": {
    "url": "https://dist.nuget.org/index.json",
    "jp": "$..versions[?(@.displayName == 'nuget.exe - recommended latest')].version"
  }
}
```

### Using RegEx with JSONPath in `checkver`

If `checkver.regex` and `checkver.jsonpath` are all assigned, **scoop** use `checkver.jsonpath` to extract a string which `checkver.regex` is matched to to find the version. Example: [nwjs](https://github.com/ScoopInstaller/Main-extras/blob/master/bucket/nwjs.json)

```json
{
  "checkver": {
    "url": "https://nwjs.io/versions.json",
    "jsonpath": "$.stable",
    "regex": "v([\\d.]+)"
  }
}
```

### Special Cases

Use the latest app release on Github by setting `checkver` to `github` and the `homepage` to the repository URL. This will try to match the tag with `\/releases\/tag\/(?:v|V)?([\d.]+)`. _The app author has to use Github's release feature for this to work. Pre-releases will be ignored!_ Example: [nvm](https://github.com/ScoopInstaller/Main/blob/master/bucket/nvm.json)

```json
{
  "homepage": "https://github.com/coreybutler/nvm-windows",
  "checkver": "github"
}
```

Or use different urls for the homepage and repository. Example: [cmder](https://github.com/ScoopInstaller/Main/blob/master/bucket/cmder.json)

```json
{
  "homepage": "http://cmder.net",
  "checkver": {
    "github": "https://github.com/cmderdev/cmder"
  }
}
```

Use `checkver.reverse: true` to let `checkver.regex` match the last occurrence found (default is to match the first occurrence). Example: [x264](https://github.com/ScoopInstaller/Main/blob/master/bucket/x264.json)

```json
{
  "checkver": {
    "url": "https://download.videolan.org/pub/videolan/x264/binaries/win64/",
    "re": "x264-r(?<version>[\\d]+)-(?<commit>[a-fA-F0-9]{7}).exe",
    "reverse": true
  }
}
```

Use capture groups in `checkver.regex` will make [captured variables](#captured-variables) that could be used in `checkver.replace` for complex versions or in [`autoupdate`](#adding-autoupdate-to-a-manifest) property.

This example will provide `$matchVersion` and `$matchShort` as variables (used in `autoupdate`). Example: [git](https://github.com/ScoopInstaller/Main/blob/master/bucket/git.json)

```json
{
  "checkver": {
    "url": "https://github.com/git-for-windows/git/releases/latest",
    "re": "v(?<version>[\\d\\w.]+)/PortableGit-(?<short>[\\d.]+).*\\.exe"
  }
}
```

This exmple will provide `${1}, ${2}, ${3}` (used in `checkver.replace`) and `$matchSha` (used in `autoupdate`) as variables. Example: [pshazz](https://github.com/ScoopInstaller/Main/blob/master/bucket/pshazz.json)

```json
{
  "checkver": {
    "url": "https://github.com/lukesampson/pshazz/commits/master.atom",
    "re": "(\\d+)-(\\d+)-(\\d+)[\\S\\s]*?(?<sha>[0-9a-f]{40})",
    "replace": "0.${1}.${2}.${3}"
  }
}
```

### Properties of `checkver`

- `checkver`: "regex". RegEx for finding the version on the `homepage`
  - `github`: "uri". URL to the app's Github repository
  - `url`: "uri". Page where the version can be found
    - Supports [version variables](#version-variables)
  - `regex|re`: "regex". RegEx for finding the version
  - `jsonpath|jp`: "jsonpath". JSONPath expression for finding the version
  - `xpath`: "string". XPath expression for finding the version
  - `reverse`: "boolean". If or not match the last occurrence found
  - `replace`: "string". Replace the matched value with a calculated value
    - Supports [captured variables](#captured-variables)
  - `useragent`: "string". User-Agent that used to get webpage content (only used in [fiddler](https://github.com/lukesampson/scoop-extras/blob/master/bucket/fiddler.json))
    - Supports [version variables](#version-variables)

## Adding `autoupdate` to a manifest

For the autoupdate feature to work it needs a [`checkver`](#adding-checkver-to-a-manifest) property
to find the latest version number.

```json
{
  "autoupdate": {
    "note": "Thanks for using autoupdate, please test your updates!",
    "architecture": {
      "64bit": {
        "url": "https://example.org/dl/example-v$version-x64.msi"
      },
      "32bit": {
        "url": "https://example.org/dl/example-v$version-x86.msi"
      }
    }
  }
}
```

Some example manifests using the `autoupdate` feature:

- [nodejs](https://github.com/ScoopInstaller/Main/blob/master/bucket/nodejs.json)

```json
{
  "autoupdate": {
    "architecture": {
      "64bit": {
        "url": "https://nodejs.org/dist/v$version/node-v$version-win-x64.7z",
        "extract_dir": "node-v$version-win-x64"
      },
      "32bit": {
        "url": "https://nodejs.org/dist/v$version/node-v$version-win-x86.7z",
        "extract_dir": "node-v$version-win-x86"
      }
    },
    "hash": {
      "url": "$baseurl/SHASUMS256.txt.asc"
    }
  }
}
```

- [php](https://github.com/ScoopInstaller/Main/blob/master/bucket/php.json)

```json
{
  "autoupdate": {
    "architecture": {
      "64bit": {
        "url": "https://windows.php.net/downloads/releases/php-$version-Win32-VC15-x64.zip"
      },
      "32bit": {
        "url": "https://windows.php.net/downloads/releases/php-$version-Win32-VC15-x86.zip"
      }
    },
    "hash": {
      "url": "$baseurl/sha256sum.txt"
    }
  }
}
```

- [nginx](https://github.com/ScoopInstaller/Main/blob/master/bucket/nginx.json)

```json
{
  "autoupdate": {
    "url": "https://nginx.org/download/nginx-$version.zip",
    "extract_dir": "nginx-$version"
  }
}
```

- [imagemagick](https://github.com/ScoopInstaller/Main/blob/master/bucket/imagemagick.json)

```json
{
  "autoupdate": {
    "architecture": {
      "64bit": {
        "url": "https://www.imagemagick.org/download/binaries/ImageMagick-$version-portable-Q16-x64.zip"
      },
      "32bit": {
        "url": "https://www.imagemagick.org/download/binaries/ImageMagick-$version-portable-Q16-x86.zip"
      }
    },
    "hash": {
      "mode": "rdf",
      "url": "https://www.imagemagick.org/download/binaries/digest.rdf"
    }
  }
}
```

Some examples using the `autoupdate` feature with [captured variables](#captured-variables) or [version variables](#version-variables):

- [openjdk](https://github.com/ScoopInstaller/Java/blob/master/openjdk.json)

```json
{
  "checkver": {
    "re": "/(?<type>early_access|GA)/(?<path>jdk(?<major>[\\d.]+)(?:.*)?/(?<build>[\\d]+)(?:/GPL|/binaries)?)/(?<file>openjdk-(?<version>[\\d.]+)(?<ea>-ea)?(?:\\+[\\d]+)?_windows-x64_bin.(zip|tar.gz))",
    "replace": "${version}-${build}${ea}"
  },
  "autoupdate": {
    "architecture": {
      "64bit": {
        "url": "https://download.java.net/java/$matchType/$matchPath/$matchFile"
      }
    },
    "hash": {
      "url": "$url.sha256"
    },
    "extract_dir": "jdk-$matchVersion"
  }
}
```

- [mysql](https://github.com/ScoopInstaller/Main/blob/master/bucket/mysql.json)

```json
{
  "autoupdate": {
    "architecture": {
      "64bit": {
        "url": "https://dev.mysql.com/get/Downloads/MySQL-$majorVersion.$minorVersion/mysql-$version-winx64.zip",
        "extract_dir": "mysql-$version-winx64",
        "hash": {
          "url": "https://dev.mysql.com/downloads/mysql/",
          "find": "md5\">([A-Fa-f\\d]{32})"
        }
      }
    }
  }
}
```

### Properties of `autoupdate`

All the properties except `autoupdate.note` can be set globally for all architectures or for each architecture separately (under `architecture.64bit` or `architecture.32bit`). Global properties can be used to update each architectural properties, i.e., if only setted globally, `autoupdate.url` is used to update either `architecture.64bit.url` or `architecture.32bit.url`.

- `url`: "uri". An URL template for generating the new url
  - **scoop** will rename files by appending `#/dl.7z` or `#/pngcrush.exe` to the URL (useful for extracting installers or renaming executables version string)
  - Supports [captured variables](#captured-variables)
  - Supports [version variables](#version-variables)
- `hash`: "object". Set this [property](#adding-hash-to-autoupdate) for obtaining hash values without download the actual files
- `extract_dir`: "string". Option to update `extract_dir`
  - Supports [captured variables](#captured-variables)
  - Supports [version variables](#version-variables)
- `note`: "string". Optional message to be displayed when the autoupdate command is run

## Adding `hash` to `autoupdate`

There are several ways to obtain the hash of the new file. If the app provider publishes hash values it is possible to extract these from their website or hashfile. If nothing is defined or something goes wrong while getting the hash values the target files will be downloaded and hashed locally.

Hash value can be directly extracted by the following method (`autoupdate.hash.mode`):

- Using RegEx for plain text file or webpage (`extract`, _predefined `fosshub`, `sourceforge`_)
- Using JSONPath for JSON file (`json`)
- Using XPath for XML file (`xpath`)
- Using Digest for RDF file (`rdf`)
- Using download header or `.meta4` for [Metalink](http://www.metalinker.org) (`metalink`)

### Specifying URL in `hash.url`

`url` in `hash` property accepts URL with [captured variables](#captured-variables), [version variables](#version-variables) or [URL variables](#url-variables).

- Use [captured variables](#captured-variables). Example: [qemu](https://github.com/ScoopInstaller/Main/blob/master/bucket/qemu.json)

```json
{
  "checkver": {
    "re": "<strong>(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})</strong>: New QEMU installers \\((?<version>[\\d.a-z\\-]+)\\)"
  },
  "autoupdate": {
    "architecture": {
      "64bit": {
        "url": "https://qemu.weilnetz.de/w64/qemu-w64-setup-$matchYear$matchMonth$matchDay.exe#/dl.7z",
        "hash": {
          "url": "https://qemu.weilnetz.de/w64/qemu-w64-setup-$matchYear$matchMonth$matchDay.sha512"
        }
      },
      "32bit": {
        "url": "https://qemu.weilnetz.de/w32/qemu-w32-setup-$matchYear$matchMonth$matchDay.exe#/dl.7z",
        "hash": {
          "url": "https://qemu.weilnetz.de/w32/qemu-w32-setup-$matchYear$matchMonth$matchDay.sha512"
        }
      }
    }
  }
}
```

- Use [version variables](#version-variables). Example: [julia](https://github.com/ScoopInstaller/Main/blob/master/julia.json)

```json
{
  "hash": {
    "url": "https://julialang-s3.julialang.org/bin/checksums/julia-$version.sha256"
  }
}
```

- Use [URL variables](#url-variables) and append suffix to it. Example: [apache](https://github.com/ScoopInstaller/Main/blob/master/apache.json)

```json
{
  "hash": {
    "url": "$url_fossies.sha256"
  }
}
```

### Getting hash from plain text file or webpage

If the app provider publishes hash value in a plain text file or on some webpage, `checkver.ps1` could extract it by using proper RegEx.

#### Using Built-in RegEx in `autoupdate.hash`

There are some _default_ RegEx that built in **scoop**, i.e., `^([a-fA-F0-9]+)$` and `([a-fA-F0-9]{32,128})[\x20\t]+.*$basename(?:[\x20\t]+\d+)?`.

```powershell
# ^([a-fA-F0-9]+)$
abcdef0123456789abcdef0123456789abcdef01
# ([a-fA-F0-9]{32,128})[\x20\t]+.*`$basename(?:[\x20\t]+\d+)?
abcdef0123456789abcdef0123456789abcdef01 *example.zip
```

See [above](#specifying-url-in-hashurl) for examples.

#### Using customized RegEx in `autoupdate.hash`

If built-in RegEx is not suitable, customized RegEx could be used to extract hash value. [Hash variables](#hash-variables) (`$md5`, `$sha1`, `$sha256`, and etc.) could be used to simplify the expression.

- [curl](https://github.com/ScoopInstaller/Main/blob/master/bucket/curl.json)

```json
{
  "hash": {
    "url": "$baseurl/hashes.txt",
    "find": "SHA256\\($basename\\)=\\s+([a-fA-F\\d]{64})"
  }
}
```

- [python](https://github.com/ScoopInstaller/Main/blob/master/bucket/python.json)

```json
{
  "hash": {
    "url": "https://www.python.org/downloads/release/python-$cleanVersion/",
    "find": "$basename[\\S\\s]+?$md5"
  }
}
```

#### Special cases for FossHub and SourceForge

There are two predefined special cases: [FossHub](https://www.fosshub.com) and [SourceForge](https://sourceforge.net).

- FossHub
  - URL pattern: `^(?:.*fosshub.com\/).*(?:\/|\?dwl=)(?<filename>.*)$`
    - `https://www.fosshub.com/Calibre.html?dwl=calibre-64bit-3.44.0.msi`
    - `https://www.fosshub.com/Calibre.html/calibre-64bit-3.44.0.msi`
  - RegEx: `$basename.*?"sha256":"([a-fA-F0-9]{64})"`
- SourceForge
  - URL pattern: `(?:downloads\.)?sourceforge.net\/projects?\/(?<project>[^\/]+)\/(?:files\/)?(?<file>.*)`
    - `https://downloads.sourceforge.net/project/nsis/NSIS%203/3.04/nsis-3.04.zip`
    - `https://sourceforge.net/projects/nsis/files/NSIS%203/3.04/nsis-3.04.zip`
  - RegEx: `"$basename":.*?"sha1":\s"([a-fA-F0-9]{40})"`

For `autoupdate.url`s that match above patterns, hash mode is setted to `fosshub` or `sourceforge` automatically and `hash` property is not needed.

- [calibre](https://github.com/ScoopInstaller/Main/blob/master/bucket/curl.json)

```json
{
  "autoupdate": {
    "url": "https://www.fosshub.com/Calibre.html/calibre-portable-installer-$version.exe"
  }
}
```

- [nsis](https://github.com/lukesampson/scoop-extras/blob/master/bucket/nsis.json)

```json
{
  "autoupdate": {
    "url": "https://downloads.sourceforge.net/project/nsis/NSIS%20$majorVersion/$version/nsis-$version.zip",
    "extract_dir": "nsis-$version"
  }
}
```

### Getting hash from JSON file

For JSON file, use a JSON endpoint with [JSONPath expressions](https://goessner.net/articles/JsonPath/) to retrieve the hash. Either dot-notation or bracket-notation can be used. Example: [openssl](https://github.com/ScoopInstaller/Main/blob/master/bucket/openssl.json)

```json
{
  "hash": {
    "mode": "json",
    "jp": "$.files.['$basename'].sha512",
    "url": "$baseurl/win32_openssl_hashes.json"
  }
}
```

There could be a JSONPath query in `autoupdate.hash.jsonpath`, and so does RegEx ([sample reference](https://www.newtonsoft.com/json/help/html/RegexQuery.htm)). Example: [mro](https://github.com/ScoopInstaller/Main/blob/master/bucket/mro.json)

```json
{
  "hash": {
    "mode": "json",
    "jsonpath": "$..versions[?(@.downloadText == '$basename')].sha256",
    "url": "https://mranapi.azurewebsites.net/api/download"
  }
}
```

### Getting hash from XML file

Use XPath to retrieve the hash from a XML file. Example: [googlechrome](https://github.com/h404bi/dorado/blob/master/bucket/googlechrome.json)

```json
{
  "hash": {
    "url": "https://lab.skk.moe/chrome/api/chrome.min.xml",
    "xpath": "/chromechecker/stable64[version=\"$version\"]/sha256"
  }
}
```

### Getting hash from RDF file

[Resource Description Framework (RDF)](https://www.w3.org/TR/rdf11-concepts/) is a framework for representing information in the Web. Hash value could be extracted from RDF file. Example: [imagemagick](https://github.com/ScoopInstaller/Main/blob/master/bucket/imagemagick.json)

```json
{
  "hash": {
    "mode": "rdf",
    "url": "https://www.imagemagick.org/download/binaries/digest.rdf"
  }
}
```

### Getting hash from from Metalink

[Metalink](http://www.metalinker.org/) is an Internet standard that harnesses the speed and power of peer to peer networking and traditional downloads with a single click. For download URL that supported Metalink, hash value could be retrieved from download URL's header or a `.meta4` file. Example: [libreoffice-fresh](https://github.com/lukesampson/scoop-extras/blob/master/bucket/libreoffice-fresh.json)

```json
{
  "hash": {
    "mode": "metalink"
  }
}
```

### Properties of `autoupdate.hash`

All the properties can be set globally for all architectures or for each architecture separately

- `mode`: "String | Enum".
  - **`extract`**: Extract from a plain text file or webpage by RegEx (Default, can be omitted)
  - `json`: Extract from a JSON file by JSONPath
  - `xpath`: Extract from a XML file by XPath
  - `rdf`: Extract from a RDF file
  - `metalink`: Extract from Metalink's header or `.meta4` file
  - `fosshub`: _Automatic_. Predefined for FossHub
  - `sourceforge`: _Automatic_. Predefined for SourceForge
  - `download`: Downloads the app file and hash it locally (Fallback)
- `url`: "Uri". URL template for downloading RDF/JSON files or extracting hashes
  - Supports [captured variables](#captured-variables)
  - Supports [version variables](#version-variables)
  - Supports [URL variables](#url-variables)
- `regex|find`: "Regex". RegEx expression to extract the hash
  - Defaults: `^([a-fA-F0-9]+)$` and `([a-fA-F0-9]{32,128})[\x20\t]+.*$basename(?:[\x20\t]+\d+)?`
  - Supports [captured variables](#captured-variables)
  - Supports [version Variables](#version-variables)
  - Supports [URL variables](#url-variables)
  - Supports [hash variables](#hash-variables)
- `jsonpath|jp`: "JSONPath". JSONPath expression to extract the hash
  - Supports [captured variables](#captured-variables)
  - Supports [version Variables](#version-variables)
  - Supports [URL variables](#url-variables)
- `xpath`: "String". XPath expression to extract the hash
  - Supports [captured variables](#captured-variables)
  - Supports [version Variables](#version-variables)
  - Supports [URL variables](#url-variables)
- _`type`: "String | Enum". Deprecated. Hash type is determined automatically_

## Internal substitutable variables

### Captured variables

- Used in `checkver.replace`
  - `${1}`, `${2}`, `${3}`...: Unnamed groups
  - `${name1}`, `${Name2}`, `${NAME3}`...: Named groups
    - `(?<name1>...)`, `(?<Name2>...)`, `(?<NAME3>...)`...
- Used in `autoupdate`
  - `$match1`, `$match2`, `$match3`...: Unnamed groups
  - `$matchName1`, `$matchName2`, `$matchName3`...: Named groups
    - `(?<name1>...)`, `(?<Name2>...)`, `(?<NAME3>...)`...
    - _Notice the only uppercase character in variable name_

### Version variables

- `$version`: `3.7.1`
- `$underscoreVersion`: `3_7_1`
- `$dashVersion`: `3-7-1`
- `$cleanVersion`: `371`
- The `$version` (e.g. `3.7.1.2`) is splitted on each `.` and is assigned to:
  - `$majorVersion`: `3`
  - `$minorVersion`: `7`
  - `$patchVersion`: `1`
  - `$buildVersion`: `2`
- `$matchHead`: Returns first two or three digits seperated by a dot (e.g. `3.7.1-rc.1` = `3.7.1` , `3.7.1.2-rc.1` = `3.7.1` or `3.7-rc.1` = `3.7`)
- `$matchTail`: Returns the rest of `$matchHead` (e.g. `3.7.1-rc.1` = `-rc.1` , `3.7.1.2-rc.1` = `.2-rc.1` or `3.7-rc.1` = `-rc.1`)
- `$preReleaseVersion`: Everything after the last `-` (e.g. `3.7.1-rc.1` would result in `rc.1`)
- Each capturing group in the [`checkver` property](#adding-checkver-to-a-manifest) adds a `$matchX` variable (named groups are allowed). Matching `v3.7.1/3.7` with [`v(?<version>[\d.]+)\/(?<short>[\d.]+)`](https://regex101.com/r/M7RP3p/1) would result in:
  - `$match1` or `$matchVersion`: `3.7.1`
  - `$match2` or `$matchShort`: `3.7`

### URL variables

- `$url`: autoupdate URL without fragments (`#/dl.7z`) [e.g. `http://example.com/path/file.exe`]
- `$baseurl`: autoupdate URL without filename and fragments (`#/dl.7z`) [e.g. `http://example.com/path`]
- `$basename`: filename from autoupdate URL (ignores fragments `#/dl.7z`)

### Hash variables

- `$md5`: `([a-fA-F0-9]{32})` MD5 hash type
- `$sha1`: `([a-fA-F0-9]{40})` SHA-1 hash type
- `$sha256`: `([a-fA-F0-9]{64})` SHA-256 hash type
- `$sha512`: `([a-fA-F0-9]{128})` SHA-512 hash type
- `$checksum`: `([a-fA-F0-9]{32,128})` MD5, SHA-1, SHA-256 or SHA-512 hash type
- `$base64`: `([a-zA-Z0-9+\/=]{24,88})` BASE64 encoded checksum (can be MD5, SHA-1, SHA-256 or SHA-512)

## Limitations

There are some complex manifests which reach the limits of the current autoupdate implementation, mainly because `autoupdate` only update `url`, `hash` and `extract_dir`. (_The list of affected manifests is incomplete_)

- The binaries specified in the `bin` or `shortcuts` change with the version number. Example: [gimp](https://github.com/lukesampson/scoop-extras/blob/master/bucket/gimp.json)
- There are multiple `url`s needed to be updated. Example: [coreutils](https://github.com/ScoopInstaller/Main/blob/master/bucket/coreutils.json)

## Testing and running autoupdate

If you want to confirm an autoupdate works, e.g. after adding it to an existing manifest or creating a new one, change the `version` field to a lower or different version and then run `checkver.ps1` or use the `-f` parameter.

```powershell
cd <bucket repository>
scoop config debug $true
.\bin\checkver.ps1 <app> -u
```

Check if the `url`, `hash` and `extract_dir` properties have the correct values. Try to install/uninstall the app and submit your changes.

Manifests in some known buckets are autoupdated by [ScoopInstaller/Excavator](https://github.com/ScoopInstaller/Excavator), so if you want some apps being autoupdated, migrate them to one of these buckets or run an instance of the excavator yourself.

- [`main`](https://github.com/ScoopInstaller/Main): Update per hour
- [`extras`](https://github.com/lukesampson/scoop-extras): Update per hour
- [`versions`](https://github.com/ScoopInstaller/Versions): Update per day
- [`java`](https://github.com/ScoopInstaller/Java): Update per day
- [`php`](https://github.com/ScoopInstaller/PHP): Update per day
- [`games`](https://github.com/Calinou/scoop-games): Update per day

## Example Workflow with **scoop** status/update

`scoop status` compares your installed version against the current copy of **scoop** and bucket repositories on your machine. If these are not updated it will output wrong version information. e.g.:

- installed version: 2.1.2
- local **scoop** version: 2.1.3
- online repo version: 2.1.4

`scoop status` will show version 2.1.3

Running `scoop update` before `scoop status` is recommended (which is enforced every 3 hours), then it will show currect version 2.1.4.

`scoop update` just `git pull`s **scoop** core repo to `~\scoop\apps\scoop\current` and every configured bucket to `~\scoop\buckets\<name>` (incl. default main bucket)

`bin\checkver.ps1` is only for maintenance and updating the manifests so they can be committed to the repo.

Example Workflow:

```powershell
cd <bucket repository>
.\bin\checkver * -u # updates all manifest in the repo
git commit -m "Updated apps"
git push
scoop update
scoop status
scoop update <app>
```
