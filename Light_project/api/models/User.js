/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    prenom: {
        type:'string',
        size:100,
        required:true
    },
    nom : {
        type:'string'
    },
      email : {
            type:'email'
      },
      lights: {
          collection:'light',
          via:'owner'
      },
      logs: {
          collection:'log',
          via:'user'
      }

  }

};

