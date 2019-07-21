# Docker

## Installing Docker

```powershell
scoop install docker
```

::: tip
Please note that this will not install Docker Engine.
:::

## Using Docker CLI

Connect to Docker Engine with [Docker CLI](https://docs.docker.com/engine/reference/commandline/cli/):

```powershell
docker -H <host:port>
```

The Docker Engine daemon must listen to a [TCP socket](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option).

## Provision Docker Engine with Docker Machine

Requirements: [Virtualbox](https://www.virtualbox.org/), [VMware](https://www.vmware.com/), Hyper-V or any of the [Docker Machine](https://docs.docker.com/machine/overview/) [drivers](https://docs.docker.com/machine/drivers/)

1. Create our Docker base machine (will be named _default_):

```powershell
docker-machine create default
```

2. Each time starting working with Docker

```powershell
docker-machine start
docker-machine env | Invoke-Expression
```

3. Then we can bring up any Docker image

```powershell
docker run ubuntu /bin/echo "Hello world"
```

4. When finished:

```powershell
docker-machine stop
```

5. Getting our Docker machine:

```powershell
docker-machine ls
```

### Accessing from WSL environment

```sh
eval $(docker-machine.exe env docker-host --shell wsl ) && export DOCKER_CERT_PATH=$(wslpath $DOCKER_CERT_PATH)
```
