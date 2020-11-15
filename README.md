# serverless project

Personal project to play with serverless framework

## Serverless Framework Documentation
https://www.serverless.com/framework/docs/


## Application Architecture
<img src="images/diagram.png"> 

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

Deploy this application
```
sls deploy --email <EMAIL>

optional: --stage prod (dev is default)
```
>**< EMAIL> is the veriified e-mail used as a sender*


Deploy a single function
```
sls deploy -f <functionName>
```

Display information about the service
```
sls info -v
```
