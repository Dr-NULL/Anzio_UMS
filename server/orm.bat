@echo off
goto exec-cli

:exec-cli
rmdir /q /s dist
mkdir dist
call tsc
cls
echo ^>^> TypeORM Cli
npx typeorm %*