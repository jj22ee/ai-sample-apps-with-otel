# Guidance

```sh
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_TRACES_EXPORTER=console,otlp
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=https://xray.us-west-1.amazonaws.com/v1/traces
export OTEL_RESOURCE_ATTRIBUTES=service.name=example-application-service-name
export BEDROCK_AWS_SECRET_ACCESS_KEY=<ABC>
export BEDROCK_AWS_ACCESS_KEY_ID=<XYZ>
export AWS_REGION=us-west-1
export AGENT_OBSERVABILITY_ENABLED=true
export OTEL_EXPORTER_OTLP_LOGS_HEADERS=x-aws-log-group=/example/log/group/123,x-aws-log-stream=example-log-stream-123

npm i

node --require '@aws/aws-distro-opentelemetry-node-autoinstrumentation/register' --require ./customInstrument.js app.js
```

