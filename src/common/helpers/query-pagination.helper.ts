export const buildQueryPrisma = (query: any) => {
  let { page, pageSize, filters } = query;
  const pageDefault = 1;
  const pageSizeDefault = 5;
  pageSize = Number(pageSize) || pageSizeDefault;
  page = Number(page) || pageDefault;

  pageSize = Math.max(pageSize, pageSizeDefault);
  page = Math.max(page, pageDefault);
  try {
    filters = JSON.parse(filters);
  } catch (error) {
    filters = {};
  }
  const where = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value && typeof value === "string" && value.trim() !== "") {
      where[key] = {
        contains: value,
      };
    }
  }

  const index = (page - 1) * pageSize;

  const filterValue = {
    ...where,
  };
  return {
    page,
    pageSize,
    index,
    filterValue,
  };
};