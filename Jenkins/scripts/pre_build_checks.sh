#!/bin/bash

# Get the current usage of the "/" partition
usage=$(df -h / | awk '{print $5}' | tail -n 1 | sed 's/%//')

# Check if the usage is below 70%
if [ $usage -lt 70 ]; then
  # Announce that the Build process can be initiated
  echo "Disk usage is below 70%, Build process will be initiated..."

# Check if the usage is exactly at 70%
elif [ $usage -eq 70 ]; then
  # Announce the cleanup
  echo "Disk usage is at 70%, Initiating cleanup..."

  # Cleaning the environment of dangling images and build cache layers
  docker image prune --force && docker builder prune --force

# Check if the usage is above 70%
else
  # Announce the cleanup
  echo "Disk usage is above 70%, Initiating cleanup..."

  # Cleaning the environment of dangling images and build cache layers
  docker image prune --force && docker builder prune --force

  # Get the updated usage of the "/" partition after cleanup
  updated_usage=$(df -h / | awk '{print $5}' | tail -n 1 | sed 's/%//')

  # Fail intentionally if the updated usage is still above 70%
  if [ $updated_usage -gt 70 ]; then
    echo "Disk usage after cleanup is still above 70%, Build process cannot be initiated, Manual intervention requested!!!"
    exit 1
  elif [ $updated_usage -eq 70 ]; then
    echo "Disk usage after cleanup is at 70%, Build process will be initiated with possibilities of failing due to insufficient disk space..."
  else
    echo "Disk usage after cleanup is below 70%, Build process will be initiated..."
  fi
fi