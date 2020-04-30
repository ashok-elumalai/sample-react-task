import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import AllSongs from "../AllSongs";
import Albums from "../Albums";
import Playlist from "../Playlist";

const { TabPane } = Tabs;

const panes = [
  { title: "All Songs", content: AllSongs, key: "1", closable: false },
  { title: "Albums", content: Albums, key: "2", closable: false },
  { title: "PlayList", content: Playlist, key: "3", closable: false },
];

function MusicPlayer() {
  const [activeKey, setActiveKey] = useState(panes[0].key);
  const [Tabsets] = useState(panes);
  const [data, setData] = useState([]);

  useEffect(() => {
    // we can use redux then get data from redux state
    // data.length to prevent unnecessary Api calls. here it prevented
    // from here we can send data to al the tabs or if we use redux state we can able to get data using mapStateToProps
    //   if(data.length < 0)
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function onChange(activeKey) {
    setActiveKey(activeKey);
  }

  return (
    <Tabs onChange={onChange} activeKey={activeKey} type="editable-card">
      {Tabsets.map((pane) => {
        const Component = pane.content;
        return (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            <Component songsdata={data} />
          </TabPane>
        );
      })}
    </Tabs>
  );
}

export default MusicPlayer;
