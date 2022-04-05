# xLib

### Container

**Create Container**

```bash
nerdctl compose -f .\docker-compose.yml --env-file .\dbcredentials.env up -d
```

**Stop Container**

```bash
nerdctl compose -f .\docker-compose.yml --env-file .\dbcredentials.env down
```

### Migration

If you would like to use Postgres Server, you will need to update WebUI/appsettings.json as follows:

```json
"UseInMemoryDatabase": false,
```

**Add New Migration**

go to .\src folder and run following inside a terminal

```bash
dotnet ef migrations add "InitialMigration" --project .\xLib.Infastructure --startup-project .\xLib.WebApp --output-dir Persistence\Migrations
```

**Revert Migration**

```bash
dotnet ef migrations remove --project .\xLib.Infastructure --startup-project .\xLib.WebApp
```
