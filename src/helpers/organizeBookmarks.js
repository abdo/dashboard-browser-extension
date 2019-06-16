// This function is currently unused
// It was build to give specific margins to bookmarks according to how deep they are nested

const organizeBookmarks = (bookmarks) => {
  let currentMargin = 0;
  const marginsIndex = {};

  if (bookmarks[0]) marginsIndex[bookmarks[0].parentId] = currentMargin;

  const decideMargins = (bookmarks) => {
    bookmarks.forEach((bookmark) => {
      if (bookmark.isParentNode) {
        if (
          !marginsIndex[bookmark.parentId] &&
          marginsIndex[bookmark.parentId] !== 0
        ) {
          currentMargin += 15; // 15 pixels difference between child and parent
          marginsIndex[bookmark.id] = currentMargin;
        }
        decideMargins(bookmark.children);
      }
    });
  };

  decideMargins(bookmarks);

  const organizedBookmarks = bookmarks.map((bookmark) => {
    const margin = marginsIndex[bookmark.id] || marginsIndex[bookmark.parentId];
    return { ...bookmark, margin };
  });

  return organizedBookmarks;
};

export default organizeBookmarks;
