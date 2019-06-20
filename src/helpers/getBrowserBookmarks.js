import getFakeBrowserObject from './getFakeBrowserObject';

let browserAPI;
if (window.chrome && window.chrome.bookmarks) {
  // i.e: In production (chrome and some browsers)
  browserAPI = window.chrome;
} else if (window.browser && window.browser.bookmarks) {
  // i.e: In production (other browsers)
  browserAPI = window.browser;
} else {
  // i.e: In testing
  browserAPI = getFakeBrowserObject();
}

const getBrowserBookmarks = () => {
  const bookmarksArr = [];

  const processBookmarkNode = (node) => {
    // recursively process child nodes
    // empty folders are ignored
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

  browserAPI.bookmarks.getTree((itemTree) => {
    itemTree.forEach((item) => {
      processBookmarkNode(item);
    });
  });

  return bookmarksArr;
};

export default getBrowserBookmarks;
