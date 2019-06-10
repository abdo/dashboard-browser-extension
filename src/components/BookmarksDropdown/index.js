import { Menu, Avatar, Dropdown, Input } from 'antd';
import React, { useState, useEffect } from 'react';

import getBrowserBookmarks from '../../helpers/getBrowserBookmarks';
import getUrlIcon from '../../helpers/getUrlIcon';
import truncate from '../../helpers/truncate';
import debounce from '../../helpers/debounce';

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
    const shownBookmarks = browserBookmarks.filter((b) =>
      b.title.toLowerCase().includes(text.toLowerCase())
    );
    setShownBrowserBookmarks(shownBookmarks);
  };

  const handleShowBookmarks = () => debounce(() => setShowBookmarks(true));
  const handleHideBookmarks = () => debounce(() => setShowBookmarks(false));

  const menu = (
    <Menu
      className="bookmarksMenu"
      onMouseOver={handleShowBookmarks}
      onMouseLeave={handleHideBookmarks}
    >
      {shownBrowserBookmarks.length === 0 && browserBookmarks.length === 0 ? (
        <Menu.Item>No bookmarks found</Menu.Item>
      ) : (
        <Menu.Item onClick={() => {}}>
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
        return (
          <Menu.Item
            key={bookmark.id}
            className="bookmarksMenuItem"
            onClick={() => {
              window.open(bookmark.url, '_blank');
              window.focus();
            }}
          >
            <Avatar
              className="bookmarkMenuItemIcon"
              src={getUrlIcon(bookmark.url)}
              size="small"
            />
            {truncate(bookmark.title, 60)}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} visible={showBookmarks}>
      <p
        className="bookmarksDropdownText"
        onMouseOver={handleShowBookmarks}
        onMouseLeave={handleHideBookmarks}
        onClick={() => debounce(() => setShowBookmarks(!showBookmarks))}
      >
        Bookmarks
      </p>
    </Dropdown>
  );
};

export default BookmarksDropdown;
