# serverless project

Personal project to play with serverless framework

## Useful commands

Setup serverless framework
```
npm install -g serverless

serverless config credentials --provider aws --key <KEY> --secret <SECRET_KEY> --profile <PROFILE_ALIAS>
```

Create new project
```
serverless create --template aws-nodejs --path serveless-project
```

Deploy application
```
sls deploy
```

Deploy function
```
sls deploy -f <functionName>
```