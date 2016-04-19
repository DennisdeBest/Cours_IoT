/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
        type:'string',
        size:100,
        required:true
    },
    lastName : {
        type:'string',
        size:100,
        required:true
    },
      email : {
            type:'email'
      },
      password: {
          type: 'String',
          size:10,
          required : true
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

