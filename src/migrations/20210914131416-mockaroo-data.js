'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
    insert into posts (content, "userId", "createdAt", likes) values ('Soo (Art of Revenge)', 1, '2020-10-21T16:14:40Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Devil''s Brigade, The', 1, '2020-12-13T10:01:58Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Pretty Woman', 1, '2021-04-02T02:00:01Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Ernest Scared Stupid', 1, '2021-09-08T05:54:58Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Ballad of Narayama, The (Narayama Bushiko)', 1, '2021-04-21T23:48:32Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Plumm Summer, A', 1, '2021-02-25T00:36:17Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Eye of God', 1, '2020-08-25T18:57:27Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Tough Guise: Violence, Media & the Crisis in Masculinity', 1, '2021-05-20T09:15:26Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Chain Reaction', 1, '2021-08-25T00:41:52Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Beyond Rangoon', 1, '2021-04-29T18:23:03Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Come and See (Idi i smotri)', 1, '2021-05-20T18:58:56Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Article 99', 1, '2020-12-19T07:48:38Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Dinosaurs: A Fun Filled Trip Back in Time', 1, '2021-08-11T17:08:34Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Business as Usual', 1, '2021-03-01T17:47:53Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Spare Parts', 1, '2021-01-19T09:42:55Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Same Same But Different', 1, '2020-10-17T04:46:31Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Last of Robin Hood, The', 1, '2020-09-01T11:12:55Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Liverpool', 1, '2021-08-26T03:27:31Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Under the Sun of Satan (Sous le soleil de Satan)', 1, '2021-01-29T06:16:13Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Lumihiutalemuodostelma', 1, '2021-09-12T08:44:52Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('O Brother, Where Art Thou?', 1, '2021-02-22T14:11:43Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('3 A.M.', 1, '2020-08-23T07:50:38Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Sylvia Scarlett', 1, '2021-01-06T06:18:32Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Strictly Ballroom', 1, '2021-08-27T17:33:08Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Golem', 1, '2021-01-21T08:50:21Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('She Wore a Yellow Ribbon', 1, '2021-06-06T14:38:46Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Great Train Robbery, The', 1, '2021-01-24T11:35:38Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Pekka ja Pätkä Suezilla', 1, '2021-06-15T01:12:14Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Square Dance', 1, '2021-01-13T15:55:18Z', 0);
insert into posts (content, "userId", "createdAt", likes) values ('Friends, The (Les Amis)', 1, '2020-11-01T07:18:24Z', 0);



    `);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
