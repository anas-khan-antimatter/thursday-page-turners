(function () {
  'use strict';

  const form = document.getElementById('note-form');
  const nameInput = document.getElementById('note-name');
  const messageInput = document.getElementById('note-message');
  const container = document.getElementById('notes-container');

  // Load saved notes from localStorage
  function loadNotes() {
    try {
      const saved = localStorage.getItem('tpt_notes');
      if (saved) {
        const notes = JSON.parse(saved);
        container.innerHTML = '';
        notes.forEach(function (note) {
          appendNote(note.name, note.message);
        });
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  // Save notes to localStorage
  function saveNotes() {
    var items = container.querySelectorAll('.note-item');
    var notes = [];
    items.forEach(function (item) {
      var nameEl = item.querySelector('.note-author');
      var textEl = item.querySelector('.note-text');
      if (nameEl && textEl) {
        notes.push({
          name: nameEl.textContent,
          message: textEl.textContent
        });
      }
    });
    try {
      localStorage.setItem('tpt_notes', JSON.stringify(notes));
    } catch (e) {
      // storage full — silently ignore
    }
  }

  // Append a note DOM element
  function appendNote(name, message) {
    var li = document.createElement('li');
    li.className = 'note-item';

    var authorSpan = document.createElement('span');
    authorSpan.className = 'note-author';
    authorSpan.textContent = name;

    var textP = document.createElement('p');
    textP.className = 'note-text';
    textP.textContent = message;

    li.appendChild(authorSpan);
    li.appendChild(textP);
    container.appendChild(li);
  }

  // Handle form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = nameInput.value.trim();
    var message = messageInput.value.trim();

    if (!name || !message) {
      return;
    }

    appendNote(name, message);
    saveNotes();

    form.reset();
    nameInput.focus();
  });

  // Initial load
  loadNotes();
})();
