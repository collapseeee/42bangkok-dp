#!/bin/bash

# Check if the user provided any arguments
if [ $# -eq 0 ]; then
    echo "No arguments supplied."
    exit 1
fi

# Loop through the provided folder names
for folder_name in "$@"; do
    # Check if the folder already exists
    if [ -d "ex$folder_name" ]; then
        echo "Folder 'ex$folder_name' already exists."
    else
        # Create the folder with "ex" added to the beginning of the name
        mkdir "ex$folder_name"
    fi
done
