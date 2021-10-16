const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // mide la estabilidad visual
      getFID(onPerfEntry); // mide la interactividad
      getFCP(onPerfEntry);
      getLCP(onPerfEntry); // mide el rendimiento de carga
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
