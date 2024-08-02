#!/bin/bash
echo "Restoring MongoDB data..."
mongorestore -d podcastito /dump
echo "MongoDB data restored."