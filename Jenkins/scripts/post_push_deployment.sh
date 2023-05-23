#!/bin/bash

# Set the Jenkins build ID as an environment variable
JENKINS_BUILD_ID=$BUILD_ID

# Replace the image tag in the Docker Compose file with the Jenkins build ID
sed -i "s/ghcr.io\/srini-ca\/finsecops:.*/ghcr.io\/srini-ca\/finsecops:$JENKINS_BUILD_ID/g" Jenkins/deployment/docker-swarm.sh
sed -i "s/image: ghcr.io\/srini-ca\/finsecops:.*/image: ghcr.io\/srini-ca\/finsecops:$JENKINS_BUILD_ID/g" Jenkins/deployment/docker-compose.yaml

# Check whether the changes have reflected
cat Jenkins/deployment/docker-swarm.sh
cat Jenkins/deployment/docker-compose.yaml

# Execute the Ansible playbook which will update the docker-compose.yaml existing on the remote host
ansible-playbook -i /tmp/workspace/finsecops_main/Jenkins/ansible/inventory.yaml /tmp/workspace/finsecops_main/Jenkins/ansible/playbooks/finsecops.yaml