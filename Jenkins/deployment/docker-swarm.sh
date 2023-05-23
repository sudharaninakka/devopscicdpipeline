#!/bin/bash
#
docker image pull nginx:latest \
    && docker image pull ghcr.io/srini-ca/finsecops:latest ##\
##    && docker service update --image ghcr.io/sudha-ca/finsecops:latest finsecops_frontend
