import {Meteor} from "meteor/meteor";
import expect from 'expect';
import {Notes} from './notes';


if(Meteor.isServer){
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'My Note to buy=',
      body: 'My body to buy',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function () {
      const userId = noteOne.userId;

      const _id = Meteor.server.method_handlers['notes.insert'].apply({
        userId
      });

      expect(Notes.findOne({_id, userId})).toBeTruthy();

    });

    it('should not insert new note', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);

      expect(Notes.findOne({_id: noteOne._id})).toBeFalsy();
    });

    it('should update note', function () {
      const title = 'this is a updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        {title}
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toMatchObject({
        title,
        body: noteOne.body
      });

    });

    it('should not update note if user was not creator', function () {
      const title = 'this is a updated title';

      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testId'
      }, [
        noteOne._id,
        {title}
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note).toMatchObject(noteOne);
    });

    it('should return a users notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});

      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);

    });

    it('should return no notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({userId: 'noted'});

      const notes = res.fetch();

      expect(notes.length).toBe(0);

    });

  });
}
