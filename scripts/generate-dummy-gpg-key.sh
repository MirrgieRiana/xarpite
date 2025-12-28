#!/usr/bin/env bash

# Script to generate a dummy GPG key for testing Maven artifact signing
# This creates a test key that should NOT be used for production releases

set -e

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
OUTPUT_DIR="$SCRIPT_DIR/../build/gpg-test"

echo "=== Generating Dummy GPG Key for Testing ==="
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Generate key configuration
cat > "$OUTPUT_DIR/gpg-key-config" <<EOF
%echo Generating a dummy GPG key for testing
Key-Type: RSA
Key-Length: 2048
Subkey-Type: RSA
Subkey-Length: 2048
Name-Real: Xarpite Test Key
Name-Email: test@xarpite.example.com
Expire-Date: 0
%no-protection
%commit
%echo Done
EOF

# Generate the key
echo "Generating GPG key..."
gpg --batch --gen-key "$OUTPUT_DIR/gpg-key-config"

# Get the key ID
KEY_ID=$(gpg --list-secret-keys --keyid-format LONG "test@xarpite.example.com" | grep sec | awk '{print $2}' | cut -d'/' -f2)

echo ""
echo "=== Key Generated ==="
echo "Key ID: $KEY_ID"
echo ""

# Export the private key
echo "Exporting private key..."
gpg --armor --export-secret-keys "$KEY_ID" > "$OUTPUT_DIR/private-key.asc"

# Export the public key
echo "Exporting public key..."
gpg --armor --export "$KEY_ID" > "$OUTPUT_DIR/public-key.asc"

# Create base64-encoded version for environment variable
echo "Creating base64-encoded private key..."
base64 -w 0 "$OUTPUT_DIR/private-key.asc" > "$OUTPUT_DIR/private-key-base64.txt"

echo ""
echo "=== Files Created ==="
echo "Private key: $OUTPUT_DIR/private-key.asc"
echo "Public key: $OUTPUT_DIR/public-key.asc"
echo "Base64-encoded private key: $OUTPUT_DIR/private-key-base64.txt"
echo ""
echo "=== Testing Instructions ==="
echo "To test signing locally, set these environment variables:"
echo ""
echo "export GPG_SIGNING_KEY=\$(cat $OUTPUT_DIR/private-key-base64.txt)"
echo "export GPG_SIGNING_PASSWORD=\"\""
echo ""
echo "Then run:"
echo "./gradlew publishXarpiteBinAllPublicationToBuildLocalRepository"
echo ""
echo "=== CI/CD Setup ==="
echo "For GitHub Actions, add these secrets:"
echo "- GPG_SIGNING_KEY: content of private-key-base64.txt"
echo "- GPG_SIGNING_PASSWORD: your key password (empty for this test key)"
echo ""
