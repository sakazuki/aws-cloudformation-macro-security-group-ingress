# AWS CloudFormation Macro for SecurityGroupIngress

## How to Deploy

```
S3_BUCKETNAME=XXXXX
STACK_NAME=XXXXX
aws cloudformation package --template-file macro.yml --s3-bucket ${S3_BUCKETNAME} --output-template-file macro-output.yml
aws cloudformation deploy --template-file macro-output.yml --stack-name ${STACK_NAME} --capabilities CAPABILITY_IAM
```

## Usage in cloudformation template

```cf-macro-example.yml
AWSTemplateFormatVersion: 2010-09-09
Parameters:
  SGName:
    Type: String
    Description: Security Group Name
    Default: SAMPLE
  AllowPorts:
    Type: CommaDelimitedList
    Description: Allow inbound ports
    Default: "80,443,8000-8003"
  AllowCidr:
    Type: String
    Description: Allow CIDR
    Default: "0.0.0.0/0"

Resources:
  ServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupName: !Ref SGName
      GroupDescription: allow connections from any
      SecurityGroupIngress:
        Fn::Transform:
          Name: SGIngressPorts
          Parameters:
            AllowPorts: !Ref AllowPorts
            AllowCidr: !Ref AllowCidr
```

## Refs
- https://dev.classmethod.jp/articles/craete-log-group-by-cfnmacro/
