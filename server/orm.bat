@echo off

rem compilar todo
rmdir /q /s "build"

rem ejecutar typeorm
call tsc
npx typeorm %*