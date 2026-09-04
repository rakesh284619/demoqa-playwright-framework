# ============================================================
# DemoQA Playwright Framework — All Commands Reference
# ============================================================


# ------------------------------------------------------------
# 1. CLONE & SETUP
# ------------------------------------------------------------

# Clone the repository
git clone https://github.com/rakesh284619/demoqa-playwright-framework.git

# Navigate into the project
cd demoqa-playwright-framework

# Install dependencies
npm install

# Install Chromium browser
npx playwright install chromium

# Copy environment template and add your credentials
cp .env.example .env


# ------------------------------------------------------------
# 2. .env FILE CONTENT (fill in your values)
# ------------------------------------------------------------

# DEMOQA_USERNAME=Rakesh284619
# DEMOQA_PASSWORD=Rakesh@123


# ------------------------------------------------------------
# 3. RUN TESTS
# ------------------------------------------------------------

# Run all tests (UI + API)
npm test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run in headed mode (visible browser)
npm run test:headed

# Run in debug mode (Playwright Inspector - step by step)
npm run test:debug

# Run a specific spec file
npx playwright test tests/ui/bookstore.spec.js
npx playwright test tests/api/reqres.spec.js

# Run with verbose list output
npx playwright test --reporter=list

# Run UI test headed with list reporter
npx playwright test tests/ui/bookstore.spec.js --headed --reporter=list

# Run API test with list reporter
npx playwright test tests/api/reqres.spec.js --reporter=list


# ------------------------------------------------------------
# 4. VIEW REPORTS
# ------------------------------------------------------------

# Open HTML test report in browser
npm run report

# Generate HTML report manually
npx playwright test --reporter=html


# ------------------------------------------------------------
# 5. VIEW OUTPUT FILE
# ------------------------------------------------------------

# View book details written during UI test (Windows)
type output\book_details.txt

# View book details written during UI test (Mac/Linux)
cat output/book_details.txt


# ------------------------------------------------------------
# 6. GIT COMMANDS
# ------------------------------------------------------------

# Check git status
git status

# View commit history
git log --oneline

# Push latest changes
git push origin main

# Check remote URL
git remote -v


# ------------------------------------------------------------
# 7. UTILITY COMMANDS
# ------------------------------------------------------------

# Check installed Playwright version
npx playwright --version

# List all available browsers
npx playwright install --list

# Show project dependency tree
npm list

# Check for outdated packages
npm outdated


# ------------------------------------------------------------
# 8. CLEAN UP (if needed)
# ------------------------------------------------------------

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Delete test results and reports
rm -rf test-results playwright-report output
