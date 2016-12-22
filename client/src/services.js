const axios = require('axios');

module.exports = {
  request: {
    signin(email, password) {
      axios({
        method: 'POST',
        url: '/api/users/signin',
        data: { email, password },
      })
      .then((signInResp) => {
        console.log('SIGN IN SUCCESS', signInResp);
      })
      .catch((err) => {
        console.log('ERR WITH SIGNIN', err);
      });
    },
    signup(email, password, fullname) {
      axios({
        method: 'POST',
        url: '/auth/signup',
        data: { email, password, fullname },
      })
      .then((signUpResp) => {
        console.log('SIGN UP SUCCESS', signUpResp);
      })
      .catch((err) => {
        console.log('ERR WITH SIGNIN', err);
      });
    },
    addFollow() {
      axios.post()
    },
    unfollow() {
      axios.post()
    },
    addEvent(eventParams) {
      axios({
        method: 'POST',
        url: '/api/events/addevent',
        data: { eventParams },
      })
    },
    removeEvent() {
      axios.post()
    },
    getAllEvents(user_Id) {
      axios.get('/api/events/getall', {
        params: {
          user_Id,
        },
      })
      .then((resp) => {
        console.log("SERVICES GET RESPONSE: ", resp.data);
        return resp.data;
      });
    },
  },
};
