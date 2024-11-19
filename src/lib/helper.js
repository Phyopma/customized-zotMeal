export const formatDate = (date = new Date()) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const appendSearchParam = (previous, key, value) => {
  const params = new URLSearchParams(previous);
  params.set(key, value);
  return params.toString();
};

export const clearLocationParams = (previous) => {
  const params = new URLSearchParams(previous);
  params.delete("location");
  return params.toString();
};

export const getURLString = (pathName, searchParms) =>
  `${pathName}?${searchParms}`;

export const formatResponse = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }
  const allMenus = data.map((d) => {
    const { LocationId, MenuId, MenuProducts } = d.Menu;
    const menus = MenuProducts.map((mp) => {
      return {
        menuProductId: mp.MenuProductId,
        periodId: mp.PeriodId,
        productId: mp.ProductId,
        stationId: mp.StationId,
        name: mp.Product.MarketingName,
        calories: mp.Product.Calories,
        addedSugars: mp.Product.AddedSugars,
        protein: mp.Product.Protein,
        shortDescription: mp.Product.ShortDescription,
        totalCarbohydrates: mp.Product.TotalCarbohydrates,
        totalFat: mp.Product.TotalFat,
      };
    });

    return { locationId: LocationId, menuId: MenuId, menus };
  });
  return allMenus.reduce((acc, curr) => {
    const { locationId, menus } = curr;
    if (!acc[locationId]) acc[locationId] = { locationId, menus: [] };
    acc[locationId].menus.push(...menus);
    return acc;
  }, {});
};

export const buildUrl = (
  location,
  meal,
  mode = "Daily",
  date = formatDate(new Date())
) => {
  const url = new URL(process.env.NEXT_PUBLIC_BASE_URL);
  const params = {
    locationId: location,
    mode,
    date,
    periodId: meal,
  };
  url.search = new URLSearchParams(params).toString();
  return url;
};
