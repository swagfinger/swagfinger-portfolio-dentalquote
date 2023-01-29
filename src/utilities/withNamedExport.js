// React.lazy currently only supports default exports. If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default. This ensures that tree shaking keeps working and that you don’t pull in unused components.

export const withNamedExport = (namedExport) => (moduleExports) => ({
  default: moduleExports[namedExport],
  ...moduleExports,
});
