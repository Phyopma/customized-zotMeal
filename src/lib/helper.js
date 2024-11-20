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

const modifyResponse = (data) => {
  return data.map((d) => {
    const { LocationId, MenuId, MenuProducts, StartDate, EndDate } = d.Menu;
    const menus = MenuProducts.map((mp) => {
      return {
        menuProductId: mp.MenuProductId,
        periodId: mp.PeriodId,
        productId: mp.ProductId,
        stationId: mp.StationId,
        assignDate: mp.AssignedDate,
        name: mp.Product.MarketingName,
        calories: mp.Product.Calories,
        addedSugars: mp.Product.AddedSugars,
        protein: mp.Product.Protein,
        shortDescription: mp.Product.ShortDescription,
        totalCarbohydrates: mp.Product.TotalCarbohydrates,
        totalFat: mp.Product.TotalFat,
      };
    });

    return {
      locationId: LocationId,
      menuId: MenuId,
      menus,
      startDate: StartDate,
      endDate: EndDate,
    };
  });
};

export const formatDailyResponse = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }

  const allMenus = modifyResponse(data);

  return allMenus.reduce((acc, curr) => {
    const { locationId, menus } = curr;
    if (!acc[locationId]) acc[locationId] = { locationId, menus: [] };
    acc[locationId].menus.push(...menus);
    return acc;
  }, {});
};

export const formatWeeklyResponse = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }

  const allMenus = modifyResponse(data);
  var { locationId, startDate, endDate } = allMenus[0];

  let initial = { locationId, startDate, endDate, menus: {} };

  const result = allMenus.reduce((acc, curr) => {
    const { menus } = curr;
    menus.forEach((m) => {
      const tmpDate = new Date(m.assignDate).toDateString();

      if (!acc.menus[tmpDate]) acc.menus[tmpDate] = {};
      if (!acc.menus[tmpDate][m.periodId]) acc.menus[tmpDate][m.periodId] = [];
      acc.menus[tmpDate][m.periodId].push(m);
    });
    return acc;
  }, initial);

  const start = new Date(parseInt(startDate.match(/\d+/)[0], 10));
  start.setDate(start.getDate() + 1);
  result.startDate = start.toDateString();

  const end = new Date(parseInt(endDate.match(/\d+/)[0], 10));
  end.setDate(end.getDate() + 1);

  result.endDate = end.toDateString();

  const sortedMenus = Object.keys(result.menus)
    .sort((a, b) => {
      return new Date(a) - new Date(b);
    })
    .reduce((acc, key) => {
      acc[key] = result.menus[key];
      return acc;
    }, {});

  result.menus = sortedMenus;

  console.log(result.menus["Fri Nov 22 2024"]["106"]);
  console.log(result);

  return result;
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
