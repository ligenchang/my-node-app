# CI/CD Pipeline - CircleCI

The application uses CircleCI for Continuous Integration and Deployment.

## Jobs

- **build**: Installs Node.js dependencies and caches them
- **deploy**: Deploys the app to AWS Elastic Beanstalk

## Deployment Details

- Deploys from latest commit to the default EB environment.
- Uses the EB CLI (`eb deploy`) directly from the repo.
- Deploy URL is shown using `eb status`.

## Workflow

```yaml
workflows:
  build_and_deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build
```


## Secrets Set in CircleCI:

AWS_ACCESS_KEY_ID

AWS_SECRET_ACCESS_KEY

AWS_SESSION_TOKEN

AWS_DEFAULT_REGION

EB_APP_NAME

EB_ENV_NAME
