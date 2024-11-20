const fetchSpaces = async ({ queryKey }) => {
    const [_, page, filters] = queryKey;
  
    // Obtener el token de autenticación
    const tokenResponse = await axios.post(
      "https://api-academusoft-web.ucompensar.edu.co:8093/integrador-rest/servicios/app-acceso/acceso?=",
      { codigoAplicacion: "ReservaEspacios" },
      {
        headers: {
          "Content-Type": "application/json",
          "WWW-Authenticate": "Basic UmVzZXJ2YUVzcGFjaW9zOjQ1OThlNzE0MWMyYTk5ODYyM2IzMzYxYmZmODMxYmQ0",
        },
      }
    );
  
    const token = tokenResponse.data.token;
  
    // Obtener los datos de los espacios
    const response = await axios.post(
      "https://api-academusoft-web.ucompensar.edu.co:8093/integrador-rest/servicios/app-integrador/aplicacion/horarioxRecursoFisico",
      {
        tipoRetorno: "DataObject",
        parametros: {
          periodoacademico: "20242",
          espaciofisico: filters.espaciofisico || undefined,
          tiporecurso: filters.tiporecurso || undefined,
          clseFechainicio: filters.clseFechainicio || undefined,
          clseFechafinal: filters.clseFechafinal || undefined,
          horainicio: filters.horainicio || undefined,
          horafinal: filters.horafinal || undefined,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    // Retornamos los datos de la página actual
    return response.data.data.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  };
  