# xLib

### Container

**Create Container**

```bash
nerdctl compose -f .\container\xLib-compose.yml --env-file .\container\dbcredentials.env up -d
```

**Stop Container**

```bash
nerdctl compose -f .\container\xLib-compose.yml --env-file .\container\dbcredentials.env down
```

### Migration

If you would like to use Postgres Server, you will need to update WebUI/appsettings.json as follows:

```json
"UseInMemoryDatabase": false,
```

**Add New Migration**

```bash
dotnet ef migrations add "InitialMigration" --project .\src\xLib.Infastructure --startup-project .\src\xLib.WebApp --output-dir Persistence\Migrations
```

**Revert Migration**

```bash
dotnet ef migrations remove --project .\src\xLib.Infastructure --startup-project .\src\xLib.WebApp
```
