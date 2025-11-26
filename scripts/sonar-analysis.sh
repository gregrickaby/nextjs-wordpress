#!/bin/bash

# SonarQube Analysis Script

# Check if sonar-scanner is installed
if ! command -v sonar-scanner &> /dev/null; then
  echo "❌ sonar-scanner is not installed"
  echo "Install it with: brew install sonar-scanner"
  exit 1
fi

# Load environment variables from .env file
if [ -f .env ]; then
  echo "🔑 Loading environment variables from .env..."
  set -a
  source .env
  set +a
else
  echo "⚠️  No .env file found. Make sure SONAR_TOKEN is set."
fi

echo "📊 Running test coverage..."
npm run test:coverage

# Store coverage exit code but continue
COVERAGE_EXIT=$?
if [ $COVERAGE_EXIT -ne 0 ]; then
  echo "⚠️  Coverage exited with code $COVERAGE_EXIT (continuing anyway)"
fi

echo ""
echo "🔍 Starting SonarQube analysis..."
sonar-scanner

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ SonarQube analysis complete!"
else
  echo ""
  echo "❌ SonarQube analysis failed"
  exit 1
fi
