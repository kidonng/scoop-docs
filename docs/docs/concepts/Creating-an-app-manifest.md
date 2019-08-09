# Creating an App Manifest

If you want to install a program that's not included in Scoop, it's easy to create an [app manifest](App-Manifests.md) yourself.

## A basic example

Here's how to create and install a manifest for an app that says hello, in just a few lines of PowerShell.

```powershell
# write an app manifest to `hello.json`
'{ "version": "1.0", "url": "https://gist.github.com/lukesampson/6446238/raw/hello.ps1", "bin": "hello.ps1" }' > hello.json

# install the app
scoop install hello

# did it work?
hello # -> should output 'Hello, <your-username>!'
```

## Sharing your app

### Share on your network

If you want others on your network to be able to install from your app manifest, you could just put it on a network share location, e.g. `/shared/files/scoop/hello.json`. Then, for others to install your app, you can tell them to run:

```powershell
scoop install /shared/files/scoop/hello.json
```

### Share with the world

If you make your app manifest publicly available on the web, anyone can install it once they know the URL. For example, I've made a GitHub gist for `hello.json` [here](https://gist.github.com/lukesampson/6446567). Now anyone can install it:

```powershell
scoop install https://gist.github.com/lukesampson/6446567/raw/hello.json
```

## Next steps

If you ran some of these examples, you probably noticed a warning saying "no hash in manifest". For reference information on specifying file hashes and much more in your manifests, see the [App Manifests reference](App-Manifests.md).

If you want to maintain a collection of apps, see the page on [Buckets](Buckets.md) for more information.
