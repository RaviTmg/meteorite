export const createHierarchyFromArray = (items, parentId) => {
  const sortedItems = [];
  if (parentId) {
    const children = items.filter((d) => d.parentId === parentId);
    children.forEach((d) => {
      const children1 = createHierarchyFromArray(items, d._id);
      sortedItems.push({ ...d, children: [...children1] });
    });
    return sortedItems;
  } else {
    const highLevel = items.filter((d) => d.level === 1);
    highLevel.forEach((d) => {
      const children = createHierarchyFromArray(items, d._id);
      sortedItems.push({ ...d, children: [...children] });
    });
    return sortedItems;
  }
};
