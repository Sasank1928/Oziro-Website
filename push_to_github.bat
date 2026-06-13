@echo off
echo ========================================================
echo Pushing Oziro Website to GitHub...
echo ========================================================

cd /d "%~dp0"

echo Initialize Git...
git init

echo Adding files...
git add .

echo Committing...
git commit -m "Initial commit for Oziro Website"

echo Setting branch...
git branch -M main

echo Adding remote...
git remote remove origin 2>nul
git remote add origin https://github.com/Sasank1928/Oziro-Website.git

echo Pushing to GitHub...
echo (A browser window may open asking you to authorize Git)
git push -u origin main

echo ========================================================
echo DONE! If you saw no errors above, your code is on GitHub!
echo You can now go to Vercel to deploy it.
echo ========================================================
pause
