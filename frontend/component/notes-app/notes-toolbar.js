import React from "react";
import Button from "../button";
import OptionButton from "../button/option-button";
import SingleChoiceBtnGroup from "../button/single-choice-button-group";
import ToolBar, { Divider } from "../title-bar/tool-bar";
import { callFunc, isPlainObject } from "../../utils";
import storage from "../../utils/storage";
import { asSubscriber } from "../evented";
import { NotesToolbarEvent as ToolbarEvent, NotesEditorEvent } from "./events";
import EditorEvent from "./events/editor";
import { showColorPicker } from "../picker/color-picker";
import Icon, { IconNames } from "../icon";
import { showProgressBar, showInputDialog } from "../notes-app/notes-window";
import server, { baseURL } from "../../api";
import t, { i18nSync } from "../../i18n";

const PICK_COLOR = Symbol();

@i18nSync
@asSubscriber
class NotesToolBar extends React.Component {
  owener = null;
  constructor(props) {
    super(...arguments);
    this.eventBus = props.eventBus;
    this._subscribeEvents();
    this.elFileUploadBtn = React.createRef();
  }

  _subscribeEvents() {
    this.eventBus.subscribe(EditorEvent.selectionChange, (name) => {
      console.log(name);
      console.log(document.getSelection());
    });
  }

  dispatch(name, data) {
    console.log(name, data);
    return callFunc(this.eventBus.dispatch, name, data);
  }

  dispatchEditorEvent = (editorEvent) => {
    console.log(editorEvent);
    let { command, data } = editorEvent;
    data = isPlainObject(data) ? Object.assign({}, data) : data;
    console.log(command, data);
    this.dispatch(command, data);
  };

  dispatchEditorEventOnClick = (_, editorEvent) => {
    return this.dispatchEditorEvent(editorEvent);
  };

  onCardListViewChange = (_, btnData) => {
    this.dispatch(ToolbarEvent.listViewStyleChange, btnData.isCardView);
  };

  render() {
    let isCardView = storage.get("listCardView", false);
    console.log(document.getSelection());
    return (
      <ToolBar allowTag={["input"]}>
        <SingleChoiceBtnGroup
          selected={isCardView ? 1 : 0}
          onChange={this.onCardListViewChange}
        >
          <Button title={t.title.listView} data={{ isCardView: false }}>
            <Icon name={IconNames.listView} />
          </Button>
          <Button title={t.title.cardView} data={{ isCardView: true }}>
            <Icon name={IconNames.cardView} />
          </Button>
        </SingleChoiceBtnGroup>

        <Divider width={2} />

        <Button
          title={t.title.newNote}
          onClick={(_) => this.dispatch(ToolbarEvent.create)}
        >
          {t.newNote}
        </Button>
      </ToolBar>
    );
  }
}

export default NotesToolBar;
