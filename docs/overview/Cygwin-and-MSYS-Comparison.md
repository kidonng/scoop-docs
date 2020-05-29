# How is Scoop different from Cygwin and MSYS?

The most concise description of these 2 projects is an answer by Mike Zick in [this thread](http://sourceforge.net/mailarchive/forum.php?thread_name=200506130821.11185.mszick%40morethan.org&forum_name=mingw-msys).

> Cygwin is an operating system wrapper
> The goal of Cygwin is to provide a Linux Programming API.
>
> Msys is a command shell substitute
> The goal of Msys is to provide a POSIX scripting environment.

It's probably not a completely accurate or comprehensive description, but it is fairly easy to grasp.

So to parallel this for Scoop:

**Scoop is an installer**
**The goal of Scoop is to let you use Unix-y programs in a normal Windows environment**

Using Scoop lets you achieve similar things to Cygwin and MSYS, but without having to learn about and use a separate environment. You can just keep doing what you're already doing but easily access the cross-platform tools you need.

As it happens, a lot of the programs that Scoop installs either come directly from the MinGW/MSYS project, or were built using their tools. Scoop can only hope to achieve its goals because of 15 years of amazing work on MinGW/MSYS, which itself is based on Cygwin.
