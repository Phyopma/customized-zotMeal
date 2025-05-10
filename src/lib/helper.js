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
    const { MenuProducts } = d.Menu;
    const menus = MenuProducts.map((mp) => {
      const nutritionalInfo = mp.Product.NutritionalTree.reduce((acc, item) => {
        switch (item.Name) {
          case "Calories":
            acc.calories = item.Value;
            break;
          case "Total Fat":
            acc.totalFat = item.Value;
            break;
          case "Total Carbohydrates":
            acc.totalCarbohydrates = item.Value;
            break;
          case "Protein":
            acc.protein = item.Value;
            break;
          case "Added Sugars":
            acc.addedSugars = item.Value;
            break;
        }
        return acc;
      }, {});

      return {
        menuProductId: mp.MenuProductId,
        periodId: d.SelectedPeriodId,
        productId: mp.ProductId,
        stationId: mp.StationId,
        assignDate: mp.AssignedDate,
        name: mp.Product.MarketingName,
        shortDescription: mp.Product.ShortDescription,
        ...nutritionalInfo,
      };
    });

    return {
      locationId: d.LocationId,
      menuId: d.MenuId,
      menus,
      startDate: d.StartDate,
      endDate: d.EndDate,
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

  // Check if we have any menus and get the first one
  if (!allMenus.length) {
    return { menus: {} };
  }

  const firstMenu = allMenus[0];
  const { locationId, startDate, endDate } = firstMenu;

  // If startDate is undefined, use current date
  const start = startDate
    ? new Date(parseInt(startDate.match(/\d+/)[0], 10))
    : new Date();
  start.setDate(start.getDate() + 1);

  // If endDate is undefined, use start date + 7 days
  const end = endDate
    ? new Date(parseInt(endDate.match(/\d+/)[0], 10))
    : new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
  end.setDate(end.getDate() + 1);

  let initial = {
    locationId,
    startDate: start.toDateString(),
    endDate: end.toDateString(),
    menus: {},
  };

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

  const sortedMenus = Object.keys(result.menus)
    .sort((a, b) => {
      return new Date(a) - new Date(b);
    })
    .reduce((acc, key) => {
      acc[key] = result.menus[key];
      return acc;
    }, {});

  result.menus = sortedMenus;

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
