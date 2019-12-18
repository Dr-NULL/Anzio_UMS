@echo off
cls
goto %1

:migration
rmdir /q /s dist
mkdir dist
call tsc
call npx typeorm %*
echo ^>^> TypeORM Cli
echo -^> Listo!
exit

:mg
echo -^> Custom Migration Manager
echo    Command: %2
echo    ------------------------
goto cmd-%2  

:cmd-rebuild
for /r %%f in (src/migrations/*.*) do (
    call npx typeorm migration:revert
)
call npx typeorm migration:run
call npm start seeds
echo ^>^> TypeORM Cli
echo  - Base de Datos reestructurada!
exit

:cmd-clear
for /r %%f in (src/migrations/*.*) do (
    call npx typeorm migration:revert
)

cd src/migrations
for /r %%f in (*.*) do (
    del /f %%f
)
echo ^>^> TypeORM Cli
echo  - Base de Datos Eliminada!
echo  - Migraciones eliminadas!
exit