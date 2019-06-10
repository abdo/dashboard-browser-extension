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
      if (
        node.title &&
        node.children.some((childNode) => childNode.title && childNode.url)
      ) {
        bookmarksArr.push({ ...node, isParentNode: true });
      }
      node.children.forEach(processBookmarkNode);
      return;
    }

    if (node.title && node.url) {
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
