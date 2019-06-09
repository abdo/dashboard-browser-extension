import getFakeBrowserObject from './getFakeBrowserObject';

let browser;
if (window.chrome && window.chrome.bookmarks) {
  // i.e: In production
  browser = window.chrome;
} else {
  browser = getFakeBrowserObject();
}

const getBrowserBookmarks = () => {
  const bookmarksArr = [];

  const processBookmarkNode = (node) => {
    // recursively process child nodes
    if (node.children) {
      node.children.forEach((child) => {
        processBookmarkNode(child);
      });
    }

    // use pc bookmarks only
    if (node.parentId === '1' && node.title && node.url) {
      bookmarksArr.push(node);
    }
  };

  browser.bookmarks.getTree((itemTree) => {
    itemTree.forEach((item) => {
      processBookmarkNode(item);
    });
  });

  return bookmarksArr;
};

export default getBrowserBookmarks;
