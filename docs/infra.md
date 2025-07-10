# Infrastructure Description

This application is deployed to AWS using Elastic Beanstalk.

## AWS Resources Used

- **Elastic Beanstalk**: Hosts the Node.js application.
- **EC2**: Underlying instances managed by EB.
- **S3**: Used internally by EB to store application versions.
- **IAM**: For permission and credentials management.

### Deployment Region

- `us-east-1`

### Access

- Application URL is output at the end of the deploy job (e.g., `https://<env>.elasticbeanstalk.com`).
