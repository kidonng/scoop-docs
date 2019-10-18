# Buckets

## What are buckets?

In Scoop, buckets are collections of apps. Or, to be more specific, a bucket is a Git repository containing JSON [app manifests](App-Manifests.md) which describe how to install an app.

Scoop has a [main bucket](https://github.com/ScoopInstaller/Main/tree/master/bucket) which is bundled with Scoop and this is always available as the primary source for installing apps.

By default, when you run `scoop install <app>`, it looks in the main bucket, but it's possible to install from other buckets too.

There's an optional [`extras` bucket](https://github.com/lukesampson/scoop-extras) containing apps that don't quite fit the [criteria of the main bucket](../misc/Criteria-for-including-apps-in-the-main-bucket.md), but are still good to have. There is also an optional [`versions`](https://github.com/ScoopInstaller/Versions) bucket containing older versions of some well-known packages.

And Scoop supports adding other buckets. Anyone can set up their own bucket with their own set of apps, and other people can add and install from this bucket—they just need to know the location of the bucket's Git repository.

## Known buckets

There is a list of known buckets by the community, those can be seen in [`buckets.json`](https://github.com/lukesampson/scoop/blob/master/buckets.json), to see the list of known buckets execute:

```powershell
scoop bucket known
```

Many other application buckets hosted on Github can be found in the [Scoop Directory](https://github.com/rasa/scoop-directory).

## Installing from other buckets

If you want to install from a bucket besides the main one, you need to configure Scoop to know about the bucket. For example, to add the optional `extras` bucket, run:

```powershell
scoop bucket add extras
```

The 'extras' bucket is a [special bucket](https://github.com/ScoopInstaller/Main/blob/master/buckets.json), in that it's "well known", i.e. Scoop already knows where this bucket is so you don't have to specify its location.

Just say the extras bucket wasn't well known, the way you'd add it would be:

```powershell
scoop bucket add extras https://github.com/lukesampson/scoop-extras.git
```

That is,

```powershell
scoop bucket add <name-of-bucket> <location-of-git-repo>
```

You can run `scoop help bucket` for more information on buckets.

## Creating your own bucket

Here's an example of one way you might go about creating a new bucket, using GitHub to host it. You don't have to use GitHub though—you can use whatever source control repo you like, or even just a Git repo on your local or network drive.

1. Create a new GitHub repo called e.g. `my-bucket`
2. Add an app to your bucket. In a powershell session:

```powershell
git clone https://github.com/<your-username>/my-bucket
cd my-bucket
'{ version: "1.0", url: "https://gist.github.com/lukesampson/6446238/raw/hello.ps1", bin: "hello.ps1" }' > hello.json
git add .
git commit -m "add hello app"
git push
```

3. Configure Scoop to use your new bucket:

```powershell
scoop bucket add my-bucket https://github.com/<your-username>/my-bucket
```

4. Check that it works:

```powershell
scoop bucket list # -> you should see "my-bucket"
scoop search hello # -> you should see `hello` listed under, "my-bucket bucket:"
scoop install hello
hello # -> you should see "Hello, <windows-username>!"
```

5. To share your bucket, all you need to do is tell people how to add your bucket, i.e. by running the command in step 3. If you want your bucket listed in the [Scoop Directory](https://github.com/rasa/scoop-directory) , add a topic of `scoop-bucket` to its github page.
