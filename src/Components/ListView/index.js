import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function ListView(props) {
  const songList = props.ListData;
  const { Tab, onclick, onDeletingPlaylist, addSongToPlaylist } = props;

  function onSelectingAlubm(selectedAlbum) {
    if (onclick) {
      props.onclick(selectedAlbum);
    }
  }
  function onDelete(e, playlist) {
    e.stopPropagation();
    onDeletingPlaylist(playlist);
  }
  return (
    <>
      {songList.length ? (
        <div className="ant-list demo-loadmore-list ant-list-split ant-list-something-after-last-item">
          <div className="ant-spin-nested-loading">
            <div className="ant-spin-container">
              <ul className="ant-list-items list-box">
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      className="List"
                      height={height}
                      itemCount={songList.length}
                      overscanCount={5}
                      itemSize={45}
                      width={width}
                    >
                      {({ index, style }) => {
                        let eachSong = songList[index];
                        return (
                          <li
                            className="ant-list-item"
                            key={index}
                            style={style}
                            onClick={() => onSelectingAlubm(eachSong)}
                          >
                            <div className="ant-list-item-meta">
                              <div className="ant-list-item-meta-avatar">
                                <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                                  <img
                                    src={
                                      eachSong?.thumbnailUrl
                                        ? eachSong.thumbnailUrl
                                        : "https://via.placeholder.com/150/92c952"
                                    }
                                    alt=""
                                  />
                                </span>
                              </div>
                              <div className="ant-list-item-meta-content list-detail">
                                <h4 className="ant-list-item-meta-title">
                                  {
                                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                    <a>{eachSong.title}</a>
                                  }
                                </h4>
                                {props.Tab !== "playlist" && (
                                  <div className="ant-list-item-meta-description">Album</div>
                                )}
                              </div>
                            </div>
                            <div>
                              {Tab === "playlist"
                                ? `createdAt:${eachSong?.createdAt}`
                                : "Play Time"}
                            </div>
                            <ul className="ant-list-item-action">
                              <li>
                                {Tab === "playlist" ? (
                                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                  <a onClick={(e) => onDelete(e, eachSong)}>Delete</a>
                                ) : // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                Tab === "AddSong" ? (
                                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                  <a onClick={(e) => addSongToPlaylist(eachSong)}>Add To List</a>
                                ) : (
                                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                  <a>edit</a>
                                )}
                                <em className="ant-list-item-action-split"></em>
                              </li>
                              <li>
                                {
                                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                  <a>more</a>
                                }
                              </li>
                            </ul>
                          </li>
                        );
                      }}
                    </List>
                  )}
                </AutoSizer>
              </ul>
            </div>
          </div>
        </div>
      ) : Tab === "playlist" ? (
        <h4 className="nodata">No playlist</h4>
      ) : Tab === "AddSong" || Tab === "" ? (
        <h4 className="nodata">No Songs in the Playlist</h4>
      ) : (
        <h4 className="nodata">loading...</h4>
      )}
    </>
  );
}

export default ListView;
