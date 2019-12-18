@echo off
cls
goto %1

:migration
rmdir /q /s dist
mkdir dist
call tsc
call npx typeorm %*
cls
echo ^>^> TypeORM Cli
echo -^> Listo!
exit

:rebuild
for /r %%f in (src/migrations/*.*) do (
    call npx typeorm migration:revert
)
call npx typeorm migration:run
call npm start seeds
cls
echo ^>^> TypeORM Cli
echo  - Base de Datos reestructurada!