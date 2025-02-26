/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// Tab attributes which are persisted & restored by SessionStore.
const PERSISTED_ATTRIBUTES = ["customizemode"];

// We never want to directly read or write these attributes.
// 'image' should not be accessed directly but handled by using the
//         gBrowser.getIcon()/setIcon() methods.
// 'muted' should not be accessed directly but handled by using the
//         tab.linkedBrowser.audioMuted/toggleMuteAudio methods.
// 'pending' is used internal by sessionstore and managed accordingly.
const ATTRIBUTES_TO_SKIP = new Set([
  "image",
  "muted",
  "pending",
  "skipbackgroundnotify",
  "floorp-workspace",
]);

// A set of tab attributes to persist. We will read a given list of tab
// attributes when collecting tab data and will re-set those attributes when
// the given tab data is restored to a new tab.
export var TabAttributes = Object.freeze({
  get(tab) {
    return TabAttributesInternal.get(tab);
  },

  set(tab, data = {}) {
    TabAttributesInternal.set(tab, data);
  },
});

var TabAttributesInternal = {
  get(tab) {
    let data = {};

    for (let name of PERSISTED_ATTRIBUTES) {
      if (tab.hasAttribute(name)) {
        data[name] = tab.getAttribute(name);
      }
    }

    return data;
  },

  set(tab, data = {}) {
    // Clear & Set attributes.
    for (let name of PERSISTED_ATTRIBUTES) {
      tab.removeAttribute(name);
      if (name in data) {
        tab.setAttribute(name, data[name]);
      }
    }
  },
};
