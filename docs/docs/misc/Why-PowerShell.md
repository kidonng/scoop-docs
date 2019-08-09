# Why PowerShell?

Scoop tries to "just work" whether you run it from PowerShell or CMD, but **I recommend using PowerShell** instead. Here's why.

## Yes, PowerShell has problems

- The `Verb-Noun` verbosity, commands that were seemingly not designed to be typed
- The ISE—a GUI for a command line interface. I know the commands are hard to type—but is point-and-clicking a solution?
- The name PowerShell, and the unofficial abbreviation PoSH. Cringe.
- &ldquo;Everything's an object!&rdquo; ends up feeling clumsy. Sometimes text is just easier to work with. Support for primitives, arrays and hashes would have been enough.
- Modules. Who knows how they work?
- Doesn't seem like a first class shell within Windows
- The built-in parameter parsing isn't good
- A heavy "sysadmin" feel that makes developers/DevOps sad

## Nevertheless...

You should still use PowerShell. Why? Because you can ignore most of these problems, and you're still left with a great, flexible, dynamic, functional scripting language.

You don't have to write `Verb-Noun` "cmdlets", just write a script. Return text from your PowerShell scripts if you want —— because text is the universal interface. Parse your own parameters (or dot-source [getopt](https://github.com/lukesampson/psutils/blob/master/getopt.ps1)). If someone mentions PoSH, ridicule them publicly (kidding).

So once you ignore the bad points, what are you left with?

- **A very capable programming environment**, much more so than cmd.exe.
- **A fast REPL** (like ScriptCS, but easier and more dynamic)
- **The only scripting language that you can rely on being installed on Windows**
- **Great language support for primitive types, arrays and hashes**
- **The feeling of pride that comes from using an obscure shell**. Zsh? Fish? Pfft. Virtually _no-one_ uses PowerShell (not sure on the actual numbers there).

Yes, you're stuck using the ancient and seemingly-forgotten Windows Console, but you can get that working fairly nicely with [a little customization](../guides/Theming-Powershell.md).
