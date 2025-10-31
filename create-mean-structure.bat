@echo off
:: Create MEAN To-Do List Project Structure

mkdir todo-app
cd todo-app

:: Backend folders
mkdir backend
cd backend
mkdir config controllers models routes
cd ..

:: Frontend folders
mkdir frontend
cd frontend
mkdir src
cd src
mkdir app environments
cd app
mkdir todo-list add-todo
cd ../../../

:: Confirm creation
echo.
echo ✅ MEAN To-Do List Folder Structure Created Successfully!
tree /f
pause
