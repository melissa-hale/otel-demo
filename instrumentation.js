const opentelemetry = require('@opentelemetry/sdk-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-proto');
const {
  OTLPMetricExporter,
} = require('@opentelemetry/exporter-metrics-otlp-proto');
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');


const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: `https://${{process.env.OTEL_EXPORTER_OTLP_ENDPOINT}}/v1/traces`
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
        url: `https://${{process.env.OTEL_EXPORTER_OTLP_ENDPOINT}}/v1/metrics`
      }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
