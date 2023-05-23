#!/bin/bash
echo $ghcr_PAT | docker login ghcr.io -u $ghcr_USER --password-stdin
docker push ghcr.io/srini-ca/finsecops:$BUILD_ID
## echo "Built image pushed..."
