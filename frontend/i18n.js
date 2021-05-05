import { isFunc, callFunc } from "./utils";
import React from "react";

const DEFAULT_LANGUAGE_NAME = "zh";
let language = DEFAULT_LANGUAGE_NAME;

const i18nData = {
  [DEFAULT_LANGUAGE_NAME]: {
    newFolder: "+ newFolder",
    delete: "delete",
    reName: "reName",
    moveTo: "moveTo",
    cut: "cut",
    copy: "copy",
    search: "search",
    newNote: "newNote",
    more: "more",
    emptyNoteTitle: "emptyNoteTitle",
    confirm: "confirm",
    cancel: "cancel",
    ok: "ok",
    emptyFolder: "emptyFolder",
    menu: {
      bigTitle: "bigTitle",
      smallTitle: "smallTitle",
      subTitle: "subTitle",
      text: "text",
      orderList: "orderList",
      unOrderList: "unOrderList",
      blue: "blue",
      green: "green",
      indent: "indent",
      outdent: "outdent",
    },
    title: {
      cardView: "cardView",
      listView: "listView",
      newNote: "newNote",
      titleOption: "titleOption",
      listOption: "listOption",
      lineThrough: "lineThrough",
      italic: "italic",
      bold: "bold",
      underline: "underline",
      alighLeft: "alighLeft",
      alignCenter: "alignCenter",
      alignRight: "alignRight",
      fontColor: "fontColor",
      indentOption: "indentOption",
      insertHr: "insertHr",
      addLink: "addLink",
      inertImage: "inertImage",
    },
    message: {
      plsSelectColor: "plsSelectColor",
      imageUploading: "imageUploading",
      deleteFolderAlertTitle: "deleteFolderAlertTitle",
      deleteFolderAlert: "deleteFolderAlert",
      deleteNoteAlertTitle: "deleteNoteAlertTitle？",
      deleteNoteAlert: "deleteNoteAlert！",
      nameExist: "nameExist！",
      plsInputFolderName: "plsInputFolderName",
      plsInputLink: "plsInputLink",
    },
  },
  //TODO English
  en: {
    menu: {},
    title: {},
    message: {},
  },
};

const i18n = {};

let translationNames = Object.keys(i18nData[DEFAULT_LANGUAGE_NAME]);

translationNames.forEach((name) => {
  Object.defineProperty(i18n, name, {
    get() {
      let translation = i18nData[language] || {};
      return translation[name] || "";
    },
  });
});

let languageObservers = [];

function setLanguage(newLanguage = DEFAULT_LANGUAGE_NAME) {
  if (i18nData.hasOwnProperty(newLanguage) && language !== newLanguage) {
    language = newLanguage;
    languageObservers.forEach((cb) => callFunc(cb, newLanguage));
  }
}

function observeLangChange(cb) {
  if (isFunc(cb) && !languageObservers.some((o) => o === cb)) {
    languageObservers.push(cb);
  }
}

function unObserveLangChange(cb) {
  remodeItemAtIdx(languageObservers, cb);
}

function i18nSync(Component) {
  class Wrapper extends React.Component {
    updateOnI18nChange = () => {
      this.forceUpdate();
    };
    componentDidMount() {
      observeLangChange(this.updateOnI18nChange);
    }
    componentWillUnmount() {
      unObserveLangChange(this.updateOnI18nChange);
    }
    render() {
      return (
        <Component {...this.props} i18n={i18n} currentLanguage={language} />
      );
    }
  }
  return Wrapper;
}

@i18nSync
class T extends React.Component {
  render() {
    return i18n[props.name];
  }
}

export default i18n;

window.setLanguage = setLanguage;

export { observeLangChange, unObserveLangChange, setLanguage, i18nSync, T };
