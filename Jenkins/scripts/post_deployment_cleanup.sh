#!/bin/bash
#
docker container prune --force \
    && docker image prune --all --force