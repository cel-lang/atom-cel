'use babel';

import AtomCelView from './atom-cel-view';
import { CompositeDisposable } from 'atom';

export default {

  atomCelView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomCelView = new AtomCelView(state.atomCelViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomCelView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-cel:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomCelView.destroy();
  },

  serialize() {
    return {
      atomCelViewState: this.atomCelView.serialize()
    };
  },

  toggle() {
    console.log('AtomCel was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
