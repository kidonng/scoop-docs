# Java

## Choice of JDKs

Java development kits (JDK) and runtime environments (JRE) are available through the [Scoop Java bucket](https://github.com/ScoopInstaller/Java).

To add the bucket, run:

```powershell
scoop bucket add java
```

### OpenJDK

[OpenJDK](http://openjdk.java.net) is the preferred JDK (because of its Open Source [license](http://openjdk.java.net/legal/gplv2+ce.html)).

The Scoop Java bucket contains five different OpenJDK builds.

#### Oracle OpenJDK

Oracle's OpenJDK version ([openjdk.json](https://github.com/ScoopInstaller/Java/blob/master/bucket/openjdk.json)) can be installed with:

```powershell
scoop install openjdk
```

#### AdoptOpenJDK

[AdoptOpenJDK](https://adoptopenjdk.net) has versions with HotSpot and Eclipse OpenJ9 JVMs.

##### Oracle HotSpot JVM

- AdoptOpenJDK 12 with Oracle HotSpot JVM

  [adopt12-hotspot.json](https://github.com/ScoopInstaller/Java/blob/master/bucket/adopt12-hotspot.json) can be installed with:

  ```powershell
  scoop install adopt12-hotspot
  ```

- AdoptOpenJDK 12 JRE with Oracle HotSpot JVM (runtime environment)

  [adopt12-hotspot-jre.json](https://github.com/ScoopInstaller/Java/blob/master/bucket/adopt12-hotspot-jre.json) can be installed with:

  ```powershell
  scoop install adopt12-hotspot-jre
  ```

##### Eclipse OpenJ9 JVM

- AdoptOpenJDK 12 with Eclipse OpenJ9 JVM

  [adopt12-openj9.json](https://github.com/ScoopInstaller/Java/blob/master/bucket/adopt12-hotspot-jre.json) can be installed with:

  ```powershell
  scoop install adopt12-openj9
  ```

- AdoptOpenJDK 12 JRE with Eclipse OpenJ9 JVM (runtime environment)

  [adopt12-openj9-jre.json](https://github.com/ScoopInstaller/Java/blob/master/bucket/adopt12-hotspot-jre.json) can be installed with:

  ```powershell
  scoop install adopt12-openj9-jre
  ```

#### Zulu

- [Zulu](https://www.azul.com/products/zulu-and-zulu-enterprise)

#### ojdkbuild

- [ojdkbuild](https://github.com/ojdkbuild/ojdkbuild)

#### Amazon Corretto

- [Amazon Corretto](https://aws.amazon.com/corretto)

### Oracle JDK

[Oracle’s Java](https://www.oracle.com/technetwork/java/index.html) is also available in the [oraclejdk](https://github.com/ScoopInstaller/Java/blob/master/bucket/oraclejdk.json) manifest.

## Switching Javas

There are two solutions available today for switching java:

1. `scoop reset <java>[@<version>]`
2. Using [find-java](https://github.com/lukesampson/scoop-extras/blob/master/bucket/find-java.json) from [extras](https://github.com/lukesampson/scoop-extras)

`scoop reset` works very well for the current session, and will also update the user's path.

Globally installed javas takes precedence over user-installed javas, so running `sudo scoop install -g oraclejdk-lts` will install a java that is always default for new sessions.

### Example of switching between versions

```
PS C:> scoop install oraclejdk
Installing 'oraclejdk' (12.0.2-10) [64bit]

PS C:> scoop install zulu6
Installing 'zulu6' (6.18.1.5) [64bit]

PS C:> scoop install openjdk10
Installing 'openjdk10' (10.0.1) [64bit]

PS C:> java -version
openjdk version "10.0.1" 2018-04-17
OpenJDK Runtime Environment (build 10.0.1+10)
OpenJDK 64-Bit Server VM (build 10.0.1+10, mixed mode)

PS C:> scoop reset zulu6
Resetting zulu6 (6.18.1.5).
Linking ~\scoop\apps\zulu6\current => ~\scoop\apps\zulu6\6.18.1.5

PS C:> java -version
openjdk version "1.6.0-99"
OpenJDK Runtime Environment (Zulu 6.18.1.5-win64) (build 1.6.0-99-b99)
OpenJDK 64-Bit Server VM (Zulu 6.18.1.5-win64) (build 23.77-b99, mixed mode)

PS C:> scoop reset oraclejdk

PS C:> java -version
java version "12.0.2" 2019-07-16
Java(TM) SE Runtime Environment (build 12.0.2+10)
Java HotSpot(TM) 64-Bit Server VM (build 12.0.2+10, mixed mode, sharing)
```
