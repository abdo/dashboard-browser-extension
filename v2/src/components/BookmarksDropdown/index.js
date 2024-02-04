import { Menu, Avatar, Dropdown, Input } from 'antd';
import React, { useState, useEffect } from 'react';

import debounce from '../../helpers/debounce';
import getBrowserBookmarks from '../../helpers/getBrowserBookmarks';
import getUrlIcon from '../../helpers/getUrlIcon';
import truncate from '../../helpers/truncate';

import './style.css';

const BookmarksDropdown = () => {
  const [browserBookmarks, setBrowserBookmarks] = useState([]);
  const [shownBrowserBookmarks, setShownBrowserBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    // Get bookmarks
    const bookmarks = getBrowserBookmarks();
    setBrowserBookmarks(bookmarks);
    setShownBrowserBookmarks(bookmarks);
  }, []);

  const onSearch = (text) => {
    if (!text.trim()) {
      setShownBrowserBookmarks(browserBookmarks);
      return;
    }

    // Only suitable bookmarks and parent folders are shown
    let shownBookmarks = browserBookmarks.filter(
      (b) =>
        b.title.toLowerCase().includes(text.toLowerCase()) || b.isParentNode
    );

    // If no bookmarks are suitable, don't show any parents
    if (shownBookmarks.every((b) => b.isParentNode)) {
      shownBookmarks = [];
    }

    setShownBrowserBookmarks(shownBookmarks);
  };

  const handleShowBMs = () => setShowBookmarks(true);
  const handleShowBMsWithDelay = () => debounce(() => setShowBookmarks(true));
  const handleHideBMs = () => setShowBookmarks(false);
  const handleHideBMswithDelay = () => debounce(() => setShowBookmarks(false));

  const menu = (
    <Menu
      className="bookmarksMenu"
      onMouseOver={handleShowBMsWithDelay}
      onMouseLeave={handleHideBMswithDelay}
    >
      {shownBrowserBookmarks.length === 0 && browserBookmarks.length === 0 ? (
        <Menu.Item>No bookmarks found</Menu.Item>
      ) : (
        <Menu.Item>
          <Input
            autoFocus
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
          />
        </Menu.Item>
      )}

      {shownBrowserBookmarks.length === 0 && browserBookmarks.length !== 0 && (
        <Menu.Item>No bookmarks found</Menu.Item>
      )}

      {shownBrowserBookmarks.map((bookmark) => {
        if (bookmark.isParentNode) {
          return (
            <Menu.Item key={bookmark.id} className="bookmarksMenuItemParent">
              {truncate(bookmark.title, 60)}
            </Menu.Item>
          );
        } else
          return (
            <Menu.Item key={bookmark.id} className="bookmarksMenuItem">
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                <Avatar
                  className="bookmarkMenuItemIcon"
                  src={getUrlIcon(bookmark.url)}
                  size="small"
                />
                {truncate(bookmark.title, 60)}
              </a>
            </Menu.Item>
          );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} visible={showBookmarks}>
      <p
        className="bookmarksHintText"
        onMouseOver={handleShowBMs}
        onMouseLeave={handleHideBMswithDelay}
        onClick={showBookmarks ? handleHideBMs : handleShowBMs}
      >
        Bookmarks
      </p>
    </Dropdown>
  );
};

export default BookmarksDropdown;
