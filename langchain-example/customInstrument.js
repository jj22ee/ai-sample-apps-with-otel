const { trace } = require('@opentelemetry/api');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const tracerProvider = trace.getTracerProvider();
const {
  LangChainInstrumentation,
} = require("@traceloop/instrumentation-langchain");

const AgentsModule = require('langchain/agents');
const ChainsModule = require('langchain/chains');
const RunnableModule = require('@langchain/core/runnables')
const ToolsModule = require('@langchain/core/tools')
const VectorStoresModule = require('@langchain/core/vectorstores')

const traceloop = require("@traceloop/node-server-sdk")

traceloop.initialize({
  appName: "myTestApp",
  instrumentModules: {
    langchain: {
      runnablesModule: RunnableModule,
      toolsModule: ToolsModule,
      chainsModule: ChainsModule,
      agentsModule: AgentsModule,
      vectorStoreModule: VectorStoresModule,
    }
  }
});

// const httpInstrumentation = new HttpInstrumentation();
// const langChainInstrumentation = new LangChainInstrumentation();

// Some manual instrumentation is required:
// - https://www.traceloop.com/docs/openllmetry/tracing/js-force-instrumentations
// - https://github.com/traceloop/openllmetry-js/issues/471
// langChainInstrumentation.manuallyInstrument({
//   runnablesModule: RunnableModule,
//   toolsModule: ToolsModule,
//   chainsModule: ChainsModule,
//   agentsModule: AgentsModule,
//   vectorStoreModule: VectorStoresModule,
// });

// langChainInstrumentation.enable();

// httpInstrumentation.setTracerProvider(tracerProvider);
// langChainInstrumentation.setTracerProvider(tracerProvider);

// registerInstrumentations({
//   instrumentations: [
//     httpInstrumentation,
//     // langChainInstrumentation,
//   ]
// })