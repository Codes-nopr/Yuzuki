["uncaughtException", "rejectionHandled", "multipleResolves", "uncaughtExceptionMonitor", "unhandledRejection"]
.forEach((e) => process.on(e, () => { }));
