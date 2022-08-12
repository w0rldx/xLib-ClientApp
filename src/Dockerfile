#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["xLib.WebApp/xLib.WebApp.csproj", "xLib.WebApp/"]
COPY ["xLib.Application/xLib.Application.csproj", "xLib.Application/"]
COPY ["xLib.Domain/xLib.Domain.csproj", "xLib.Domain/"]
COPY ["xLib.Infastructure/xLib.Infastructure.csproj", "xLib.Infastructure/"]
RUN dotnet restore "xLib.WebApp/xLib.WebApp.csproj"
COPY . .
WORKDIR "/src/xLib.WebApp"
RUN dotnet build "xLib.WebApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "xLib.WebApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "xLib.WebApp.dll"]