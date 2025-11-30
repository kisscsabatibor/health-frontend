# HealthFrontend

Front-end part of the project Health

## Running

### ng serve (needs a running backend on localhost:3000)

```
npm i
ng s
```

### Development docker (needs a running backend on localhost:3000)

```
docker build -t health-frontend-dev --build-arg CONFIG=development .
docker run -p 4200:80 health-frontend-dev
```

### Production docker (connects directly to deployed backend)

```
docker build -t health-frontend-prod .
docker run -p 4200:80 health-frontend-prod
```
