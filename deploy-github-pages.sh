#!/bin/bash

# Build the application
npm run build

# Create docs folder (GitHub Pages requirement)
mkdir -p docs

# Copy the built files to docs
cp -r out/* docs/

# Create CNAME file if you have a custom domain
# echo "yourdomain.com" > docs/CNAME

echo "Build complete! Upload the 'docs' folder to GitHub Pages."
