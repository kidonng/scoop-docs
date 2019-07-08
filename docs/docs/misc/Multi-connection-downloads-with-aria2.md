# Multi-connection downloads with `aria2`

Scoop can utilize [`aria2`](https://github.com/aria2/aria2) to use multi-connection downloads. Simply install `aria2` through Scoop and it will be used for all downloads afterward.

```powershell
scoop install aria2
```

You can tweak the following `aria2` settings with the `scoop config` command:

- aria2-enabled (default: true)
- [aria2-retry-wait](https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-retry-wait) (default: 2)
- [aria2-split](https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-s) (default: 5)
- [aria2-max-connection-per-server](https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-x) (default: 5)
- [aria2-min-split-size](https://aria2.github.io/manual/en/html/aria2c.html#cmdoption-k) (default: 5M)
